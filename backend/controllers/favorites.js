const favoriteModel =require("../models/favorite")



const addNewfavorite =(req,res)=>{
    const {user,
        item}=req.body

        const newFavoriteModel =new favoriteModel({user,
            item})

        newFavoriteModel.save().then((result)=>{
            res.status(200).json({
                success: true,
                message: `add item in favorite successfully`,
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

const deletfavorite =(req,res)=>{
    const _id =req.params.id

    favoriteModel.findByIdAndDelete({_id:_id}).then((result)=>{
        if(result){
            res.status(200).json({
                success: true,
                message: `delete item successfully`,
                result: result,
        })
        }else{
            res.status(401).json({
                success: false,
                message: `no item`,
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

const gitfavoriteByuser =(req,res)=>{
    const user=req.token

    favoriteModel.find({user:user}).populate({path:"item", select:["title","description","price","location","video","img"]}).exec().then((result)=>{
            if(result.length>0){
                res.status(200).json({
                    success: true,
                    message: `get item successfully`,
                    result: result,
            })
            }else{
                res.status(401).json({
                    success: false,
                    message: `no items for this user`,
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
    addNewfavorite,
deletfavorite,
gitfavoriteByuser
}