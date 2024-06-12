const express=require('express');
const app=express();
//DOTENV
const dotenv=require('dotenv').config();
//COOKIE-PARSER
const cookieParser=require('cookie-parser');
app.use(cookieParser());
//BCRYPT
const bcrypt=require('bcrypt');
//JWT
const jwt=require('jsonwebtoken');
//USER SCHEMA
const User=require("../Schema/User");
//FUNCTION CALL FOR ROUTER
const HomepageGetRequest=async(req,res)=>{
    try{
        res.cookie("name","ShivankPandey");
        return res.status(200).json({message:"ROUTER SUCCESSFUL"});
    }
    catch(err){
        console.log(err);
    }
} 
//PRODUCT TESTING(RANDOM API TESTING)
const Products=async(req,res)=>{
    try{
        //console.log(req.cookies);
        return res.status(200).json({message:"PRODUCTS"})
    }
    catch(err){
        console.log(err);
    }
}
//USER REGISTRATION
const UserRegister=async(req,res)=>{
    const {name,email,password}=req.body;
    const dummy=await User.findOne({email});
    if(dummy){
        return res.status(400).json({message:"EMAIL"});
    }
    else{
        try{
            bcrypt.genSalt(10,async(err,salt)=>{
                bcrypt.hash(password,salt,async(err,hash)=>{
                    const user=await new User({
                        name,
                        email,
                        password:hash,
                    });
                    await user.save();
                    let token=await jwt.sign({email:email},"SHIVANK");
                    res.cookie("TOKEN",token);
                    const Valid=await User.findOne({name,email});
                    return res.status(200).json({message:"CREATED",id:Valid._id});
                })
            })
        }
        catch(err){
            console.log(err);
        }
    }
}
//USER LOGIN
const UserLogin=async(req,res)=>{
    const{email,password}=req.body;
    const Valid=await User.findOne({email});
    try{
        if(Valid){
            const bool=await bcrypt.compare(password,Valid.password);
            //console.log(bool);
            if(bool){
                let token=await jwt.sign({email:email},"SHIVANK");
                res.cookie("TOKEN",token);
                return res.status(200).json({message:"LOGIN",id:Valid._id});
            }
            else{
                return res.status(400).json({message:"PASSWORD"});
            }
        }
        else{
            return res.status(400).json({message:"USERX"});
        }
    }
    catch(err){
        console.log(err);
    }
}
//LOGOUT
const Logout=async(req,res)=>{
    try{
        res.cookie("TOKEN","");
        return res.status(200).json({message:"LOGOUT"});
    }
    catch(err){
        console.log(err);
    }
}
//GET USERS
const getUsers=async(req,res)=>{
    try{
        const users=await User.find();
        return res.status(200).json(users);
    }
    catch(err){
        console.log(err);
    }
}
//SINGLE USER
const singleUser=async(req,res)=>{
    const {id}=req.params;
    const userdetails=await User.findById({_id:id});
    try{
        return res.status(200).json(userdetails);
    }
    catch(err){
        console.log(err);
    }
}
//ADD EXPENSE
const addExpense=async(req,res)=>{
    const {id}=req.params;
    const {month,title,amount}=req.body;
    const ADD=await User.findById({_id:id});
    try{
        await ADD.expenses.push({month,title,amount});
        await ADD.save();
        return res.status(200).json({message:"ADDED EXPENSE"});
    }
    catch(err){
        console.log(err);
    }
}
//DELETE EXPENSE
const deleteExpense=async(req,res)=>{
    const {id}=req.params;
    const {month,amount,title}=req.body;
    const Valid=await User.findById({_id:id});
    try{
        await Valid.expenses.pop({month,title,amount});
        await Valid.save();
        return res.status(200).json({message:"DELETED EXPENSE"});
    }
    catch(err){
        console.log(err);
    }
}
//ADD SAVING
const addSaving=async(req,res)=>{
    const {id}=req.params;
    const {month,title,amount}=req.body;
    const ADD=await User.findById({_id:id});
    try{
        await ADD.saving.push({month,title,amount});
        await ADD.save();
        return res.status(200).json({message:"ADDED SAVING"});
    }
    catch(err){
        console.log(err);
    }
}
//DELETE SAVING
const deleteSaving=async(req,res)=>{
    const {id}=req.params;
    const {month,amount,title}=req.body;
    const Valid=await User.findById({_id:id});
    try{
        await Valid.saving.pop({month,title,amount});
        await Valid.save();
        return res.status(200).json({message:"DELETED SAVING"});
    }
    catch(err){
        console.log(err);
    }
}
module.exports={HomepageGetRequest,Products,UserRegister,UserLogin,Logout,getUsers,addExpense,deleteExpense,addSaving,deleteSaving,singleUser};