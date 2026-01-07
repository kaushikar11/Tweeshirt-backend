import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const apiHost = process.env.API_HOST || 'https://api.stability.ai';
const url = `${apiHost}/v1/engines/list`;

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

    const payload = await response.json();
    // Do something with the payload...
    console.log(payload);
  })
  .catch((error) => {
    console.error(error);
  });
