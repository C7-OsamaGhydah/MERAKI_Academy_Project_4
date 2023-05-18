const express =require("express")
const {createNewType,getAllType}=require("../controllers/types")
const {Authorization} =require("../middleware/Authorization")
const {Authentication} =require("../middleware/Authentication")


const typesRouter =express.Router()


typesRouter.post("/",createNewType)
typesRouter.get("/",getAllType)



module.exports=typesRouter