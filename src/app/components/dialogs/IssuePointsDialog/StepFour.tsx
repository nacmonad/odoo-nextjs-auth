import { LoyaltyCardOdoo } from "@/types/index";


export default ( { pointIssued, handleFinish, loading = false, error } : { pointIssued: LoyaltyCardOdoo | null, handleFinish: ()=>void, loading:boolean, error?: string  | null }) => {
   if(!pointIssued) return <div className="w-full h-full text-black" >
      {/* Stylized point options */}
      <p>Point could not be created.</p>
      {error && <p className="text-red-600">{error}</p>}
    </div>     
   
   
   const { display_name, points_display} = pointIssued;
        
        return <div className="w-full h-full text-black" >
            {/* Stylized point options */}
            <p>{display_name}</p>
            <p>{points_display}</p>
            {error && <p className="text-red-600">{error}</p>}
      </div>
    }