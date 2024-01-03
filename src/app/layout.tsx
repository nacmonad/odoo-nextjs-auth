import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
            {/* <IronSessionProvider> */}
              {/* <MainContextProvider> */}
                {/* <Navbar/> */}
                  {children}
                {/* <Footer/> */}
              {/* </MainContextProvider> */}
            {/* </IronSessionProvider> */}
      </body>
    </html>
    
  )
}
