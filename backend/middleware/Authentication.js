const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET||"osamajiji";
const TOKEN_EXP_Time = process.env.TOKEN_EXP_Time||"60m";


const Authentication = async (req,res,next) => {
    let token =req.headers.authorization
    if(!token){
      res.status(500).json({
        success: false,
        message: `server error`,
    })
    return
   }else{
       token =req.headers.authorization.split(" ").pop()
       jwt.verify(token, SECRET,(err,result)=>{
        if(err){
          res.status(401).json({
            success: false,
            message: err,
        })
        return
        }
        if(!result){
          res.status(401).json({
            success: false,
            message: "token is unvalid",
        })
        return
        }else{
          req.token=result.result
          next()
        }
       });

    }

  };



  module.exports={Authentication}