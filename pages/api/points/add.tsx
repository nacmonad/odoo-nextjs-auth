// pages/api/points/add.tsx

import { NextApiRequest, NextApiResponse } from 'next';
import initOdoo from '@/utils/odooAdminClient';
import { getIronSession } from '../../../node_modules/iron-session/dist/index.cjs';
import { IronSessionWithOdoo } from '@/types';
import sessionConfig from '@/utils/session';
import isPromotions from '@/utils/isPromotions';
import { OdooSession } from '@/types/index.js';
import { decrypt } from '@/utils/crypto';

interface AddPointsPayload {
  code: string;
  points: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const session: IronSessionWithOdoo = await getIronSession(req, res, sessionConfig);
    if (!session) return res.status(403).json({ error: 'NoSessionProvided' });

    const { odoo }: { odoo: OdooSession } = session;
    const { user, partner } = odoo || {};

    if (!user || !partner) return res.status(403).json({ error: 'NoUserProvided' });
    if (!isPromotions(user)) return res.status(403).json({ error: 'UserNotPromotions' });

    const odooAdminClient = await initOdoo();
    const data: AddPointsPayload = JSON.parse(req.body);
    console.log('/api/points/add', data);

    // Search for the loyalty card with the provided code

    const { code } = data;
    const loyaltyCardSearchResult = await odooAdminClient.execute_kw(
      'loyalty.card',
      'search_read',
      [[['code', '=', decrypt(code)], ['fields', '=', ['id']]]]
    );

    if (loyaltyCardSearchResult.length === 0) {
      return res.status(404).json({ error: 'Loyalty card not found' });
    }

    const loyaltyCardId = loyaltyCardSearchResult[0].id;
    // Read the loyalty.card with the retrieved ID
    const loyaltyCardDetails = await odooAdminClient.execute_kw(
      'loyalty.card',
      'read',
      [loyaltyCardId]
    );
    const existingPoints = loyaltyCardSearchResult[0].points;
    const updatedPoints = existingPoints + data.points;
    
    // Update with the new points
    await odooAdminClient.execute_kw('loyalty.card', 'write', [[loyaltyCardId], { points: updatedPoints }]);

    // Respond with a success message
    return res.status(200).json({ success: true, data: loyaltyCardDetails[0] });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
