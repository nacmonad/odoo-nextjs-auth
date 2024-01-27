// app/providers.jsx
// Client component providers here
// Note IronSession handled server side
'use client'

import { MainContextProvider } from '@/contexts/MainContextProvider'
import { ThemeProvider } from 'next-themes'
import { NextUIProvider } from "@nextui-org/react";
import { ReactElement } from 'react';


export function Providers({ children }: {children: ReactElement}) {
  return (<ThemeProvider attribute="class" defaultTheme="dark" themes={["light", "dark"]}>
  <NextUIProvider>
    <MainContextProvider>
            {children}
    </MainContextProvider>
  </NextUIProvider>
</ThemeProvider>) 
        
}