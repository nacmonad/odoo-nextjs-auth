'use client';
// YourNavbarComponent.jsx
import { useEffect, useState, } from "react";
import { useTheme } from "next-themes";
import { FiMoon } from "react-icons/fi";
import { BsSun } from "react-icons/bs";
import Link from "next/link";
import { useIronSession } from "@/contexts/IronSessionProvider";
import { useMainContext } from "@/contexts/MainContextProvider";

import ThemeToggleAnimated from "./ThemeToggleAnimated";

const pages = [{
    title: "Home",
    href: "/"
},
{
    title: "Contact",
    href: "/contact"
}]

const Navbar = () => {
  const session = useIronSession();
  const mainCtx = useMainContext();

  const { location } = mainCtx;
  

  const { odoo } = session || { odoo: { user: null, partner: null } };
  const { user, partner } = odoo;

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();


  if (!theme) setTheme("light");
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);
  if (!mounted) return <></>;



  console.log("[Navbar]mainCtx", mainCtx)
  return (
    <div className=" bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white p-4 flex flex-row justify-between items-center">
      {/* Left side - Menu items */}
      <div className="flex flex-row items-center space-x-4">
        {pages.map((p,i) => (<Link key={i} className="hover:text-gray-500" href={p.href}> {p.title} </Link>))}
        
      </div>

      {/* Right side - Sign Out and Theme Toggle */}
      <div className="flex flex-row items-center space-x-4">
        {/* Lat Long */}
        {location && 
            <div className="text-xs" style={{fontSize:"0.6rem", lineHeight:"0.7rem"}}>
                <p>Lat:{location.latitude}</p>
                <p>Long:{location.longitude}</p>
            </div>}
        {/* ThemeToggle */}
        <div>
          {theme == "light" ? (
            <FiMoon
              size={25}
              className="cursor-pointer"
              onClick={() => setTheme("dark")}
            />
          ) : (
            <BsSun
              size={25}
              className="cursor-pointer"
              onClick={() => setTheme("light")}
            />
          )}

       
        </div>
        
        {/* <ThemeToggleAnimated/> */}

        {/* Authentication links */}
        {session?.odoo ? (
          <a
            href={`/api/auth/signout`}
            className="dark:text-white underline cursor-pointer"
          >
            Sign Out
          </a>
        ) : (
          <Link className="dark:text-white underline cursor-pointer"href="/login">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
