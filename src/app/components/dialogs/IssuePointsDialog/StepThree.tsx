
export default ( { partnerData, amount, handleFinish, loading = false, error } : { partnerData: string, amount: number, handleFinish: ()=>void, loading:boolean, error?: string | null }) => {
        
        const { complete_name, email_normalized } = JSON.parse(partnerData);
        return <div className="w-full h-full text-black">
            This action will issue {amount} points to { complete_name } ( { email_normalized }) 
            <button
              disabled={loading}
              onClick={handleFinish}
              className="bg-blue-500 text-white w-full px-4 py-2 mt-4 outline rounded-md"
            >
              {loading ? `Loading...` : `Confirm`}
            </button>
            {error && <p className="text-red-600">{error}</p>}
      </div>
    }