// utils/odoo.js
import Odoo from "odoo-xmlrpc";

class OdooClient {
  private client: null | Odoo;
  
  constructor(username:string, password:string, database:string, url:string) {
    console.log("[odoo]create client", {
      url,
      port:443,
      db: database,
      username,
      password
    })
    this.client = new Odoo({
      url,
      port:443,
      db: database,
      username,
      password
    });
  }

  // Implement methods for interacting with Odoo using xmlrpc-client
  // For example, methods for login, signout, and other functionality.
}

module.exports = OdooClient;
