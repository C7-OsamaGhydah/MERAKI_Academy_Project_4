const mongoose =require("mongoose")


const userSchema =new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password:{type: Number,required :true},
    phoneNumber:{type: Number,required :true},
    firstName:{type: String},
    lastName:{type: String},
    city:{type: String},
    country:{type: String}
})

userSchema.pre("save",function () {
const newEmail=this.email.toLowerCase()
return newEmail
})

module.exports = mongoose.model("User",userSchema);