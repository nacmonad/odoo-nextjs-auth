// pages/api/points/issue.tsx

import { NextApiRequest, NextApiResponse } from 'next';
import initOdoo from '@/utils/odooAdminClient';
import { getIronSession } from '../../../node_modules/iron-session/dist/index.cjs';
import { IronSessionWithOdoo } from '@/types';
import sessionConfig from '@/utils/session';
import isPromotions from '@/utils/isPromotions';
import { OdooSession } from '@/types/index.js';

interface IssuePointsPayload {
  partner_id: number;
  program_id: number;
  points: number;
  expires_at: Date | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }



  try {
    const session : IronSessionWithOdoo = await getIronSession(req,res, sessionConfig)
    if(!session) return res.status(403).json({ error:"NoSessionProvided"});
    const { odoo } : { odoo: OdooSession } = session;
    const { user, partner } = odoo || {};

    if(!user || !partner) return res.status(403).json({ error: "NoUserProvided"})
    if(!isPromotions(user)) return res.status(403).json({ error: "UserNotPromotions"});
    
    const odooAdminClient = await initOdoo();
    const data: IssuePointsPayload = JSON.parse(req.body);
    console.log("/api/points/issue", data);
    
    // Validate the data or perform any necessary operations
    const loyaltyCard = await odooAdminClient.execute_kw('loyalty.card', 'create', [[data]]);
    const loyaltyCardDetails = await odooAdminClient.execute_kw('loyalty.card', 'read', [loyaltyCard])


    //PUSH POINT AWARDED EVENT TO THE RECIPIENT
    try {
      await fetch(`${process.env.NEXT_PUBLIC_PUSH_HOST}/api/push`, {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "x-odoo-partner-id": `${partner.id}`,
          "x-sago-push-token": process.env.SAGO_PUSH_TOKEN || ``
        }, 
        body:JSON.stringify({
          payload: {
            partner_id: data.partner_id,
            type: "POINTS_ISSUED",
            payload: {
              ...loyaltyCardDetails[0]
            }
          }
        })
      });
    } catch(e) {
      console.error(e);
    }


    // Respond with a success message
    return res.status(200).json({ success: true , data:loyaltyCardDetails[0] });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
