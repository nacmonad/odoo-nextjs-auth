// pages/api/auth/signup.js
import { withIronSession } from '../../../node_modules/next-iron-session/lib/index';
import { NextApiRequest, NextApiResponse } from '../../../node_modules/next/dist/shared/lib/utils';

import sessionConfig from '../../../src/utils/session';
import Odoo from '../../../node_modules/async-odoo-xmlrpc/lib/index';

import { NextApiRequestWithSession } from '@/types';

async function signupHandler(req: NextApiRequestWithSession, res: NextApiResponse) {
  // Retrieve user information from the request body
  const { username, password, email } = req.body;

  try {
    // Initialize Odoo client
    const odoo = new Odoo({
      username: process.env.ODOO_ADMIN_USERNAME,
      password: process.env.ODOO_ADMIN_PASSWORD,
      db: process.env.ODOO_DB,
      url: process.env.ODOO_URL,
      port: 443
    }

    );
    const uid = await odoo.connect();

    const userData = {
      name: username,
      login: email,
      password,
      groups_id: [
        [6, 0, [ // 6 indicates a replacement of the current list of groups
          10 // Portal group
        ]],
      ],
    }
    const userId = await odoo.execute_kw('res.users', 'create', [[userData]])

    if (userId) {
      // User creation successful
      res.status(201).json({ success: true, userId });
    } else {
      // User creation failed
      res.status(500).json({ success: false, message: 'User creation failed' });
    }
  } catch (error: Error | string | any) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
}

export default withIronSession(signupHandler, sessionConfig);
