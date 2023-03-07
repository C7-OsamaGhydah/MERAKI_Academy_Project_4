const express =require("express")
const {createNewType,getAllType}=require("../controllers/types")
const {Authorization} =require("../middleware/Authorization")
const {Authentication} =require("../middleware/Authentication")


const typesRouter =express.Router()


typesRouter.post("/",Authentication,Authorization("Create_New_Type"),createNewType)
typesRouter.get("/",Authentication,Authorization("Create_New_Type"),getAllType)



module.exports=typesRouter