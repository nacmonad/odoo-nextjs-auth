import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "../../../node_modules/iron-session/dist/index.cjs";
import sessionConfig from "../../../src/utils/session";
// pages/api/auth/signout.js
export default async function handler(req:NextApiRequest, res: NextApiResponse) {

    const session = await getIronSession(req, res, sessionConfig);
    // Close Odoo connection
    if (session) {
        
        console.log("deleting session", session)
        await session.destroy();
    }
  
    // Send success response
    res.status(302).redirect(`/`);
  }
  