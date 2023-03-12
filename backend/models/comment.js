const mongoose =require("mongoose")
const itemModel =require("../models/itemSchema")




const commentSchema =new mongoose.Schema({
    offer:{type: mongoose.Schema.Types.ObjectId, ref: "Item"},
    comment:{type:String,minlength:1,required: true},
    time:{type:String},
    user:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    item:{type: mongoose.Schema.Types.ObjectId, ref: "Item"},
})




module.exports=mongoose.model("Comment",commentSchema)