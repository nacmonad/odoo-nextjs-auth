'use client';

import { useMainContext } from "@/contexts/MainContextProvider";
import { UserOdoo } from "@/types/index";
import { useEffect, useState } from "react";
import DropdownMenu from "./DropdownMenu";
//import { IronSessionWithOdoo, OdooSession, UserOdoo } from "@/types/index.js";
//import { ResponseCookies } from "next/dist/server/web/spec-extension/cookies.js";

export default function UserDropdown() {
    const [userDetails, setUserDetails] = useState<null|UserOdoo>(null);
    const mainCtx = useMainContext();
    const { user, session } = mainCtx;
    
    async function fetchUserDetails() {
      const uid  = user?.id;
      if(!uid) throw Error("NoUserId");
      const userRes = await fetch(`/api/users/${uid}?fields=["name", "email", "avatar_128"]`);
      const { user : userDeetz } = await userRes.json();
      setUserDetails(userDeetz);
    }
    
    useEffect(()=>{
      if(user) fetchUserDetails();
      },[user])

    return (
      <div className="flex items-center">
        <DropdownMenu user={userDetails}/>
      </div>
    );
  }