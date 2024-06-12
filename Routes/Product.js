const express=require("express");
const router=express.Router();
//REQUIRE FUNCTIONS FROM CONTROLLERS
const{HomepageGetRequest, Products, UserRegister, UserLogin, Logout, getUsers, addExpense, deleteExpense, addSaving, deleteSaving, singleUser}=require('../Controllers/Product');
//RESTFUL APIs
router.route("/").get(HomepageGetRequest);
router.route("/Products").get(Products);
router.route("/Register").post(UserRegister);
router.route("/Login").post(UserLogin);
router.route("/Logout").get(Logout);
router.route("/GetUsers").get(getUsers);
router.route("/SingleUser/:id").get(singleUser);
router.route("/AddExpense/:id").post(addExpense);
router.route("/DeleteExpense/:id").put(deleteExpense);
router.route("/AddSaving/:id").post(addSaving);
router.route("/DeleteSaving/:id").put(deleteSaving);
module.exports=router;