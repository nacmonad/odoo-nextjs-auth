'use client';
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { UserOdoo, PartnerOdoo,LoyaltyCardOdoo } from "@/types/index";
import isPromotions from "@/utils/isPromotions";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepFour from "./StepFour";
import StepThree from "./StepThree";
import { Button, Card, CardAction, CardBody } from "@nextui-org/react"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"


import { useMainContext } from "@/contexts/MainContextProvider";


const steps = [{
  step: 1,
  status:"SCAN_RECIPIENT",
  message: "Scan the recipient's QR Code"
},
{
  step: 2,
  status:"INPUT_DETAILS",
  message: "Enter the required details"
},
{
  step: 3,
  status:"CONFIRM_DETAILS",
  message: (amt:number, name: string) => `Are you sure you want to issue ${amt} points to ${name}?`
},
{
  step: 4,
  status:"ISSUE_POINTS",
  message: (amt:string, name: string) => `Issued ${amt} points to ${name}.`

},

]

const IssuePoints: FC = () => {
  const mainCtx = useMainContext();
  const { user, partner, loyaltyCards, setLoyaltyCards } = mainCtx;

  const [error, setError] = useState<null | string>();
  const [loading, setLoading] = useState<boolean>(false)

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [formStep, setFormStep] = useState<number>(1);
  const [amount, setAmount] = useState<string>("100");
  const [partnerData, setPartnerData] = useState('No result');
  const [pointIssued, setPointIssued] = useState<null | LoyaltyCardOdoo >(null);

  const currentStep = steps.find(s=>s.step == formStep); 

  /* Must be promotions type */
  if (!user || !partner) return <></>;

  if(!isPromotions(user)) return <div>User is not promotions</div>
  if(partner.is_blacklisted) return <div>User/Partner is blacklisted</div>

  /* Step 1 Finish -- Handles the recipient scan */
  function handleFinishStepOne(result : { data?: string, error?: Error | null }) {
    console.log("handleFinishStepOne", result);
    if(result.data) setPartnerData(result.data);
    if(result.error) setError(result.error.message)
    setFormStep(2);
    setError(null);
  }

  /* Step 2 Finish -- Handle setAmount */

  async function handleFinishStepTwo() {
    try {


      setFormStep(3);
      setError(null);
    } catch(e : Error | any) {
      console.error(e);
      setError(e?.message);
    }
  }

  /* Step 3 Finish -- Confirm, validate the Issue */

  async function handleFinishStepThree() {
    try {
      const partnerDataObj = JSON.parse(partnerData);
      const { partner_id, code, expiration_date = null} = partnerDataObj;
      const payload = {
        partner_id,
        code,
        points: parseInt(amount),
        expiration_date: false,
        program_id : parseInt(process.env.NEXT_PUBLIC_ODOO_LOYALTY_PROMGRAM_ID || '2')
      }
      setLoading(true);

      const r = await fetch(`/api/points/add`, {
        method:"POST",
        body: JSON.stringify(payload)
      });
      const p = await r.json();
      console.log("[pointAdded]", p)
      if(p.error) throw Error(p.error);
      setPointIssued(p.data);
      setFormStep(4);
      setLoading(false);
      setError(null);
    } catch(e : Error | any) {
      console.error(e);
      setLoading(false);
      setError(e.message || e);
    }
  }

  console.log({
    formStep,
    partnerData,
    loading,
    error
  })
  return (
    <Dialog>
        <DialogContent className="w-96">
          <CardBody>
            { formStep === 1 &&
              <StepOne handleFinish={handleFinishStepOne}/>
            }
            { formStep === 2 && 
              <StepTwo handleFinish={handleFinishStepTwo} partnerData={partnerData} amount={amount} setAmount={setAmount} loading={false}/> 
            }
            {
              formStep === 3 &&
              <StepThree handleFinish={handleFinishStepThree} partnerData={partnerData} amount={amount} loading={loading} error={error}/>
            }
            
            {
              formStep === 4 &&
              <StepFour handleFinish={()=>setShowDialog(false)} pointIssued={pointIssued} loading={loading} error={error}/>
            }

            {/* Close or Dismiss  */}
            { formStep === 4 &&  <DialogClose asChild>
                <button
                className="bg-green-500 text-white w-full px-4 py-2 mt-4 outline rounded-md"
              >
                Close
              </button>
            </DialogClose>
            }
            { formStep !== 4 &&
             <DialogClose asChild>
              <Button
                fullWidth  
                size="lg"
                color="danger"
                variant="bordered"
              >
                Dismiss
              </Button>
             </DialogClose>
            }
            
          </CardBody>
        </DialogContent>
      <DialogTrigger asChild>
        <Button
            fullWidth
            size="lg"
            className="mt-4"
          >
            Issue Points
          </Button>
      </DialogTrigger>
    </Dialog>
  );
};

export default IssuePoints;
