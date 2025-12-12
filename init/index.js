const mongoose=require("mongoose");
const initData=require("./data.js");
const list=require("../Models/List.js");
const MongoUrl="mongodb://127.0.0.1:27017/SemProj";


main().then(()=>{
    console.log("connected to DB");
}).catch(err=>{
   console.log(err);
});

async function main(){
    await mongoose.connect(MongoUrl);
}

const initDB=async()=>{
    await list.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"690e5b8c268925a5c4669471"}));
    await list.insertMany(initData.data);
    console.log("data was initialized");

};
initDB();