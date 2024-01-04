import Odoo from "../../node_modules/async-odoo-xmlrpc/lib/index";
import { getIronSession } from "../../node_modules/iron-session/dist/index.cjs";
import { NextApiRequest, NextApiResponse } from "../../node_modules/next/dist/shared/lib/utils";
import { IronSessionWithOdoo } from "@/types";
import sessionConfig from "./session";
import { OdooSession } from "@/types/index";

export default async function(req:NextApiRequest,res: NextApiResponse) {
    try {
        const session : IronSessionWithOdoo = await getIronSession(req,res, sessionConfig)
        if(!session) return null;

        const { odoo: odooCredentials } = session;
        if(!odooCredentials) return null;
        const { username, password } = odooCredentials;
        const odoo : Odoo & { uid?:number , partner_id?:number}= new Odoo({
            username, 
            password, 
            db:process.env.ODOO_DB, 
            port: 443,
            url: process.env.ODOO_URL});
        const uid = await odoo.connect();
        odoo.uid = uid;
        odoo.partner_id = odooCredentials.partner_id
        return odoo;
    } catch(e) {
        console.error(e);
        return null;
    }
}