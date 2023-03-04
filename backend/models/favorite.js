const mongoose =require("mongoose")



const favoriteSchema =new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    item:{type: mongoose.Schema.Types.ObjectId, ref: "Item"}
})


module.exports=mongoose.model("Favorite",favoriteSchema)