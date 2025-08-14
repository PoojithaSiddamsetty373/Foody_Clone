  
const express = require ("express");//assigning pacakages express//
const dotenv = require ("dotenv");
const mongoose=require("mongoose");
const venderRoutes=require("./routes/vendorRoutes");
const bodyParser=require("body-parser");
const firmRoutes=require("./routes/firmRoutes");
const productRoutes=require("./routes/productRoutes");
const cors=require("cors");


const app= express()//inserting express into app//



dotenv.config();//access values in .env//
 app.use(cors({
  origin: 'http://localhost:5173', // allow your frontend
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
.then(()=>
    console.log("Mongodb connected successfully!"))
.catch((error)=>
    console.log(error))
app.use(bodyParser.json())
app.use("/vendor",venderRoutes);
app.use("/firm",firmRoutes);
app.use("/",productRoutes);
app.use("/uploads",express.static("uploads"));

//start the PORT//
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started and running at ${PORT}`);
});

//route//
app.use('/',(req,res)=>{
    res.send("<h1> WELCOME TO FOODY")
})