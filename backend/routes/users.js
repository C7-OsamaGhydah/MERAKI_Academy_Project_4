const express =require("express")
const {Registr,login,gitUserById,updateUser} =require("../controllers/users")
const {Authorization} =require("../middleware/Authorization")
const {Authentication} =require("../middleware/Authentication")


const usersRouter =express.Router()


usersRouter.post("/registr",Registr)
usersRouter.post("/login",login)
usersRouter.get("/:id",Authentication,gitUserById)
usersRouter.put("/update/:id",Authentication,updateUser)


module.exports=usersRouter