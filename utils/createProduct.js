// utils/printroveApi.js
import fetch from 'node-fetch';
import getProductVariant from './getProductVariant.js';
// const AUTH_KEY = 'YOUR_AUTH_KEY'; // Replace with your actual auth key
const url = new URL('https://api.printrove.com/api/external/products');

async function createProduct(AUTH_KEY, variantDetails, designDetails, positionData = {}) {
  const headers = {
    Authorization: `Bearer ${AUTH_KEY}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  // Calculate dimensions based on position data
  // Default dimensions (center position)
  let width = 4320;
  let height = 2880;
  let top = 400;
  let left = 190;

  // If custom position data is provided, calculate dimensions
  if (positionData.positionCoords && positionData.imageSize) {
    const { x, y } = positionData.positionCoords; // percentages
    const sizePercent = positionData.imageSize; // percentage
    
    // Base dimensions for t-shirt print area (in pixels at 300 DPI)
    const printAreaWidth = 4320;
    const printAreaHeight = 2880;
    
    // Calculate actual size based on percentage
    width = Math.round((printAreaWidth * sizePercent) / 100);
    height = Math.round((printAreaHeight * sizePercent) / 100);
    
    // Calculate position based on percentages
    // x and y are percentages (0-100), convert to pixels
    left = Math.round((printAreaWidth * x) / 100) - (width / 2);
    top = Math.round((printAreaHeight * y) / 100) - (height / 2);
    
    // Ensure values are within bounds
    left = Math.max(0, Math.min(left, printAreaWidth - width));
    top = Math.max(0, Math.min(top, printAreaHeight - height));
  } else if (positionData.imagePosition) {
    // Use preset positions
    const position = positionData.imagePosition;
    const printAreaWidth = 4320;
    const printAreaHeight = 2880;
    
    switch(position) {
      case 'top':
        top = 200;
        left = (printAreaWidth - width) / 2;
        break;
      case 'bottom':
        top = printAreaHeight - height - 200;
        left = (printAreaWidth - width) / 2;
        break;
      case 'left':
        top = (printAreaHeight - height) / 2;
        left = 100;
        break;
      case 'right':
        top = (printAreaHeight - height) / 2;
        left = printAreaWidth - width - 100;
        break;
      case 'full':
        width = printAreaWidth - 200;
        height = printAreaHeight - 200;
        top = 100;
        left = 100;
        break;
      case 'center':
      default:
        top = (printAreaHeight - height) / 2;
        left = (printAreaWidth - width) / 2;
        break;
    }
  }

  const body = {
    name: designDetails.name || 'Custom Design', // file name
    product_id: 460,
    design: {
      front: {
        id: designDetails.id, // file design id
        dimensions: {
          width: Math.round(width),
          height: Math.round(height),
          top: Math.round(top),
          left: Math.round(left),
        },
      },
    },
    variants: [
      {
        product_id: variantDetails.id,
      },
    ],
    is_plain: false,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Printrove API error: ${response.status} - ${errorText}`);
    }

    const json = await response.json();
    console.log('Product created successfully:', json);
    return json;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export default createProduct;
