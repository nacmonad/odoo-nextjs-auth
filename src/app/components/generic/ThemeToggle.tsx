'use client'
import { FiMoon } from "react-icons/fi";
import { BsSun } from "react-icons/bs";

import { useTheme } from "next-themes";

export default () => {
    const {theme, setTheme} = useTheme();

    return <div>
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
}