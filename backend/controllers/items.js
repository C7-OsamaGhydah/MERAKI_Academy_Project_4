const itemModel =require("../models/itemSchema")



const addNewItem =(req,res)=>{

    const _id=req.token
    let {title,
        description,
        price,
        img,
        video,
        location,
        user,
        type,
        comment}=req.body

        user=_id._id

        const newitemModel =new itemModel({
        title,
        description,
        price,
        img,
        video,
        location,
        user,
        type,
        comment
        })

        newitemModel.save().then((result)=>{
            res.status(201).json({
                success: true,
                message: `The item was added successfully`,
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

const updateItem =(req,res)=>{
    const _id=req.params.id
    const {title,
        description,
        price,
        img,
        video,
        location
    }=req.body

        itemModel.findByIdAndUpdate({_id},{title,
            description,
            price,
            img,
            video,
            location},{new:true}).then((result)=>{
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


const deletItem =(req,res)=>{
    const _id=req.params.id

        itemModel.findByIdAndDelete({_id}).then((result)=>{
            if(result){
                res.status(200).json({
                    success: true,
                    message: `The element deleted successfully`,
                    result: result,
            })
            }else{
                res.status(401).json({
                    success: false,
                    message: `The item not found`,
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


const gitAllItem =(req,res)=>{
    const _id=req.query

        itemModel.find().populate({path:"user", select:["city","country","firstName","phoneNumber"]}).populate({path:"type", select:"type"}).exec().then((result)=>{
            if(result){
                res.status(200).json({
                    success: true,
                    message: `get all item successfully`,
                    result: result,
            })
            }else{
                res.status(401).json({
                    success: false,
                    message: `no items yet`,
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

const gitItemById =(req,res)=>{
    const id=req.params.id

        itemModel.findById({_id:id}).populate({path:"user", select:["city","country","firstName","phoneNumber"]}).populate({path:"type", select:"type"}).exec().then((result)=>{
            if(result){
                res.status(200).json({
                    success: true,
                    message: `get item successfully`,
                    result: result,
            })
            }else{
                res.status(401).json({
                    success: false,
                    message: `no items yet`,
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

const gitItemByuser =(req,res)=>{
    const user=req.params.id

    itemModel.find({user:user}).then((result)=>{
            if(result&&result.length>0){
                res.status(200).json({
                    success: true,
                    message: `get all item for this user successfully`,
                    result: result,
            })
            }else{
                res.status(401).json({
                    success: false,
                    message: `no item for this user`,
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


const gitItemBytype =(req,res)=>{
    const type=req.params.id

    itemModel.find({type:type}).then((result)=>{
            if(result&&result.length>0){
                res.status(200).json({
                    success: true,
                    message: `get all item for this type successfully`,
                    result: result,
            })
            }else{
                res.status(401).json({
                    success: false,
                    message: `no item for this type`,
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
    gitItemBytype,
    gitItemByuser,
    gitItemById,
    gitAllItem,
    deletItem,
    updateItem,
    addNewItem
}