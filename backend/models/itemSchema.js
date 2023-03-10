const mongoose =require("mongoose")




 const itemSchema=new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    price:{type:String},
    img:{type:String},
    video:{type:String},
    location:{type:String},
    user:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    type:{type: mongoose.Schema.Types.ObjectId, ref: "Type"},
    comment:[{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
 })



 


 module.exports=mongoose.model("Item",itemSchema)