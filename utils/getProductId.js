import fetch from "node-fetch";

const AUTH_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYzg4ODcxNDlkOTg3NzhhMTg5MDJkM2EzMDRmMGRiYzhiODk4ZWViNDQ1ZmU1ZWQ2MTY4OWZhMDJmNjM0MzYyMDI5NTkyYWJkZjVhMmUwNDEiLCJpYXQiOjE3MDM2NzQyNTMuNjY2ODM1LCJuYmYiOjE3MDM2NzQyNTMuNjY2ODM4LCJleHAiOjE3MzUyOTY2NTMuNjYzMDE2LCJzdWIiOiI5NTk4MiIsInNjb3BlcyI6W119.GmQ-Luj6hlC6yFQbOlQfTHGaDYcs19ZNJZW1EObkZFRVBDvo6klkJY9RPk9mWJWq1cvVMzym7AVc1DU8Kf0Qzs4HTwr9X2dVUERy5Sb71bbopYG8rdqePtn-Ou23BB2zmp6RMBe3VQoxk6Ml6ASr_Pr2shLy2DRG1FaShmyBBob6Ns48N6hfzFVQljwvBfiDAfGJCUkXljOd5_Qy5jZG6o8-QpYpZ7ooWHXJBxDMbdCr7sxffOEIQp2jkqCPkhB2eg6j3Avu2gGajoEqWcSS49_KzW7XV_NYiS_upi-VWczPT2OqSQ1Sga-WTUx4QBtZsLCydqOBSyjH77qugOPio-PRXeBMXBR13YOOOcSyvpLHEZWvjz46tMmGVNuh_HWz_YoxAD8PZsVskXlyC-xZlL3pif8cmwtOO_jWgSnBOkheAZDP-A4QzVgTZXip5hJllwlsVNz9VVi-sJTGvBatKYrm75OhKmQCXm6yapalI8jkJELXRt-TUupfCUiiSOAIpsUHa_JZkukgiaUS-PttOLqIR-KTCxMpvxVoOSzdPq3GcMfpSFoJmmo_-bzCoCg6f7_TrGJzWTDTSizKkDLAOI7gJuPKluqbSJtNEvC7Ia-jleDwD4kMEfrowwlDtzAw9PJuUDmDroLfvi_lnjKDA1GmK5YigxFOL0gjsVIzzwg";

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
