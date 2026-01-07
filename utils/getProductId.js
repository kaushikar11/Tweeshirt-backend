import fetch from "node-fetch";

const AUTH_KEY = process.env.PRINTROVE_AUTH_KEY;

async function getProductId(AUTH_KEY, pname) {
      const url = new URL(
      "https://api.printrove.com/api/external/products"
    );

    let params = {
      "page": "1",
      "per_page": "10"
    };
    Object.keys(params)
      .forEach(key => url.searchParams.append(key, params[key]));

    let headers = {
      "Authorization": `Bearer ${AUTH_KEY}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    const json = await response.json();
    
    // Store the entire JSON response
    console.log(json);
    
    // Display the entire JSON response
    // console.log("Entire JSON Response:", jsonResponse);
    console.log(json.products[0].product);
    
    // Check if json.links is an array before iterating
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the async function
export default getProductId;
