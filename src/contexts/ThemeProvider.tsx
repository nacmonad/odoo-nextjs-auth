// app/providers.jsx

'use client'

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

export default function Providers({ children } : { children:ReactNode }) {

  return (
  <NextUIProvider>
    <ThemeProvider 
            attribute="class"
            defaultTheme="dark"
            themes={["light", "dark"]}
            >
                {children}
    </ThemeProvider>
  </NextUIProvider>)
}