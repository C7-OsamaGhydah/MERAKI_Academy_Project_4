const express =require("express")
const {Registr,login} =require("../controllers/users")

const usersRouter =express.Router()


usersRouter.post("/registr",Registr)
usersRouter.get("/login",login)


module.exports=usersRouter