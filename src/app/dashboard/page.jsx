// pages/dashboard.js

import { cookies } from 'next/headers';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";


import sessionConfig from '@/utils/session';
import { getIronSession } from '../../../node_modules/iron-session/dist/index.cjs';
import IssuePointsDialog from '@/app/components/dialogs/IssuePointsDialog';
import ReceivePointsDialog from '@/app/components/dialogs/ReceivePointsDialog';

//import { ThemeProvider } from 'next-themes'

import isPromotions from '@/utils/isPromotions';


const DashboardPage = async ( ) => {

    /* This is a server component so we can't useContext */
    const sessionCookies = cookies();
    const session = await getIronSession(sessionCookies, sessionConfig);
    const { odoo } = session;
    const { host, port, db, secure, uid, partner_id, user, partner, username, role } = odoo;
    const { complete_name:name, email_normalized: email } = user;
    
    const points_res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/points`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Cookie': sessionCookies || '',
          }
    });
    const { points, total } = await points_res.json()
    console.log("[DashboardPage]getPoints", { session, user, partner })

  return (
          <div className="flex flex-grow items-center justify-center">
               <Card className="py-4 w-64 h-72">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny uppercase font-bold">Points Summary</p>
                  <small className="text-default-500">{email}</small>
                  <h4 className="font-bold text-large">Welcome, {name}!</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <p className="ml-2">Points: {total}</p>
                    {isPromotions(user) && <IssuePointsDialog/>}
                    <ReceivePointsDialog initialCards={points}/>
                </CardBody>
              </Card>
          </div>

  );
};

export default DashboardPage;
