import { NextApiRequest, NextApiResponse } from 'next';
import Odoo from 'async-odoo-xmlrpc';
import getOdooSession from '../../../src/utils/getOdooSession';
import { OdooSession } from '@/types/index';
let odoo : Odoo | null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      if(!req.query) throw Error("QueryNotProvided");
      const { id, fields = [ ]} : { id?: string, fields?: string[] }= req.query;
      
        const odoo : OdooSession = await getOdooSession(req,res);
        if(!odoo) throw Error("InvalidOdooPermissions");
        
        if (req.method === "GET") {
        const search_domain: string[] = [] 
        const user_ids = await odoo.execute_kw('res.users', 'search', [search_domain])

        if (user_ids){
            const users = await odoo.execute_kw('res.users', 'read', [[user_ids], fields])
            res.status(200).json( { users })
        }
        else {
            console.log("No users found.")
            res.status(200).json( { users: [] })

        }   
      }
      
      else {
        // Handle other HTTP methods if needed
        res.status(405).json({ message: "Method Not Allowed" });
      }
      
    } catch (e : Error | any | null) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  }