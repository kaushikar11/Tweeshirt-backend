// utils/printroveApi.js
import fetch from 'node-fetch';
import getProductVariant from './getProductVariant.js';
// const AUTH_KEY = 'YOUR_AUTH_KEY'; // Replace with your actual auth key
const url = new URL('https://api.printrove.com/api/external/products');

async function createProduct(AUTH_KEY,variantDetails,designDetails) {
  const headers = {
    Authorization: `Bearer ${AUTH_KEY}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const body = {
    name: designDetails.name,//file name
    product_id: 460,
    design: {
      front: {
        id: designDetails.id,//file design id
        dimensions: {
          width: 4320,
          height: 2880,
          top: 400,
          left: 190,
        },
      },
      // Uncomment the following lines if you want to include the "back" design
      // back: {
      //     id: 19,
      //     dimensions: {
      //         width: 3000,
      //         height: 3000,
      //         top: 10,
      //         left: 50
      //     }
      // }
    },
    variants: [
      {
        product_id: variantDetails.id,
        // sku: variantDetails.name,
      },
    ],
    is_plain: false,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    const json = await response.json();
      console.log(json);
      return json;
  } catch (error) {
    console.error('Error:', error);
  }
}

export default createProduct;
