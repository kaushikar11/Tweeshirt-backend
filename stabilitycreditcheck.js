import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const apiHost = process.env.API_HOST || 'https://api.stability.ai';
const url = `${apiHost}/v1/user/balance`;

const apiKey = process.env.STABILITY_API_KEY_JEIS_2;
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

    const balance = await response.json();
    // Do something with the balance...
    console.log(balance);
  })
  .catch((error) => {
    console.error(error);
  });

