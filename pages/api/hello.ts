//import Odoo from "odoo-xmlrpc"
import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "../../node_modules/iron-session/dist/index.cjs";
import sessionConfig from "../../utils/session";
import { IronSessionWithOdoo, NextApiRequestWithSession } from "../../types.js";
import Odoo from "../../node_modules/async-odoo-xmlrpc/lib/index.js";
import getOdooSession from "../../utils/getOdooSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    
    const session : IronSessionWithOdoo = await getIronSession(req,res, sessionConfig)
    if(!session) return res.status(403).json({ msg:"NoSessionProvided"});
    const odoo = await getOdooSession(req,res);
    if(!odoo) return res.status(403).json({ msg:"InvalidOdooSession" });

    const searchParams = [['id', '!=', false]]; // Empty domain to retrieve all users
    const fields = ["id", "name", "login"]; // Add more fields as needed
    const params = [searchParams, fields];
    
    console.log("[hello]params", {odoo, params})
    const search_domain: string[] = [] 
    let group_details;
    const group_ids = await odoo.execute_kw('res.groups', 'search', [search_domain])

    if (group_ids){
        group_details = await odoo.execute_kw('res.groups', 'read', [group_ids])
    }
    else {
        console.log("No groups found.", group_ids)
    }

    // const users = await odoo.execute_kw("res.users", "search_read", params);
    // console.log("[hello]users", users)

    //await odoo.close()
    res.status(200).json({ msg: "Hello world!", group_details })

  } catch(e){
    console.log(e);
    res.status(500).json({ message: 'Something messed up...' })

  }
  

}

export default handler