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

            newUserModel.save().select({password:0,role:0,createdAt:0,updatedAt:0,__v:0}).then((result)=>{
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

    userModel.findOne({ email }).select({createdAt:0,updatedAt:0,__v:0}).populate({path:"role"}).then(async (result)=>{
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



const gitUserById =(req,res)=>{
    const id=req.params.id

    userModel.findById({_id:id}).select({password:0,role:0,createdAt:0,updatedAt:0,__v:0}).then((result)=>{
            if(result){
                res.status(200).json({
                    success: true,
                    message: `get user successfully`,
                    result: result,
            })
            }else{
                res.status(401).json({
                    success: false,
                    message: `no user for this id`,
                    result: result,
            })
            }
            
        }).catch((err)=>{
            res.status(500).json({
                success: false,
                message: `Server Error`,
                err: err.message,
        })
        })
}


const updateUser =(req,res)=>{
    const user=req.token
    const _id=req.params.id
    const {
        phoneNumber,
        firstName,
        lastName,
        city,
        country}=req.body
    
    userModel.findById({_id:_id}).then((result)=>{
       console.log(result.user.toString())
    console.log(user._id)
    if(result.user.toString()!=user._id){
        res.status(404).json({
            success: false,
            message: `unauthorized`
    })
        return
    }
 }).catch((err)=>{
    console.log(err)
 
 })

        userModel.findByIdAndUpdate({_id},{
            phoneNumber,
            firstName,
            lastName,
            city,
            country},{new:true}).select({password:0,role:0,createdAt:0,updatedAt:0,__v:0}).then((result)=>{
                res.status(200).json({
                    success: true,
                    message: `The element update successfully`,
                    result: result,
            })
        }).catch((err)=>{
            res.status(500).json({
                success: false,
                message: `Server Error`,
                err: err.message,
        })
        })
}

module.exports={
    gitUserById,
updateUser,
    login,
    Registr
}