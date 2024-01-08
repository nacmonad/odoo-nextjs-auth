import '../globals.css'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'

import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import { IronSessionWithOdoo } from '@/types/index';
import { getIronSession } from 'iron-session';

import sessionConfig from '@/utils/session';
import { IronSessionProvider } from '@/contexts/IronSessionProvider';
import { MainContextProvider } from '@/contexts/MainContextProvider';
import UserMenu from '@/app/components/generic/UserMenu';
import ThemeProvider from '@/contexts/ThemeProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Sago Rewards",
  viewport: "width=device-width, initial-scale=1.0",
  //viewport: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover',
  manifest: "/manifest.json",
};

const RootLayout = async function({
  children,
}) {

    //const sessionCookies : CookieStore = ;
    
    const session = await getIronSession(cookies(), sessionConfig);


    const odoo = session?.odoo ? session.odoo : null;
    
    let sanitizedSession;
    if(odoo) {
      const { host, port, db, username, secure, uid, partner_id, user, partner } = odoo;
      sanitizedSession = {
        odoo: {
          host,
          port,
          db,
          username,
          secure,
          uid,
          partner_id,
          user: {
            id: user.id,
            complete_name: user.complete_name,
            email_normalized: user.email_normalized,
            partner_id: user.partner_id,
            lang: user.lang,
            tz: user.tz,
            groups_id: user.groups_id,
          },
          partner: {
            id: partner.id,
            complete_name: partner.complete_name,
            email_normalized: partner.email_normalized,
            is_blacklisted: partner.is_blacklisted,
          },
        },
      }
    }
    
  //   /* Must sanitize, session object has some hidden methods associated with next iron session/odoo */
    

 
  return (
          <IronSessionProvider session={sanitizedSession}>
           <MainContextProvider>
               <ThemeProvider>
                <Navbar/>
                  {children}
                <Footer/>  
              </ThemeProvider>
              </MainContextProvider> 
            </IronSessionProvider>    
  )
}

export default RootLayout;