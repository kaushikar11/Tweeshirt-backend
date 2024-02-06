import fetch from "node-fetch";

const getService = async (AUTH_KEY, pin) => {
  const url = new URL("https://api.printrove.com/api/external/serviceability");

  const params = {
    country: "India",
    pincode: pin,
    weight: "500",
    cod: "false",
  };

  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

  const headers = {
    Authorization: `Bearer ${AUTH_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

    const findMinCostCourier = (courierData) => {
    let minCost = Infinity;
    let minCostCourier = null;

    for (const courier of courierData.couriers) {
    if (courier.cost < minCost) {
        minCost = courier.cost;
        minCostCourier = {
        id: courier.id,
        name: courier.name,
        cost: courier.cost,
        };
    }
    }

    return minCostCourier;

};

    try {
    const response = await fetch(url, {
        method: "GET",
        headers: headers,
    });

    const json = await response.json();

    if (json.message != null) {
        return json.message;
    } else {
        return findMinCostCourier(json);
    }
    }
    catch (error) {
    console.error("Error:", error);
    return null;
    }
};

export default getService;
