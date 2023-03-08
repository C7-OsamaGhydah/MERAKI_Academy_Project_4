const mongoose =require("mongoose")
const itemModel =require("../models/itemSchema")




const commentSchema =new mongoose.Schema({
    comment:{type:String},
    time:{type:String},
    user:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    item:{type: mongoose.Schema.Types.ObjectId, ref: "Item"},
})


commentSchema.post("save", async function () {
    const update = await itemModel.findByIdAndUpdate({_id:this.item},{ $push: {comment:this._id}})
    console.log(update)
  });


module.exports=mongoose.model("Comment",commentSchema)