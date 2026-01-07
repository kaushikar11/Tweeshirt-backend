import fetch from "node-fetch";
import FormData from "form-data";
async function addDesignToPrintrove(authKey, fileData) {
  const url = new URL("https://api.printrove.com/api/external/designs");

  const headers = {
    "Authorization": `Bearer ${authKey}`,
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  // const body = {
  //   "file": fileData,
  //    };
    //  console.log(fileData);
// const formData = new FormData();
//     formData.append('file', fileData.buffer, { filename: fileData.originalname });

    //  console.log(formData);
//   try {
     
    //  fetch(url, {
//       method: "POST",
//       headers: headers,
//       body: body
//     });
      fetch(url, {
    method: "POST",
    headers: headers,
    body: fileData,
  })
    .then(response => response.json()) // Parse the response as JSON
    .then(json => console.log('Server Response:', json))
    .catch(error => console.error('Error:', error));
}

    // const json = response;
    // console.log(json);

    // return json; // You can return the JSON response if needed
//   } catch (error) {
//     console.error('Error uploading design to Printrove:', error);
//     throw new Error('Failed to upload design to Printrove');
//   }
// }
export default addDesignToPrintrove;