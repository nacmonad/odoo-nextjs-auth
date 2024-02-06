import '@/app/globals.css'

import { Inter } from 'next/font/google'

import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import { ReactElement } from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Sago Rewards",
  viewport: "width=device-width, initial-scale=1.0",
  //viewport: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover',
  manifest: "/manifest.json",
};

const RootLayout = async function({
  children,
}: { children: ReactElement }) {

  return (<main className="flex flex-col h-screen">
            <Navbar/>
                {children}
            <Footer/>
          </main>
  )
}

export default RootLayout;