import fetch from "node-fetch";

const url = new URL("https://api.printrove.com/api/external/orders");


async function createOrder(AUTH_KEY, customerDetails, productVariantId, rPrice, courierId) {
  console.log(courierId);
  const headers = {
    Authorization: `Bearer ${AUTH_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  // Generate a random integer between min (inclusive) and max (inclusive)
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

  const body = {
    reference_number: String(getRandomInt(100000, 1000000)),
    retail_price: rPrice,
    customer: {
      name: customerDetails.name,
      email: customerDetails.email,
      number: customerDetails.mobileNumber,
      address1: customerDetails.address1,
      address2: customerDetails.address2,
      address3: customerDetails.address3,
      pincode: customerDetails.pincode,
      state: customerDetails.state,
      city: customerDetails.city,
      country: customerDetails.country,
    },
    order_products: [
      {
        quantity: 1,
        variant_id: productVariantId,
        is_plain: false,
      },
    ],
    courier_id: Number(courierId),
    cod: false,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Printrove API error: ${response.status} - ${errorText}`);
    }

    const json = await response.json();
    console.log('Order created successfully:', json);
    return json;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

// Call the asynchronous function
export default createOrder;