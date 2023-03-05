const userModel=require("../models/userSchema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET ="osamajiji";
const TOKEN_EXP_Time = "60m";


const Registr =(req,res)=>{
    console.log("hi osama i am Registr")

    const {email,
        password,
        phoneNumber,
        firstName,
        lastName,
        city,
        country,
        role}=req.body

        const newUserModel= new userModel({email,
            password,
            phoneNumber,
            firstName,
            lastName,
            city,
            country,
            role})

            newUserModel.save().then((result)=>{
                res.status(201).json({
                    success: true,
                    message: `Registration completed successfully`,
                    result: result
                })
            }).catch((err)=>{
                res.status(500).json({
                    success: false,
                    message: `Server Error`,
                    err: err.message,})
                })
}


const login =(req,res)=>{
    console.log("hi osama i am login")

    const {email,
        password
    }=req.body

    userModel.findOne({ email }).populate({path:"role"}).then(async (result)=>{
        const available =await bcrypt.compare(password,result.password)
        
            if(available){
                console.log(typeof(result))
                const payload ={result}
                const options = {
                    expiresIn: TOKEN_EXP_Time,
                };
                const token= jwt.sign(payload, SECRET, options);

                res.status(201).json({
                    token:token,
                    success: true,
                    message: `Registration completed successfully`,
                    result: result
                })
            }else{
                res.status(201).json({
                    success: false,
                    message: `email or password is not correct `,
                })
            }
            }).catch((err)=>{
                res.status(500).json({
                    success: false,
                    message: `Server Error`,
                    err: err.message,})
                })
}


module.exports={
    login,
    Registr
}