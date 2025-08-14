
const express=require("express");

const {addProduct}=require("../controllers/productController");
const product =require("../models/Product")
const path = require("path");
const productController = require("../controllers/productController");
const router=express.Router();
router.post("/add-product/:firmId/",addProduct);

const mongoose = require('mongoose');


router.get('/add-product/:firmId/products', async (req, res) => {
  try {
    const firmId = req.params.firmId;

    // Convert to ObjectId if needed
    const objectFirmId = new mongoose.Types.ObjectId(firmId);

    // Fetch products linked to firmId
    const products = await product.find({ firm: objectFirmId });

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/uploads/:imageName",(req,res)=>{
    const imageName=req.params.imageName;
     const imagePath = path.join(__dirname, "..", "uploads", imageName);
  res.sendFile(imagePath);
});





// DELETE product by ID
router.delete("/product/delete/:productId", productController.deleteProductById);







module.exports=router;