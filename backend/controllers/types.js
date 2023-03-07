const typeModel =require("../models/type")



const createNewType =(req,res)=>{
    const {type}=req.body

        const newTypeModel =new typeModel({
            type
        })

        newTypeModel.save().then((result)=>{
            res.status(201).json(result)
        }).catch((err)=>{
            res.status(500).json({
                success: false,
                message: `Server Error`,
                err: err.message,
        })
        })
}



const getAllType =(req,res)=>{
    
        typeModel.find().then((result)=>{
            if(result){
                res.status(200).json({
                    success: true,
                    message: `get all type successfully`,
                    result: result,
            })
            }else{
                res.status(401).json({
                    success: false,
                    message: `no type yet`,
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




module.exports={
    getAllType,
    createNewType
}