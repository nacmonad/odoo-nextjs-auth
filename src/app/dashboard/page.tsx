// pages/dashboard.js
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers';

import sessionConfig from '@/utils/session';
import { getIronSession } from '../../../node_modules/iron-session/dist/index.cjs';
import { IronSessionWithOdoo } from '@/types/index';
import PointsCard from '@/app/dashboard/components/PointsCard';


const DashboardPage = async ( ) => {

    /* This is a server component so we can't useContext */
    const cookieStore = cookies()
    const ttpCookie = cookies().get(process.env.APP_COOKIE_NAME || '');
    if(!ttpCookie) redirect('/login');
    
    const session : IronSessionWithOdoo = await getIronSession(cookieStore as any, sessionConfig);
    const { odoo } = session;    
    const { user, partner } = odoo ? odoo : { user:null, partner:null };

    const { complete_name:name, email_normalized: email } = user ? user : { complete_name:null, email_normalized:null };
    const url = `${process.env.NEXT_PUBLIC_HOST}/api/points`;
    
    const points_res = await fetch(url, {
      headers:{
        "Content-Type": "application/json",
        "Cookie": ttpCookie ? `${ttpCookie.name}=${ttpCookie.value};` : ``
      }
    });
    if(!points_res.ok) throw Error("PointsFetchError");
    const { points, total } = await points_res.json()

    return (
            <div className="flex flex-grow items-center justify-center">
                <PointsCard session={session} points={points} total={total}/>
            </div>

    );
};

export default DashboardPage;
