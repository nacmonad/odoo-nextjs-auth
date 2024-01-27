'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { useMainContext } from "@/contexts/MainContextProvider"


export default () => {
  const mainCtx = useMainContext();

  const { location } = mainCtx;

 //if(!location) return <Skeleton className="w-16 h-8"/>
 return (<div className="text-xs w-16" style={{fontSize:"0.6rem", lineHeight:"0.7rem"}}>
        <div className="flex flex-row items-center">Lat: {location ? location.latitude : <Skeleton className="w-12 h-2"/>}</div>
        <div className="flex flex-row items-center">Long:{location ? location.longitude : <Skeleton className="w-12 h-2"/>}</div>
    </div>)
}