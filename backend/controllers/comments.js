const { isValidObjectId } = require("mongoose")
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
    const {comment,
        time}=req.body

        commentModel.findByIdAndUpdate({_id},{comment,
            time},{new:true}).then((result)=>{
                if(result){
                    res.status(200).json({
                        success: true,
                        message: `The comment update successfully`,
                        result: result,
                })
                }else{
                    res.status(401).json({
                        success: false,
                        message: `The comment not found`,
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


const deletcomment =(req,res)=>{
    const _id=req.params.id

    commentModel.findByIdAndDelete({_id}).then((result)=>{
            if(result){
                res.status(200).json({
                    success: true,
                    message: `The comment deleted successfully`,
                    result: result,
            })
            }else{
                res.status(401).json({
                    success: false,
                    message: `The comment not found`,
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


const gitCommentByItem =(req,res)=>{
    const item=req.params.id

    commentModel.find({item:item}).then((result)=>{
            if(result&&result.length>0){
                res.status(200).json({
                    success: true,
                    message: `get all comments in this item successfully`,
                    result: result,
            })
            }else{
                res.status(401).json({
                    success: false,
                    message: `no comment in this item`,
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

    commentModel.findById({_id:id}).then((result)=>{
            if(result){
                res.status(200).json({
                    success: true,
                    message: `get comment successfully`,
                    result: result,
            })
            }else{
                res.status(401).json({
                    success: false,
                    message: `no comment in this id`,
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

const gitCommentByuser =(req,res)=>{
    const user=req.params.id

    commentModel.find({user:user}).then((result)=>{
            if(result&&result.length>0){
                res.status(200).json({
                    success: true,
                    message: `get all comments for this user successfully`,
                    result: result,
            })
            }else{
                res.status(401).json({
                    success: false,
                    message: `no comment for this user`,
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
    gitCommentByItem,
    gitcommentById,
    gitCommentByuser}