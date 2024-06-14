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
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all domains (not recommended for production)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors({
    origin: '*',
    methods: ['GET','POST','PUT','DELETE'], // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'] ,
    credentials:true,
}));
//MIDDLEWARE FOR ROUTER
app.use("/api/expense",product_routes)
//SERVER
app.listen(PORT,()=>{
    console.log(`Server Started At ${PORT}`);
})
