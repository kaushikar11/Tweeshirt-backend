import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import Stripe from 'stripe';
import FormData from 'form-data';
import getPrintroveAuth from './utils/getPrintroveAuth.js';
import getProductVariant from './utils/getProductVariant.js';
import createProduct from './utils/createProduct.js';
import createOrder from './utils/createOrder.js';
import getService from './utils/getService.js';
import getProductPrice from './utils/getProductPrice.js';
import getProductBySKU from './utils/getProductBySKU.js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
var access_token = "";
const app = express();
const port = process.env.PORT || 3001;
app.use(cors({ origin: ["https://tweeshirt.vercel.app", "http://localhost:3000", "http://localhost:3001"]}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for creating payment intent
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', metadata = {} } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message || 'Failed to create payment intent' });
  }
});

// Route for handling file upload and form data
app.post('/submit_form', async (req, res) => {
  try {
    access_token = await getPrintroveAuth();
    console.log('Access token obtained');
    
    const customerDetails = req.body;
    console.log('Customer Details received');

    // Upload file to Printrove if not already uploaded
    let fileResponse;
    if (customerDetails.file) {
      const buffer = Buffer.from(customerDetails.file, 'base64');
      const formData = new FormData();
      formData.append('file', buffer, {
        filename: `design_${Date.now()}.png`,
        contentType: 'image/png',
      });

      const uploadUrl = 'https://api.printrove.com/api/external/designs';
      fileResponse = await axios.post(uploadUrl, formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${access_token}`,
          Accept: 'application/json',
        },
      });
      console.log('File uploaded to Printrove:', fileResponse.data);
    } else if (customerDetails.fileResponse) {
      fileResponse = { data: customerDetails.fileResponse };
    } else {
      return res.status(400).json({
        success: false,
        message: 'Design file is required'
      });
    }

    // Validate required fields
    if (!fileResponse.data || !fileResponse.data.design) {
      return res.status(400).json({
        success: false,
        message: 'Design file upload failed'
      });
    }

    if (!customerDetails.tshirtColor || !customerDetails.tshirtSize) {
      return res.status(400).json({ 
        success: false, 
        message: 'T-shirt color and size are required' 
      });
    }

    // Get product variant
    const variantDetails = await getProductVariant(
      access_token, 
      customerDetails.tshirtColor,
      customerDetails.tshirtSize
    );
    console.log('Variant details:', variantDetails);
    
    if (!variantDetails || variantDetails.stock_status !== "in_stock") {
      return res.status(400).json({
        success: false,
        message: "The product variant is out of stock"
      });
    }

    // Extract position data
    const positionData = {
      imagePosition: customerDetails.imagePosition || 'center',
      positionCoords: customerDetails.positionCoords || { x: 50, y: 50 },
      imageSize: customerDetails.imageSize || 50
    };

    // Create product with position data
    const productDetails = await createProduct(
      access_token, 
      variantDetails,
      customerDetails.fileResponse.design,
      positionData
    );
    console.log('Product created:', productDetails);
    
    if (!productDetails || !productDetails.product || !productDetails.product.id) {
      throw new Error('Failed to create product - invalid response from Printrove');
    }

    // Get product variant ID
    const productVariantId = await getProductBySKU(
      access_token, 
      productDetails.product.id
    );
    console.log("Product variant ID:", productVariantId);
    
    if (!productVariantId) {
      throw new Error('Failed to get product variant ID');
    }

    // Get courier service
    const courierDetails = await getService(
      access_token, 
      customerDetails.pincode
    );
    console.log('Courier details:', courierDetails);
    
    if (courierDetails.message) {
      return res.status(400).json({
        success: false,
        message: "Currently not servicing at that particular location"
      });
    }

    if (!courierDetails.id || courierDetails.cost === undefined) {
      throw new Error('Invalid courier service response');
    }

    // Calculate retail price
    const retailPrice = await getProductPrice(
      customerDetails.tshirtSize,
      courierDetails.cost
    );
    console.log('Retail price:', retailPrice);

    // Create order
    const orderDetails = await createOrder(
      access_token, 
      customerDetails, 
      productVariantId,
      retailPrice,
      courierDetails.id
    );
    console.log('Order created:', orderDetails);

    // Return success response
    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: orderDetails,
      product: productDetails,
      price: retailPrice
    });
    
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
