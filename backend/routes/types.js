const express =require("express")
const {createNewType}=require("../controllers/types")


const typesRouter =express.Router()


typesRouter.post("/",createNewType)



module.exports=typesRouter