'use client';
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { UserOdoo, PartnerOdoo,LoyaltyCardOdoo } from "@/types/index";
import isPromotions from "@/utils/isPromotions";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepFour from "./StepFour";
import StepThree from "./StepThree";
import { useMainContext } from "@/contexts/MainContextProvider";

const TestPartner = {
  id: 3,
  is_blacklisted: false
}

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
  message: (amt:number, name: string) => `Issued ${amt} points to ${name}.`

},

]

const IssuePoints: FC = () => {
  const mainCtx = useMainContext();
  const { user, partner } = mainCtx;

  const [error, setError] = useState<null | string>();
  const [loading, setLoading] = useState<boolean>(false)

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [formStep, setFormStep] = useState<number>(1);
  const [amount, setAmount] = useState<number>(100);
  const [partnerData, setPartnerData] = useState('No result');
  const [pointIssued, setPointIssued] = useState<null | LoyaltyCardOdoo >(null);

  const currentStep = steps.find(s=>s.step == formStep); 

  /* Must be promotions type */
  if (!user || !partner) return <></>;

  if(!isPromotions(user)) return <div>User is not promotions</div>
  if(partner.is_blacklisted) return <div>User/Partner is blacklisted</div>

  function handleDismiss(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowDialog(false);
    setFormStep(1);
    setPartnerData("No result");
  }

  function handleIssuePoints(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowDialog(true);
  }

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
      const { partner_id, points, expiration_date = null} = partnerDataObj;
      const payload = {
        partner_id,
        points,
        expiration_date: false,
        program_id : process.env.ODOO_LOYALTY_PROGRAM_ID || 2
      }
      setLoading(true);

      const r = await fetch(`/api/points/issue`, {
        method:"POST",
        body: JSON.stringify(payload)
      });
      const p = await r.json();
      if(p.error) throw Error(p.error);
      setPointIssued(p.data[0]);
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
    <>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <div className="bg-white p-4 rounded-md w-96 shadow-md">
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
            { formStep === 4 &&  <button
              onClick={handleDismiss}
              className="bg-green-500 text-white w-full px-4 py-2 mt-4 outline rounded-md"
            >
              Close
            </button>
            }
            { formStep !== 4 &&
             <button
              onClick={handleDismiss}
              className="bg-white text-red-800 w-full px-4 py-2 mt-4 outline rounded-md"
            >
              Dismiss
            </button>}
            
        </div>
        </div>
      )}

      <button
        onClick={handleIssuePoints}
        className="bg-blue-500 text-white px-4 py-2 my-2 mx-1 rounded-md"
      >
        Issue Points
      </button>
    </>
  );
};

export default IssuePoints;