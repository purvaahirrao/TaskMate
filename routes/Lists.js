const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listSchema}=require("../Schema.js");
const list=require("../Models/List.js");
const ExpressError=require("../utils/ExpressError.js");
const {isLoggedIn}=require("../middleware.js");

const multer =require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

const validateListing=(req,res,next)=>{
    let {error}=listSchema.validate(req.body);
    if(error)
    {
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,error);
    }
    else{
        next();
    }
};


//Index route
router.get("/",isLoggedIn,wrapAsync(async (req,res)=>{
    let userName=req.user.username;
 const allList=await list.find({owner:req.user._id});

res.render("./list/index.ejs",{allList,userName});
}));


//new Route
router.get("/new",isLoggedIn,(req,res)=>{
res.render("list/new.ejs");
});

//Calender route
router.get("/calender",isLoggedIn,async(req,res)=>{
try{
    const tasks=await list.find({owner:req.user._id});
  const events = tasks.map(task => ({
      title: task.title,
      start: task.duedate, 
      color: task.completed ? "green" : "red",
    }));
res.render("./list/calender.ejs",{events});
}catch(err){
    console.error(err);
  res.status(500).send("error loading calendar");
}

});

//search route
router.get("/search",async(req,res)=>{
    let userName=req.user.username;
const query=req.query.q?.trim();
if(!query){//if search is empty the show all tasks of that user
    const allList=await list.find({owner:req.user._id});
    return res.render("./list/index.ejs",{allList,userName});
}

const allList =await list.find({
    owner:req.user._id,
    $or:[
        {title:{$regex:query,$options:"i"}},
        {description:{$regex:query,$options:"i"}}
    ]
});
res.render("./list/index.ejs",{allList,userName});
});

//Show Route
router.get("/:id",wrapAsync(async(req,res)=>{
let {id}=req.params;
const List=await list.findById(id);
if(!List)
{
     req.flash("error","task you requested for does not exist!");
     return res.redirect("/List");
}

res.render("List/show.ejs",{List});
}));

// Create Route
router.post("/",isLoggedIn,upload.single("list[image]"),validateListing,wrapAsync(async(req,res)=>{
   let url= req.file.path;
   let filename=req.file.filename;
   
const newlist=new list(req.body.list);
newlist.owner=req.user._id;
newlist.duedate = new Date(req.body.list.duedate);
newlist.image={url,filename};
 await newlist.save();
 req.flash("success","New task added!");
res.redirect("/List");

}));



//Edit Route
router.get("/:id/edit",isLoggedIn,wrapAsync(async (req,res)=>{
let {id}=req.params;
const List=await list.findById(id);
if(!List)
{
     req.flash("error","task you requested for does not exist!");
     return res.redirect("/List");
}
let originalImageUrl = "";
  if (List.image && List.image.url) {
    originalImageUrl = List.image.url.replace("/upload", "/upload/h_300,w_250");
  }
res.render("list/edit.ejs",{List,originalImageUrl});
}));
//toggle-route for complete button

router.put("/:id/toggle-complete", isLoggedIn, async (req, res) => {
  try {
    const task = await list.findById(req.params.id).populate('owner');

    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    const wasCompleted = task.completed;
    task.completed = !task.completed;
    await task.save();

    const user = task.owner;

    if (user) {
      if (!wasCompleted && task.completed) {
        user.completedCount += 1;
      } else if (wasCompleted && !task.completed && user.completedCount > 0) {
        user.completedCount -= 1;
      }
      await user.save();
    }

    res.json({
      success: true,
      completed: task.completed,
      completedCount: user ? user.completedCount : 0
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

//Update Route
router.put("/:id",isLoggedIn,upload.single("list[image]"),validateListing,wrapAsync(async(req,res)=>{
    let {id}=req.params;
   let updatedlist=await list.findByIdAndUpdate(id,{...req.body.list});
   if(typeof req.file!=="undefined"){
   let url= req.file.path;
   let filename=req.file.filename;
   updatedlist.image={url,filename};
     await updatedlist.save();
   }
 
   req.flash("success","Task Upadated!");
   res.redirect(`/List/${id}`);
}));
//Delete Route
router.delete("/:id",isLoggedIn,wrapAsync(async (req,res)=>{
let {id}=req.params;
await list.findByIdAndDelete(id);
req.flash("success","Task Deleted!");
res.redirect("/List");
}));



module.exports=router;