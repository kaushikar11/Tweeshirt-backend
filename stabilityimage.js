import fetch from 'node-fetch'
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()

const engineId1 = 'stable-diffusion-v1-6';
const engineId2 = 'esrgan-v1-x2plus'
const engineId3 = 'stable-diffusion-xl-1024-v0-9'
const engineId4 = 'stable-diffusion-xl-1024-v1-0'
const engineId5 = 'stable-diffusion-512-v2-1'
const engineId6 = 'stable-diffusion-xl-beta-v2-2-2'

const apiHost = process.env.API_HOST || 'https://api.stability.ai';
const apiKey = process.env.STABILITY_API_KEY_JEIS;

const prompt = "matt murdock in a court"
if (!apiKey) throw new Error('Missing Stability API key.');

fetch(`${apiHost}/v1/generation/${engineId4}/text-to-image`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    text_prompts: [
      {
        text: prompt,
        weight: 1,
      },
      {
        text: "blurry, bad, disfigured face, more teeth, more than 5 fingers",
        weight: -1,
      }
    ],
    height: 1024,
    width: 1024,
    steps: 50,
    seed : 6787878,
	cfg_scale: 10,
    samples: 1,
  }),
})
  .then(async (response) => {
    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    const responseJSON = await response.json();
    console.log(responseJSON);
    responseJSON.artifacts.forEach((image, index) => {
      fs.writeFileSync(
        `${prompt}${index}.png`,
        Buffer.from(image.base64, 'base64')
      );
    });

  })
  .catch((error) => {
    console.error(error);
  });
