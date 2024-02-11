import express from 'express';
import cors from 'cors';
import getPrintroveAuth from './utils/getPrintroveAuth.js';
import getProductVariant from './utils/getProductVariant.js';
import createProduct from './utils/createProduct.js';
import createOrder from './utils/createOrder.js';
import getService from './utils/getService.js';
import getProductPrice from './utils/getProductPrice.js';
import getProductBySKU from './utils/getProductBySKU.js';
var access_token = "";
const app = express();
// const port = 3001;
app.use(cors({ origin: ["https://tweeshirt.vercel.app/"]}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for handling file upload and form data
 app.post('/submit_form', async (req, res) => {
  try {
    access_token =await getPrintroveAuth();
    console.log(access_token);
    const customerDetails = req.body;
    console.log('Customer Details:', customerDetails);
    const variantDetails=await getProductVariant(access_token, customerDetails.tshirtColor,customerDetails.tshirtSize);
    console.log(variantDetails);
    if (variantDetails.stock_status == "in_stock")
    {
      const productDetails = await createProduct(access_token, variantDetails,customerDetails.fileResponse.design);
      console.log(productDetails);
      const productVariantId = await getProductBySKU(access_token, productDetails.product.id);
      console.log("pid:", productVariantId);
      const courierDetails = await getService(access_token, customerDetails.pincode);
      console.log(courierDetails);
      if (courierDetails.message == null)
      {
        const retailPrice = await getProductPrice(customerDetails.tshirtSize,courierDetails.cost);
        console.log(retailPrice);
        const orderDetails = await createOrder(access_token, customerDetails, productVariantId,retailPrice,courierDetails.id);
        console.log(orderDetails);
      }
      else {
        res.json({ message: "Currently servicing at that particular location" });
      }
      
    }
    else {
      res.json({message:"the product variant is out of stock"})
    }
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
