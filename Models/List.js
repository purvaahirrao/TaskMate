const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const listSchema=new Schema({
    title:{ type:String,
        required:true},
        description:{type:String},
    image:{
         url:String,
        filename:String,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    duedate:{type:Date},
    completed:{type:Boolean,
        default:false,
    },
    
});
const List=mongoose.model("List",listSchema);
module.exports=List;
