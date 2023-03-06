const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET||"osamajiji";
const TOKEN_EXP_Time = process.env.TOKEN_EXP_Time||"60m";


const Authorization = (x) => {
  return (req,res,next)=>{
    const Permissions=req.token.role.permissions
    if(Permissions.includes(x)){
      next()
      return
    }else{
      res.status(401).json({
        success: false,
        message: "unauthorized",
    })
    return
    }
  }
  };



  module.exports={Authorization}