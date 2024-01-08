
'use client';

import { useMainContext } from "@/contexts/MainContextProvider";
import { useEffect, useState } from "react";
import DropdownMenu from "./DropdownMenu";
//import { IronSessionWithOdoo, OdooSession, UserOdoo } from "@/types/index.js";
//import { ResponseCookies } from "next/dist/server/web/spec-extension/cookies.js";

export default function UserDropdown() {
    const [userDetails, setUserDetails] = useState({});
    const mainCtx = useMainContext();
    const { user, session } = mainCtx;
    
    async function fetchUserDetails() {
      const uid  = user.id;
      const userRes = await fetch(`/api/users/${uid}?fields=["name", "email", "avatar_128"]`);
      const { user : userDeetz } = await userRes.json();
      setUserDetails(userDeetz);
    }
    
    useEffect(()=>{
      if(user) fetchUserDetails();
      },[user])
    console.log("[UserDropdown]session", { user, session })

    return (
      <div className="flex items-center gap-4">
        <DropdownMenu user={userDetails}/>
    </div>
    );
  }