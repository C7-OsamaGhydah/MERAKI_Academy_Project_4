const mongoose =require("mongoose")
const bcrypt = require("bcrypt");
const SALT = process.env.SALT||5


const userSchema =new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password:{type:String ,required :true},
    phoneNumber:{type: Number,required :true},
    firstName:{type: String},
    lastName:{type: String},
    city:{type: String},
    country:{type: String},
    role:{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }
})

userSchema.pre("save", async function () {
    this.email = this.email.toLowerCase();
    this.password = await bcrypt.hash(this.password,Number(SALT));
  });

module.exports = mongoose.model("User",userSchema);