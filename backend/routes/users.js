const express =require("express")
const {Registr,login} =require("../controllers/users")
const {Authorization} =require("../middleware/Authorization")
const {Authentication} =require("../middleware/Authentication")


const usersRouter =express.Router()


usersRouter.post("/registr",Registr)
usersRouter.post("/login",login)


module.exports=usersRouter