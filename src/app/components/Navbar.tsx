'use client';

import {
  Link,
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/react";


import ThemeToggle from "./generic/ThemeToggle";
import LocationIndicator from "./generic/LocationIndicator";
import UserMenu from "./generic/UserMenu";
import PlaceholderLogo from "../../../public/logo-placeholder.png";
import Image from 'next/image';

import { useState } from "react";

import { usePathname } from "../../../node_modules/next/dist/client/components/navigation";

const pages = [{
    title: "Home",
    href: "/"
},
{
  title: "Dashboard",
  href: "/dashboard"
},
{
  title: "Shop",
  href: "/shop"
},
{
    title: "Contact",
    href: "/contact"
}]

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  
  const currentPath = usePathname();
  console.log("[NavBar]", currentPath);

  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      <NavbarBrand>
        <Image 
          src={PlaceholderLogo}
          width={48}
          height={48}
        />
        <p className="font-bold text-inherit ml-4">ACME</p>
        <NavbarContent className="hidden sm:flex ml-8">
        {pages.map((p,i) => (
        <NavbarItem key={i} isActive={ currentPath === p.href }>
            <Link color="foreground"  href={p.href}> {p.title} </Link>
        </NavbarItem>))}
        </NavbarContent>
      </NavbarBrand>
      
      <NavbarContent className="hidden sm:flex gap-4" justify="flex-end">    
          <ThemeToggle/>        
          <LocationIndicator/>
          <UserMenu/>
      </NavbarContent>
      
      <NavbarMenu>
        {pages.map(({ href, title }, index) => (
          <NavbarMenuItem key={`${title}-${index}`} isActive={ currentPath === href }>
            <Link
              color={
                index === 2 ? "primary" : index === pages.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href={href}
              size="lg"
            >
              {title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

    </Navbar>
  );
};

export default NavbarComponent;
