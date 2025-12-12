if(process.env.NODE_ENV!="production")
{
require("dotenv").config();
}


const express=require("express");
const app=express();
const mongoose =require("mongoose");
const list=require("./Models/List.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./Models/user.js");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listSchema}=require("./Schema.js");

const ListsRouter=require("./routes/Lists.js");
const userRouter=require("./routes/user.js");

// const MongoUrl="mongodb://127.0.0.1:27017/SemProj";
dbUrl=process.env.ATLAS_DB_URL;
main().then(()=>{
    console.log("connected to DB");
}).catch(err=>{
   console.log(err);
});

async function main(){
    await mongoose.connect(dbUrl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//for calender
app.use('/static', express.static(path.join(__dirname, 'node_modules')));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverride("_method"));


const sessionOptions={
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },

};

// app.get("/",(req,res)=>{
// res.send("Hi ,I am Front");
// });


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
     res.locals.error=req.flash("error");
     res.locals.currUser=req.user;
     res.locals.completedCount=req.user?req.user.completedCount:0;
    
    next();
});

// app.get("/demouser",async(req,res)=>{
//     let fakeUser=new User({
//      email:"student@gmail.com",
//      username:"college-student"
//     });
//    let registerUser=await User.register(fakeUser,"helloworld");
//     res.send(registerUser);
// })


app.use("/List",ListsRouter);
app.use("/",userRouter);

app.all(/.*/,(req,res,next)=>{
   next(new ExpressError(404,"Page Not Found!"));
});

app.use((err,req,res,next)=>{
let {statusCode=500,message="Something went wrong!!"}=err;
res.status(statusCode).render("error.ejs",{message,statusCode});
});


app.listen(8080,()=>{
console.log("server is listening to port 8080");
});





