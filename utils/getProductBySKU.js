import fetch from "node-fetch";


const AUTH_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYzg4ODcxNDlkOTg3NzhhMTg5MDJkM2EzMDRmMGRiYzhiODk4ZWViNDQ1ZmU1ZWQ2MTY4OWZhMDJmNjM0MzYyMDI5NTkyYWJkZjVhMmUwNDEiLCJpYXQiOjE3MDM2NzQyNTMuNjY2ODM1LCJuYmYiOjE3MDM2NzQyNTMuNjY2ODM4LCJleHAiOjE3MzUyOTY2NTMuNjYzMDE2LCJzdWIiOiI5NTk4MiIsInNjb3BlcyI6W119.GmQ-Luj6hlC6yFQbOlQfTHGaDYcs19ZNJZW1EObkZFRVBDvo6klkJY9RPk9mWJWq1cvVMzym7AVc1DU8Kf0Qzs4HTwr9X2dVUERy5Sb71bbopYG8rdqePtn-Ou23BB2zmp6RMBe3VQoxk6Ml6ASr_Pr2shLy2DRG1FaShmyBBob6Ns48N6hfzFVQljwvBfiDAfGJCUkXljOd5_Qy5jZG6o8-QpYpZ7ooWHXJBxDMbdCr7sxffOEIQp2jkqCPkhB2eg6j3Avu2gGajoEqWcSS49_KzW7XV_NYiS_upi-VWczPT2OqSQ1Sga-WTUx4QBtZsLCydqOBSyjH77qugOPio-PRXeBMXBR13YOOOcSyvpLHEZWvjz46tMmGVNuh_HWz_YoxAD8PZsVskXlyC-xZlL3pif8cmwtOO_jWgSnBOkheAZDP-A4QzVgTZXip5hJllwlsVNz9VVi-sJTGvBatKYrm75OhKmQCXm6yapalI8jkJELXRt-TUupfCUiiSOAIpsUHa_JZkukgiaUS-PttOLqIR-KTCxMpvxVoOSzdPq3GcMfpSFoJmmo_-bzCoCg6f7_TrGJzWTDTSizKkDLAOI7gJuPKluqbSJtNEvC7Ia-jleDwD4kMEfrowwlDtzAw9PJuUDmDroLfvi_lnjKDA1GmK5YigxFOL0gjsVIzzwg";


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