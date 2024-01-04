import PointOption from "./PointOption";
import {Input} from "@nextui-org/input"
import {Button} from "@nextui-org/button"
import { ChangeEvent } from "react";

export default ( { partnerData, amount, setAmount, handleFinish, loading = false, error } : { partnerData: string, amount: string, setAmount: React.Dispatch<React.SetStateAction<string>>, handleFinish: ()=>void, loading:boolean, error?: string | null }) => {
        
        const { complete_name, email_normalized } = JSON.parse(partnerData);
        return <div className="w-full h-full text-black">
            {/* Stylized point options */}
            <div className="flex flex-row flex-wrap">
                <PointOption value={"10"} setAmount={setAmount} />
                <PointOption value={"25"} setAmount={setAmount} />
                <PointOption value={"50"} setAmount={setAmount} />
                <PointOption value={"100"} setAmount={setAmount} />
            </div>
                <label className="block text-white text-sm font-bold mb-2" htmlFor="amount">
                Enter Amount:
            </label>
            <Input
                id="amount"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                    const v = e.target?.value;
                    if(v) setAmount(v)
                }}
            />
            <Button
              onClick={handleFinish}
              className="bg-blue-500 text-white w-full px-4 py-2 mt-4 outline rounded-md"
            >
              Issue Points to {email_normalized}
            </Button>
            {error && <p>{error}</p>}
      </div>
    }