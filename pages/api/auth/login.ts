// pages/api/auth/login.js
//import { withIronSession } from 'iron-session';
import { withIronSession } from '../../../node_modules/next-iron-session/lib/index';
import { NextApiResponse } from '../../../node_modules/next/dist/shared/lib/utils';

import sessionConfig from '../../../src/utils/session';
import initAdminOdoo from '@/utils/odooAdminClient';

import Odoo from '../../../node_modules/async-odoo-xmlrpc/lib/index';
import { OdooSession, NextApiRequestWithSession } from '@/types/index';


async function handler(req:NextApiRequestWithSession, res:NextApiResponse) {
  // Retrieve credentials from the request body
  const { username, password } = req.body || req.query;

  console.log("[login]", { username, password })
  try{
    // Initialize Odoo client
    const odoo : Odoo = new Odoo({
        username, 
        password, 
        db:process.env.ODOO_DB, 
        url: process.env.ODOO_URL,
        port: 443,
    });
    
    console.log("[login]", odoo);
    const uid = await odoo.connect();

     // Retrieve user information (including partner_id)
     const odooAdmin = await initAdminOdoo();
     const userData = await odooAdmin.execute_kw('res.users', 'read', [[uid], ['complete_name', 'email_normalized',  'partner_id',  'lang', 'tz','groups_id']]);
     const partnerId = userData[0].partner_id[0];
     const partnerData = await odooAdmin.execute_kw('res.partner', 'read', [[partnerId], ['complete_name', 'email_normalized', 'is_blacklisted']]);


    //console.log("[login]userdump", userDetails)
     const odooSession : OdooSession = {
        ...odoo,
        uid,
        partner_id: partnerId,
        user: userData[0],
        partner: partnerData[0],
     }

     //delete odooSession.password;
    
  if (odoo) {
    // Store Odoo client in session
    //delete odoo.password;
    req.session.set('odoo', odooSession); // Set the 'odoo' property in the session
    await req.session.save();
    // Send success response
    res.json({
      odoo:odooSession
    });
  } else {
    // Send authentication failure response
    res.json({
      error: `Authentication failed.`
    });
  }
  } catch(e : Error | any) {
    console.error(e)
    res.json({
      error:e.message
    })
  }
}

export default withIronSession(handler, sessionConfig);
