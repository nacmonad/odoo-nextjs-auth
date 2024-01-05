// ./src/contexts/MainContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserOdoo, PartnerOdoo, IronSessionWithOdoo } from '@/types/index';// Define the shape of your context

import { useIronSession } from './IronSessionProvider';
import { PushSubscription } from 'web-push';
import { Location } from '@/types/index';
import QRCode from 'qrcode';

interface MainContextProps {
  user: UserOdoo | null | undefined;
  partner: PartnerOdoo | null | undefined;
  qrCode: string | null ;
  subscription: PushSubscription | null;
  location : Location | null,
  clearContext: () => void
}

// Create the context
const MainContext = createContext<MainContextProps | undefined>(undefined);

// Create a custom hook to use the context
export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useMainContext must be used within a MainContextProvider');
  }
  return context;
};


// Create the context provider component
interface MainContextProviderProps {
  children: ReactNode;
}

export const MainContextProvider: React.FC<MainContextProviderProps> = ({ children }) => {
  const session : IronSessionWithOdoo = useIronSession();
  const { odoo } = session;

  let sessionUser, sessionPartner;
  if(odoo?.user && odoo?.partner) {
    sessionUser = odoo.user;
    sessionPartner = odoo.partner;
  } 
  
  const [user, setUser] = useState<UserOdoo | null | undefined>(sessionUser);
  const [partner, setParner] = useState<PartnerOdoo | null | undefined>(sessionPartner);
  const [location, setLocation] = useState<null|Location>(null);
  const [qrCode, setQrCode] = useState<string|null>(null)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  
  function clearContext() {
    setUser(null);
    setParner(null)
    setLocation(null);
    setQrCode(null);
    setSubscription(null);
    
  }
  function initRssFeeds() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notification permission granted!', navigator.serviceWorker);
            // Now, you can obtain a push subscription.

            // Subscribe to the push events
            
            navigator.serviceWorker
                .register('/sw.js')
                .then(registration => {
                console.log("Service Worker Registered", registration)
                registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: process.env.NEXT_PUBLIC_APPLICATION_SERVER_KEY })
                  .then(subscription => {
                    // Send the subscription details to your server
                    console.log("pushManager", subscription);
                    if(partner) {
                      const headers = new Headers();
                      headers.append('Content-Type', 'application/json');
                      headers.append('x-odoo-partner-id', String(partner.id));

                    fetch(`${process.env.NEXT_PUBLIC_PUSH_HOST}/api/subscribe`, {
                      method:"POST",
                      headers,
                      body: JSON.stringify(subscription)
                    })
                    .then(res=> res.json())
                    .then(sub=> {
                      console.log("Subscribed!", sub);
                      if(sub.subscription) {
                        const subCopy = { ...sub.subscription };
                        //don't need to expose private info but its' there
                        delete subCopy.keys;
                        setSubscription(subCopy);
                      }
                    }).catch((err : Error | null | undefined) => console.error(err))
                  }
                    
                  })
                  .catch(error => {
                    console.error('Error subscribing to push notifications:', error);
                  });
              });


        }
      });
    }
   }
   function initQrReceiveCode() {
        if(partner) {
          QRCode.toDataURL(JSON.stringify({
              partner_id: partner.id,
              complete_name: partner.complete_name,
              email_normalized: partner.email_normalized

          })).then((url:string)=>setQrCode(url))
          .catch(console.error)
        }
   }



  /* RSS PUSH NOTIFICATIONS SUBSCRIBER */
  useEffect(( )=>{
    // In your React component or main application file
    if(session) {
      initRssFeeds();
      initQrReceiveCode();
    }
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
    
    return ()=>{

    }
}, [])


const contextValue: MainContextProps = {
  user,
  partner,
  location,
  qrCode,
  subscription,
  clearContext
};
console.log("[mainCtx]", {
  odoo,
  user,
  partner
})


  return <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>;
};

