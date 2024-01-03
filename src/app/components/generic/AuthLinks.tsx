'use client';

import { Link } from "@nextui-org/link"

import { useIronSession } from "@/contexts/IronSessionProvider"

export default () => {
    const session = useIronSession();
    const  { odoo } = session;

    if(session) return (        
        <Link
          href={`/api/auth/signout`}
          className="dark:text-white underline cursor-pointer"
        >
          Sign Out
        </Link>
      ) 
      
      return (
        <Link href="/login">
          Sign In
        </Link>
        )
       
}