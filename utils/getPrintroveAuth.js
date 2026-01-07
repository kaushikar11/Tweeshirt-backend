// utils/printroveApi.js

import fetch from "node-fetch";

async function getPrintroveAuth() {
  try {
    const response = await fetch('https://api.printrove.com/api/external/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: process.env.PRINTROVE_EMAIL,
        password: process.env.PRINTROVE_PASSWORD,
      }),
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error fetching Printrove access token:', error);
    throw new Error('Failed to fetch Printrove access token');
  }
}

export default getPrintroveAuth;
