const express =require("express");
const router=express.Router();
const User=require("../Models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res)=>{
try{
     let {username,email,password}=req.body;
 const newUser=new User({email,username});
 const registeredUser=await User.register(newUser,password);
 console.log(registeredUser);
 req.login(registeredUser,(err)=>{
    if(err)
    {
      return next(err);  
    }
     req.flash("success","Welcome to taskMate!");
 res.redirect("/List");
 })

} catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
}
}));

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

router.post("/login",saveRedirectUrl,passport.authenticate("local",
    {failureRedirect:"/login",
        failureFlash:true}),
        async(req,res)=>{
 req.flash("success","welcome, you are logged in!!");
 let redirectUrl=res.locals.RedirectUrl || "/List";
 res.redirect(redirectUrl);
});

router.get("/logout",(req,res)=>{
req.logout((err)=>{
    if(err){
       return next(err);
    }
    req.flash("success","you are logged out now!");
    res.redirect("/List");
 })
});



module.exports=router;