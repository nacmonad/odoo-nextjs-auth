import { NextApiRequest, NextApiResponse } from 'next';
import Odoo from 'async-odoo-xmlrpc';
import getOdooSession from '@/utils/getOdooSession';
import { OdooSession } from '@/types/index';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      if(!req.query) throw Error("QueryNotProvided");
      const { id, fields = [ ]} : { id?: string, fields?: string[] }= req.query;

      if(!id) throw Error("NoIdProvided");
      const userId = parseInt(id);


      let odoo : OdooSession = await getOdooSession(req, res);

      if (!odoo) return res.status(500).send("OdooNotInitialized");
      if(odoo.uid != userId) return res.status(403).send("Forbidden");

      console.log("[users]GET:", odoo)

      /* GET /api/users/[id] */
      if (req.method === "GET") {
        const fieldsArray = Array.isArray(fields) ? fields : JSON.parse(fields || '[]');

        // Retrieve details of the first user found (assuming unique IDs)
        const userDetails = await odoo.execute_kw('res.users', 'read', [[userId], fieldsArray]);
        //console.log("userDetails", userDetails)
        res.status(200).json({ user: userDetails[0] });

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