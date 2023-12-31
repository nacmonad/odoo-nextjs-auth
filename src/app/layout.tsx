import { Inter } from 'next/font/google'

import './globals.css'
import Footer from './components/Footer';
import Navbar from './components/Navbar';


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
            {/* <IronSessionProvider> */}
              {/* <MainContextProvider> */}
                {/* <Navbar/> */}
                  {children}
                {/* <Footer/> */}
              {/* </MainContextProvider> */}
            {/* </IronSessionProvider> */}
          </div>
      </body>
    </html>
    
  )
}
