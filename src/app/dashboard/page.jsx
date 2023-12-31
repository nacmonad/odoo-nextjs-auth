// pages/dashboard.js

import { cookies } from 'next/headers';
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
    const { host, port, db, username, secure, uid, partner_id, user, partner } = odoo;
    
    const points_res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/points`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Cookie': sessionCookies || '',
          }
    });
    const { points, total } = await points_res.json()
    console.log("[DashboardPage]getPoints", {odoo, points, total })

  
    // Extract necessary data from the session object

// Create a plain JavaScript object


// Pass the sanitizedSession object to the IronSessionProvider

    /*Sanitize the session, there are hidden method calls that throw warning */
  return (
          <div className="flex flex-grow items-center justify-center bg-gray-800 text-white">
            <div className="bg-gray-700 p-8 rounded-md shadow-md text-white">
              <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
              {odoo ? (
                      <>
                      <p>Welcome, {odoo.username}!</p>
                      <p>Email: {odoo.email}</p>
                      <p>Role: {odoo.role}</p>
                      <p>Points: {total}</p>
                      {/* Add other user details as needed */}
                      </>
                  ) : (
                      <div>
                          <p>User not authenticated</p>
                          <a 
                            className="text-white underline"
                            href="/login">Return to Login</a>
                      </div>
                  )}
                    {isPromotions(user) && <IssuePointsDialog/>}
                    <ReceivePointsDialog initialCards={points}/>
                
            </div>
          </div>

  );
};

export default DashboardPage;
