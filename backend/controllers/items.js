const itemModel =require("../models/itemSchema")
const commentModel =require("../models/comment")
const { populate } = require("../models/userSchema")



const addNewItem =(req,res)=>{

    const _id=req.token
    let {title,
        description,
        price,
        img,
        city,
        country,
        user,
        type,
        comment}=req.body

        user=_id._id

        const newitemModel =new itemModel({
        title,
        description,
        price,
        img,
        city,
        country,
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
    const user=req.token
    const _id=req.params.id
    const {title,
        description,
        price,
        img,
        city,
        country
    }=req.body
    
    itemModel.findById({_id:_id}).then((result)=>{
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

        itemModel.findByIdAndUpdate({_id},{title,
            description,
            price,
            img,
            city,
        country},{new:true}).then((result)=>{
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

    const user=req.token

    commentModel.deleteMany({item:_id}).then((result)=>{
  }).catch((err)=>{
     console.log(err)
  
  })
    itemModel.findById({_id:_id}).then((result)=>{
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
    const num=req.params.num

        itemModel.find().limit(num).populate({path:"user", select:["city","country","firstName","phoneNumber"]}).populate({path:"type", select:"type"}).exec().then((result)=>{
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

        itemModel.findById({_id:id}).populate({path:"user", select:["city","country","firstName","phoneNumber"]}).populate({path:"type", select:"type"}).populate({path:"comment",populate:{path:"user", select:"firstName"}}).exec().then((result)=>{
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

    itemModel.find({user:user}).populate({path:"user", select:["city","country","firstName","phoneNumber"]}).populate({path:"type", select:"type"}).exec().then((result)=>{
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
    const num=req.params.num

    itemModel.find({type:type}).limit(num).then((result)=>{
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


const gitItemBycountry =(req,res)=>{
    const country=req.params.country

    itemModel.find({country:country}).then((result)=>{
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
    gitItemBycountry,
    gitItemBytype,
    gitItemByuser,
    gitItemById,
    gitAllItem,
    deletItem,
    updateItem,
    addNewItem
}