'use client';
import { LegacyRef, MutableRefObject, useRef } from "react";

import { useTheme } from "next-themes";
const Toggle = () => {
    const {theme, setTheme} = useTheme();
    const toggleButtonRef : MutableRefObject<HTMLInputElement | null> = useRef(null);

    function updateButton() {
        
        if (document.body.classList.contains('dark-mode') && toggleButtonRef) {
            toggleButtonRef.current?.classList.add('dark');
            setTheme("dark")
        } else if(toggleButtonRef) {
            toggleButtonRef.current?.classList.remove('dark');
            setTheme("light")
        }
    }
    function handleToggle() {
        document.body.classList.toggle('dark-mode');
    
        const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        updateButton();
    }



      if (typeof window === 'undefined') return <></>;

    return  <div className="flex items-center justify-center relative h-10 w-16">
                <label className="switch" id="toggle-theme-label">
                <input type="checkbox" id="toggle-theme" ref={toggleButtonRef} onChange={handleToggle}/>
                <span className="slider round"></span>
            </label>
        </div>
}

export default Toggle;