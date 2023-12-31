import Odoo from "../../node_modules/async-odoo-xmlrpc/lib/index";
import { OdooSession } from "@/types";

async function initOdoo() {
    const odoo : OdooSession = new Odoo({
        username:process.env.ODOO_ADMIN_USERNAME, 
        password:process.env.ODOO_ADMIN_PASSWORD, 
        db:process.env.ODOO_DB, 
        port: 443,
        url: process.env.ODOO_URL});
    const uid = await odoo.connect();
    odoo.uid = uid;
    return odoo

}

export default initOdoo;