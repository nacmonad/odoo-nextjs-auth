import { NextApiRequest, NextApiResponse } from 'next';
import getOdooSession from '@/utils/getOdooSession';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const odoo = await getOdooSession(req, res);
    console.log("[products]", odoo)
    if (!odoo) throw Error("InvalidOdooPermissions");
    console.log("[products] GET:", odoo);

    if (req.method === "GET") {
      const pageSize = 10; // Set your desired page size
      const page = parseInt(req.query.page as string, 10) || 1; // Get page number from the query parameter

      const offset = (page - 1) * pageSize;

      const search_domain: [string, string, string] = ['is_published', '=', 'true'];
      const productTemplateIds = await odoo.execute_kw('product.product', 'search', [[search_domain]]);

      if (productTemplateIds) {
        const productTemplates = await odoo.execute_kw('product.template', 'read', [productTemplateIds]);

        res.status(200).json({ productTemplates });
      } else {
        console.log("No products found.");
        res.status(200).json({ productTemplates: [] });
      }
    } else {
      // Handle other HTTP methods if needed
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (e: Error | any | null) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}
