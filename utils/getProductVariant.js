import fetch from "node-fetch";

const url = new URL("https://api.printrove.com/api/external/categories/25/products/460");

async function getProductVariant(AUTH_KEY, designColor, designSize) {
    console.log(designColor);
    console.log(designSize);
  const headers = {
    Authorization: `Bearer ${AUTH_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    const json = await response.json();

    // Use Promise to return the designDetails or "Can't find"
    return new Promise((resolve, reject) => {
      if (json.product.variants.some(variant => variant.color === designColor && variant.size === designSize)) {
        const matchingVariant = json.product.variants.find(variant => variant.color === designColor && variant.size === designSize);
        const designDetails = {
          id: matchingVariant.id,
          name: matchingVariant.name,
          stock_status: matchingVariant.stock_status,
        };
        resolve(designDetails);
      } else {
        reject("Can't find");
      }
    });
  } catch (error) {
    console.error('Error fetching product variant:', error);
    throw new Error('Internal Server Error');
  }
}

export default getProductVariant;
