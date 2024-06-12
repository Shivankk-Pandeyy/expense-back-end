const mongoose=require('mongoose');
const MongoPass=process.env.MONGO_PASS;
const ConnectDb=async()=>{
    try{
        await mongoose.connect(`mongodb+srv://pandeyshivank21:${MongoPass}@cluster0.gnqrx03.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("MongoDB Connected");
    }
    catch(err){
        console.log(err);
    }
}
module.exports=ConnectDb;