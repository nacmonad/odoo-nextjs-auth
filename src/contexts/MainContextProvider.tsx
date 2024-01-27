// ./src/contexts/MainContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserOdoo, PartnerOdoo, IronSessionWithOdoo, LoyaltyCardOdoo } from '@/types/index';// Define the shape of your context

import { useIronSession } from './IronSessionProvider';
import { PushSubscription } from 'web-push';
import { Location } from '@/types/index';
import QRCode from 'qrcode';
import logger from '@/logger';


interface MainContextProps {
  user: UserOdoo | null | undefined;
  partner: PartnerOdoo | null | undefined;
  qrCode: string | null ;
  initQrReceiveCode: (code: string) => void;
  subscription: PushSubscription | null;
  location : Location | null;
  loyaltyCards : LoyaltyCardOdoo[] | [];
  initLoyaltyCard : () => Promise<LoyaltyCardOdoo>;
  setLoyaltyCards : React.Dispatch<React.SetStateAction<LoyaltyCardOdoo[] | []>>;
  clearContext: () => void;
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
  const { odoo } = session ? session : { odoo: null };

  let sessionUser, sessionPartner;
  if(odoo?.user && odoo?.partner) {
    sessionUser = odoo.user;
    sessionPartner = odoo.partner;
  }
  
  
  const [location, setLocation] = useState<null|Location>(null);
  const [qrCode, setQrCode] = useState<string|null>(null);
  const [loyaltyCards, setLoyaltyCards] = useState<LoyaltyCardOdoo[] | []>([])
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  
  function clearContext() {
    setLocation(null);
    setQrCode(null);
    setSubscription(null);
    
  }
  function initRssFeeds() {
    console.log("initRssFeeds", window)
    if("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(
        function (registration) {
          console.log("Service Worker registration successful with scope: ", registration.scope);



          if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted!', navigator.serviceWorker);
                // Now, you can obtain a push subscription.
    
                // Subscribe to the push events
                navigator.serviceWorker.ready.then(registration => {
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

          
        },
        function (err) {
          console.error("Service Worker registration failed: ", err);
        }
      );
    }
    
    
   }

   async function initLoyaltyCard(){
      try {
        const partner_id = partner?.id;
        if(!partner_id) throw Error("NoPartnerId");

        const r = await fetch(`/api/points/issue`, {
          method:"POST",
          body: JSON.stringify({
            partner_id,
            points: 0,
            expiration_date: false,
            program_id : parseInt(process.env.NEXT_PUBLIC_ODOO_LOYALTY_PROGRAM_ID || '2')
          })
        });
        const p = await r.json();
        console.log("[initLoyaltyCard]", p)
        setLoyaltyCards([...loyaltyCards, p]);
        if(p.error) throw Error(p.error);
        return p.data;
      } catch(e) {
        console.error(e);
      }
   }

   function initQrReceiveCode(code:string) {
        if(partner) {
          console.log("[initQrReceiveCode]", {
            partner_id: partner.id,
            complete_name: partner.complete_name,
            email_normalized: partner.email_normalized,
            code,

        })
          QRCode.toDataURL(JSON.stringify({
              partner_id: partner.id,
              complete_name: partner.complete_name,
              email_normalized: partner.email_normalized,
              code,

          })).then((url:string)=>setQrCode(url))
          .catch(console.error)
        }
   }

   function handleLocationChange(position:GeolocationPosition) {
    console.log("[handleLocationChange]", position);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
  
   }
  /* RSS PUSH NOTIFICATIONS SUBSCRIBER */
  useEffect(( )=>{
    // In your React component or main application file
    if(session) {
      initRssFeeds();
      //initQrReceiveCode();
    }
    
    let watchId : number | undefined;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleLocationChange,
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
      watchId = navigator.geolocation.watchPosition(
        handleLocationChange,
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );

    } else {
      console.error('Geolocation is not supported by this browser.');
    }
    
    return ()=>{

      if(watchId) navigator?.geolocation?.clearWatch(watchId);
    }
}, [])


const contextValue: MainContextProps = {
  user: sessionUser,
  partner: sessionPartner,
  initLoyaltyCard,
  loyaltyCards,
  setLoyaltyCards,
  location,
  initQrReceiveCode,
  qrCode,
  subscription,
  clearContext,
};
console.log("[mainCtx]", {
  odoo,
  sessionUser,
  sessionPartner
})

  return <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>;
};

