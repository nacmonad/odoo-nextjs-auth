import PointOption from "./PointOption";


export default ( { partnerData, amount, setAmount, handleFinish, loading = false, error } : { partnerData: string, amount: number, setAmount: React.Dispatch<React.SetStateAction<number>>, handleFinish: ()=>void, loading:boolean, error?: string | null }) => {
        
        const { complete_name, email_normalized } = JSON.parse(partnerData);
        return <div className="w-full h-full text-black">
            {/* Stylized point options */}
            <div className="flex flex-row flex-wrap">
                <PointOption value={10} setAmount={setAmount} />
                <PointOption value={25} setAmount={setAmount} />
                <PointOption value={50} setAmount={setAmount} />
                <PointOption value={100} setAmount={setAmount} />
            </div>
                <label className="block text-white text-sm font-bold mb-2" htmlFor="amount">
                Enter Amount:
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="amount"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e)=>{
                    const v = parseInt(e.target.value);
                    
                    if(v && !isNaN(v)) setAmount(v)
                }}
            />
            <button
              onClick={handleFinish}
              className="bg-blue-500 text-white w-full px-4 py-2 mt-4 outline rounded-md"
            >
              Issue Points to {email_normalized}
            </button>
            {error && <p>{error}</p>}
      </div>
    }