import Odoo from "async-odoo-xmlrpc";

export let odoo : null | Odoo = null;

export async function initOdoo() {
    try {
        odoo = new Odoo({
          url: `https://odoo.sonitycloud.com`,
          port: 443,
          db: 'odoo',
          username: 'scotth@sonity.net',
          password: 'ujapi1044213'
        });
        console.log("[initOdoo]", odoo)

        await odoo.connect();
        console.log("Connect to Odoo XML-RPC succeeded.");

        // let access = await odoo.execute_kw('res.partner', 'check_access_rights', [
        //     ['read', false]
        // ]);
        // console.log("Result: ", access);
        
    } catch(e) {
        console.error("Error when try connect Odoo XML-RPC.", e);
        odoo = null;
    }
  };

export async function getOdoo() {
    try{ 
        if(!odoo) await initOdoo();
        return odoo
    } catch(e) {
        console.error("Error when try get Odoo XML-RPC.", e);
        return null
    }
}