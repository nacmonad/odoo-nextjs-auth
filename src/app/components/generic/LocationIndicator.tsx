'use client';

import { useMainContext } from "@/contexts/MainContextProvider"


export default () => {
  const mainCtx = useMainContext();

  const { location } = mainCtx;

 if(!location) return <></>
 return (<div className="text-xs" style={{fontSize:"0.6rem", lineHeight:"0.7rem"}}>
        <p>Lat:{location.latitude}</p>
        <p>Long:{location.longitude}</p>
    </div>)
}