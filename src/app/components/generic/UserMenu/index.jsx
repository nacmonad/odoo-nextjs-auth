import { cookies } from "next/headers";
import { Link } from "@nextui-org/link"
import { getIronSession } from "iron-session";
import sessionConfig from "@/utils/session";

import DropdownMenu from "./DropdownMenu";
//import { IronSessionWithOdoo, OdooSession, UserOdoo } from "@/types/index.js";
//import { ResponseCookies } from "next/dist/server/web/spec-extension/cookies.js";

export default async function UserDropdown() {
  
    const sessionCookies = cookies();
    const session = await getIronSession(sessionCookies, sessionConfig);
    const { odoo } = session;
    const { uid } = odoo;
    
    console.log("[UserDropdown]session", session)

    const userRes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/${uid}?fields=["name", "email", "avatar_128"]`, {
      method:"GET",
      headers: {
        'Content-Type': 'application/json',
        'Cookie': sessionCookies || ''
      }})

    const { user } = await userRes.json();
    const { avatar_128, email, name } = user;

    console.log("Fetched user avatar: ", avatar_128);
    
    return (
      <div className="flex items-center gap-4">
        <DropdownMenu user={user}/>
    </div>
    );
  }