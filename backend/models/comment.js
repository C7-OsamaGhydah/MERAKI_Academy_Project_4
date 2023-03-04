const mongoose =require("mongoose")



const commentSchema =new mongoose.Schema({
    comment:{type:String},
    time:{type:String},
    user:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    item:{type: mongoose.Schema.Types.ObjectId, ref: "Item"},
})


module.exports=mongoose.model("Comment",commentSchema)