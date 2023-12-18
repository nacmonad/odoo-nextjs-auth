import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

const ODOO_BASE_URL = 'https://odoo.sonitycloud.com'; // Replace with your Odoo instance URL
const API_KEY = 'ffb6e49b42974f059a81c1c72d999319ed66f98c'; // Replace with your Odoo API key


type ResponseData = {
  message: string
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const odooApiEndpoint = `${ODOO_BASE_URL}/web/dataset/call_kw/product.template/search_read`;
    // Define the request payload
    const requestData = {
        jsonrpc: '2.0',
        method: 'call',
        params: {
        model: 'product.template',
        method: 'search_read',
        args: [],
        kwargs: {
            fields: ['name', 'list_price', 'description'], // Add more fields as needed
            domain: [],
        },
        },
        id: 1,
    };
    
    const response = await axios.post(odooApiEndpoint, requestData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      const { data } = response;
      console.log('Product Data:', data);
        

    res.status(200).json({ products:data });
  } catch (error) {
    console.error('Error fetching data from Odoo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

