'use client';

import { useMainContext } from "@/contexts/MainContextProvider"


export default () => {
    //const session = useIronSession();
  const mainCtx = useMainContext();

  const { location } = mainCtx;
  

//   const { odoo } = session || { odoo: { user: null, partner: null } };
//   const { user, partner } = odoo;

 if(!location) return <></>
 return (<div className="text-xs" style={{fontSize:"0.6rem", lineHeight:"0.7rem"}}>
        <p>Lat:{location.latitude}</p>
        <p>Long:{location.longitude}</p>
    </div>)
}