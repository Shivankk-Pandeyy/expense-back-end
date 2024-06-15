const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const cors=require('cors');
//PORT
PORT=process.env.PORT;
//MONGODB CONNECTION
const ConnectDb=require('./Connection/Connection');
ConnectDb();
//ROUTES
const product_routes=require("./Routes/Product");
//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(
    {
        origin:"https://expense-front-end.vercel.app/",
        methods:["GET","POST","PUT","DELETE"],
        credentials:true,
    }
));
//MIDDLEWARE FOR ROUTER
app.use("/api/expense",product_routes)
//SERVER
app.listen(PORT,()=>{
    console.log(`Server Started At ${PORT}`);
})
