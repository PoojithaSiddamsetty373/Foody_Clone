const mongoose = require("mongoose")
const Product=require("../models/Product");
const multer=require("multer");
const Firm=require("../models/Firm");
const path=require ("path");

 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: function (req, file, cb) {
    // Rename the file to include the current timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload variable
const upload = multer({ storage: storage });

const addProduct = async (req,res) => {
  const firmId = req.params.firmId;
  console.log("firmId from params",firmId);
   if (!firmId || !mongoose.Types.ObjectId.isValid(firmId)) {
    return res.status(400).json({ error: "Invalid or missing firm ID" });
  }
    try{
       const firm = await Firm.findById(firmId)
        if (!firm) {
            return res.status(404).json({error:"Firm not found"});
         }
         const {productName,price,category,bestseller,description}= req.body;
         const image = req.file? req.file.filename: null;
          
        const product = new Product({
        productName,
        price,
        category,
        bestseller,
        description,
        image,
        firm: firm?._id,
       });

       
      const savedProduct = await product.save();
     firm.product.push(savedProduct._id)
      await firm.save()
      return res.status(200).json({message:"Prodcut added Successfully"});
     

    }
    catch(error){
         console.error(error);
        res.status(500).json({error:"Internal Server"})
    }
}



const getProductByFirm = async(req,res)=>{
  try{
    const firmId=req.params.firmId;
    const firm = await Firm.findById(firmId);
    if (!firm){
      return res.status(404).json({error:"No firm found"});
    }
    const restaurantNmae=firm.firmName;
    const products=await Product.find({firm: firmId});
    res.status(200).json({restaurantNmae,products});
  }
   catch(error){
         console.error(error);
        res.status(500).json({error:"Internal Server"})
    }
}


const deleteProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById,};