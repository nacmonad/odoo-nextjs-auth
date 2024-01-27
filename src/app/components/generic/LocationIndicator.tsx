'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { useMainContext } from "@/contexts/MainContextProvider"


export default () => {
  const mainCtx = useMainContext();

  const { location } = mainCtx;

 if(!location) return <Skeleton className="w-16 h-8"/>
 return (<div className="text-xs w-16" style={{fontSize:"0.6rem", lineHeight:"0.7rem"}}>
        <p>Lat:{location.latitude}</p>
        <p>Long:{location.longitude}</p>
    </div>)
}