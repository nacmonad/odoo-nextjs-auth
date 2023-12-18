// pages/api/auth/login.js
//import { withIronSession } from 'iron-session';
import { withIronSession } from '../../../node_modules/next-iron-session/lib/index';
import { NextApiRequest, NextApiResponse } from '../../../node_modules/next/dist/shared/lib/utils';

import sessionConfig from '../../../utils/session';
import OdooClient from "../../../utils/odoo";

import { NextApiRequestWithSession } from '../../../types';

async function handler(req:NextApiRequestWithSession, res:NextApiResponse) {
  // Retrieve credentials from the request body
  const { username, password } = req.body;

  try{
    // Initialize Odoo client
  const { client: odoo } = new OdooClient(username, password, process.env.ODOO_DB_NAME, process.env.ODOO_URL);
  await odoo.connect();
  // Authenticate user
  console.log(odoo)
  if (odoo) {
    // Store Odoo client in session
    req.session.set('odoo', odoo); // Set the 'odoo' property in the session
    req.session.odoo = odoo;
    await req.session.save();

    req.session.odoo = odoo;

    // Send success response
    res.status(200).json({ success: true, client:odoo });
  } else {
    // Send authentication failure response
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
  } catch(e) {
    console.error(e)
    res.status(500).json({ error: e })
  }
}

export default withIronSession(handler, sessionConfig);
