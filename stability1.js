import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const apiHost = process.env.API_HOST || 'https://api.stability.ai';
const url = `${apiHost}/v1/user/account`;

const apiKey = process.env.STABILITY_API_KEY;
if (!apiKey) throw new Error('Missing Stability API key.');

fetch(url, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
})
  .then(async (response) => {
    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    const user = await response.json();
    // Do something with the user...
    console.log(user);
  })
  .catch((error) => {
    console.error(error);
  });
