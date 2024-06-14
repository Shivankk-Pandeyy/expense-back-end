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
    res.header("Access-Control-Allow-Origin", "*"); // Specify your client domain
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.sendStatus(200);
});
app.use(cors({
    origin: '*',
    methods: ['GET','POST','PUT','DELETE'], // Allow only these methods
    allowedHeaders: ["Origin, X-Requested-With, Content-Type, Accept"] ,
    credentials:true,
}));
//MIDDLEWARE FOR ROUTER
app.use("/api/expense",product_routes)
//SERVER
app.listen(PORT,()=>{
    console.log(`Server Started At ${PORT}`);
})
