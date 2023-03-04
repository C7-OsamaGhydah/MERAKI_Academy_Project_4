const commentModel =require("../models/comment")



const addNewcomment =(req,res)=>{
    const {comment,
    time,
    user,
    item}=req.body

        const newcommentModel =new commentModel({comment,
            time,
            user,
            item})

            newcommentModel.save().then((result)=>{
            res.status(201).json({
                success: true,
                message: `The comment was added successfully`,
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

const updatecomment =(req,res)=>{
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


const deletcomment =(req,res)=>{
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


const gitAllcomment =(req,res)=>{
    const _id=req.query

        itemModel.find().then((result)=>{
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

const gitcommentById =(req,res)=>{
    const id=req.params.id

        itemModel.findById({_id:id}).then((result)=>{
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


module.exports={addNewcomment,
    updatecomment,
    deletcomment,
    gitAllcomment,
    gitcommentById}