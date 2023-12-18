import Odoo from "../node_modules/async-odoo-xmlrpc/lib/index";
import { getIronSession } from "../node_modules/iron-session/dist/index.cjs";
import { NextApiRequest } from "../node_modules/next/dist/shared/lib/utils";
import { IronSessionWithOdoo } from "../types";
import sessionConfig from "./session";

export default async function(req:NextApiRequest,res: NextApiResponse) {
    try {
        const session : IronSessionWithOdoo = await getIronSession(req,res, sessionConfig)
        if(!session) return res.status(403).json({ msg:"NoSessionProvided"})

        const { odoo:odooCredentials } = session;
        const { username, password } = odooCredentials;
        const odoo = new Odoo({
            username, 
            password, 
            db:process.env.ODOO_DB_NAME, 
            port: 443,
            url: process.env.ODOO_URL});
        await odoo.connect();

        return odoo;
    } catch(e) {
        console.error(e);
        return false;
    }
}