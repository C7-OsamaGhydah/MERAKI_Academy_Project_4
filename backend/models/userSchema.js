const mongoose =require("mongoose")
const bcrypt = require("bcrypt");
const SALT = process.env.SALT||5


const userSchema =new mongoose.Schema({
    email: { type: String, required: true, unique: true,trim:true },
    password:{type:String ,required :true,minlength:8},
    phoneNumber:{type: Number,trim:true,minlength:9},
    firstName:{type: String,trim:true,minlength:3},
    lastName:{type: String,trim:true,minlength:3},
    city:{type: String,trim:true,minlength:3},
    img:{type:String},
    country:{type: String,trim:true},
    role:{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }
},{
  timestamps:true
})

userSchema.pre("save", async function () {
    this.email = this.email.toLowerCase();
    this.password = await bcrypt.hash(this.password,Number(SALT));
  });

module.exports = mongoose.model("User",userSchema);