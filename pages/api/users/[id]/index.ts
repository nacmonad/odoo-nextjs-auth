import { NextApiRequest, NextApiResponse } from 'next';
import Odoo from 'async-odoo-xmlrpc';
import getOdooSession from '@/utils/getOdooSession';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      let odoo : Odoo | null = await getOdooSession(req, res);

      if (!odoo) return res.status(500).send("OdooNotInitialized")
      
      /* GET /api/users/[id] */
      if (req.method === "GET") {

        const search_domain: string[] = [] 
        const group_ids = odoo.execute_kw('res.groups', 'search', [search_domain])

        if (group_ids){
            const group_details = odoo.execute_kw('res.groups', 'read', [group_ids])
            console.log(`GroupIDs:`, group_ids)}
        else {
            console.log("No groups found.")
        }

        // Get the user with a specific ID from the URL parameter
        const userId = req.query.id as string;
        const searchDomain = [['id', '=', parseInt(userId)]];
        const userIDs = await odoo.execute_kw('res.users', 'search', [searchDomain]);

        if (userIDs.length > 0) {
            // Retrieve details of the first user found (assuming unique IDs)
            const userDetails = await odoo.execute_kw('res.users', 'read', [userIDs[0]]);
            res.status(200).json({ userDetails });
        } else {
            res.status(404).json({ message: "User not found" });
        }
      } 
      /* DELETE /api/users/[id] */
      else if (req.method === "DELETE") {
        // Get the user ID to be deleted from the URL parameter
            if(!req.query.id) res.status(500).json( { message: "ID not provided."} )
            const userId = req.query.id as string;

            // Check if the user exists before attempting to delete
            const userExists = await odoo.execute_kw('res.users', 'search', [[['id', '=', parseInt(userId)]]]);

            if (userExists.length > 0) {
                // Delete the user
                const deletedUserId = await odoo.execute_kw('res.users', 'unlink', [[parseInt(userId)]]);
                res.status(200).json({ deletedUserId, message: "User deleted successfully" });
            } else {
                res.status(404).json({ message: "User not found" });
            }
      }
      else {
        // Handle other HTTP methods if needed
        res.status(405).json({ message: "Method Not Allowed" });
      }
 
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Something went wrong...' });
    }
  }