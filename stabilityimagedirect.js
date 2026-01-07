import fs from "fs";

export const textToImage = async () => {
  // API endpoint URL
  const path =
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

  // Stability API key from environment variables
  const STABILITY_API_KEY = process.env.STABILITY_API_KEY;

  // Headers for the API request
  const headers = {
    Accept: "application/json",
    Authorization: STABILITY_API_KEY,
  };

  // Prompt text for text-to-image generation
  const prompt = "Elon musk : Congratulations tesla team for a great year!!";

  // Request body for the API POST request
  const body = {
    steps: 40,
    width: 1024,
    height: 1024,
    seed: 0,
    cfg_scale: 5,
    samples: 1,
    text_prompts: [
      {
        "text": prompt,
        "weight": 1,
      },
      {
        "text": "blurry, bad",
        "weight": -1,
      },
    ],
  };

  try {
    // Fetch API request and await the result
    const response = await fetch(
      path,
      {
        headers,
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    // Check if the API response is successful
    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    // Parse the JSON response
    const responseJSON = await response.json();

    // Save generated images to the file system
    responseJSON.artifacts.forEach((image, index) => {
      fs.writeFileSync(
        `${prompt}_${index}.png`,
        Buffer.from(image.base64, 'base64')
      );
    });
  } catch (error) {
    console.error("Error during text-to-image generation:", error);
  }
};
