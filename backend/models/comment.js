const mongoose =require("mongoose")



const commentSchema =new mongoose.Schema({
    comment:{type:String},
    time:{type:Number},
    user:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
})


module.exports=mongoose.model("Comment",commentSchema)