import fetch from "node-fetch";


const AUTH_KEY = process.env.PRINTROVE_AUTH_KEY;


async function getProductBySKU(AUTH_KEY,productID) {
    const headers = {
  Authorization: `Bearer ${AUTH_KEY}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};
    const url = new URL(`https://api.printrove.com/api/external/products/${productID}`);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    const json = await response.json();
    console.log(json);
      console.log(json.product.variants);
      return json.product.variants[0].id;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the asynchronous function
export default getProductBySKU;