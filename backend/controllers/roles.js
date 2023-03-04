const roleModel =require("../models/roleSchema")



const createNewRole =(req,res)=>{
    const {role,
        Permissions}=req.body

        const newRoleModel =new roleModel({
            role,
        Permissions
        })

        newRoleModel.save().then((result)=>{
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
    createNewRole
}