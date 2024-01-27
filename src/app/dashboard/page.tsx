// pages/dashboard.js

import { cookies } from 'next/headers';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";


import sessionConfig from '@/utils/session';
import { getIronSession } from '../../../node_modules/iron-session/dist/index.cjs';
import IssuePointsDialog from '@/app/components/dialogs/IssuePointsDialog';
import ReceivePointsDialog from '@/app/components/dialogs/ReceivePointsDialog';

//import { ThemeProvider } from 'next-themes'

import isPromotions from '@/utils/isPromotions';
import { IronSessionWithOdoo } from '@/types/index';


const DashboardPage = async ( ) => {

    /* This is a server component so we can't useContext */
    const sessionCookies = cookies();
    const session : IronSessionWithOdoo = await getIronSession(sessionCookies as any, sessionConfig);
    const { odoo } = session;    
    const { user, partner } = odoo ? odoo : { user:null, partner:null };

    const { complete_name:name, email_normalized: email } = user ? user : { complete_name:null, email_normalized:null };
    const url = `${process.env.NEXT_PUBLIC_HOST}/api/points`;
    const points_res = await fetch(url);
    console.log("points_res", { url, points_res})
    if(!points_res.ok) throw Error("PointsFetchError");
    const { points, total } = await points_res.json()

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
                      {user && isPromotions(user) && <IssuePointsDialog/>}
                      <ReceivePointsDialog initialCards={points}/>
                  </CardBody>
                </Card>
            </div>

    );
};

export default DashboardPage;
