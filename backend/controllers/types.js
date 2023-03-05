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




module.exports={
    createNewType
}