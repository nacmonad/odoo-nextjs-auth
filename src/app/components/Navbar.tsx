import {Link} from "@nextui-org/link";

import ThemeToggle from "./generic/ThemeToggle";
import LocationIndicator from "./generic/LocationIndicator";
import UserMenu from "./generic/UserMenu";

const pages = [{
    title: "Home",
    href: "/"
},
{
    title: "Contact",
    href: "/contact"
}]

const Navbar = () => {
  console.log("[NavBar]")
  return (
    <div className=" bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white p-4 flex flex-row justify-between items-center">
      {/* Left side - Menu items */}
      <div className="flex flex-row items-center space-x-4">
        {pages.map((p,i) => (<Link key={i} href={p.href}> {p.title} </Link>))}
      </div>

      {/* Right side - Sign Out and Theme Toggle */}
      <div className="flex flex-row items-center space-x-4">
        <LocationIndicator/>
        <ThemeToggle/>        
        {/* <ThemeToggleAnimated/> */}
        <UserMenu/>
      </div>
    </div>
  );
};

export default Navbar;
