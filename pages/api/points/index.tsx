// pages/api/points.ts
import sessionConfig from '@/utils/session';
import { NextApiRequest, NextApiResponse } from 'next';

import { getIronSession } from '../../../node_modules/iron-session/dist/index.cjs';
import { IronSessionWithOdoo, LoyaltyCardOdoo } from '@/types';
import initAdminOdoo from '@/utils/odooAdminClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   //session info
   const session : IronSessionWithOdoo = await getIronSession(req, res, sessionConfig);
   const { odoo } = session;

   if(!odoo) return res.status(500).json({ error: 'NoOdooSession' });

   const userId = odoo.uid;
   const partnerId = odoo.partner_id;
  try {
    // Initialize Odoo connection
    const odooAdmin = await initAdminOdoo();
   
    // Call the Odoo method to fetch loyalty points
    const result : LoyaltyCardOdoo[] = await odooAdmin.execute_kw('loyalty.card', 'search_read', [
      [['partner_id', '=', partnerId]],
      {},//['points'],
    ]);
    const n = new Date();
    const points = result
        .filter(p=>!p.expiration_date || (p.expiration_date && n < new Date(p.expiration_date)))
        .reduce((a,b)=>a+b.points, 0)
    // // Extract and send the loyalty points in the response
    // const loyaltyPoints = result.length > 0 ? result[0].points || 0 : 0;
     res.status(200).json({ points });
  } catch (error) {
    console.error('Error fetching loyalty points:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
