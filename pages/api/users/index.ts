import { NextApiRequest, NextApiResponse } from 'next';
import Odoo from 'async-odoo-xmlrpc';
import { getOdoo } from "../../../clients/odoo";

let odoo : Odoo | null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { user } = req.body;
        console.log("Checking user: ", { user })
      if (!odoo) odoo  = await getOdoo();
      if (!odoo) return res.status(500).send("OdooNotInitialized")
      
      /* Create User */
      if (req.method === "POST") {
        // Assuming your request body contains user data, adapt this to your actual data structure
        const { name, login, password } = req.body;
  
        // Create user data
        const userData = {
          name,
          login,
          password,
          // Add other necessary user details
        };
  
        // Call Odoo API to create a user
        const userId = await odoo.execute_kw("res.users", "create", [userData]);
  
        res.status(200).json({ userId, message: "User created successfully" });
      } 
      /* Find Users */
      else if (req.method === "GET") {
        const search_domain: string[] = [] 
        const user_ids = await odoo.execute_kw('res.users', 'search', [search_domain])

        if (user_ids){
            const users = await odoo.execute_kw('res.users', 'read', [user_ids])
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
      
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Something went wrong...' });
    }
  }