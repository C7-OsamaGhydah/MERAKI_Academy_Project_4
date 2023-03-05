const express =require("express")
const {addNewcomment,
    updatecomment,
    deletcomment,
    gitCommentByItem,
    gitcommentById,
    gitCommentByuser}=require("../controllers/comments")
    const {Authorization} =require("../middleware/Authorization")
const {Authentication} =require("../middleware/Authentication")


const commentsRouter = express.Router();

commentsRouter.post("/",Authentication,Authorization("Add_New_Comment"), addNewcomment);
commentsRouter.put("/:id",Authentication,Authorization("Updat_Comment"), updatecomment);
commentsRouter.delete("/:id",Authentication,Authorization("Delet_Comment"), deletcomment);
commentsRouter.get("/item/:id",Authentication,Authorization("Git_Comment_By_Item"), gitCommentByItem);
commentsRouter.get("/:id",Authentication,Authorization("Git_Comment_By_Id"), gitcommentById);
commentsRouter.get("/user/:id",Authentication,Authorization("Git_Comment_By_User"),gitCommentByuser);




module.exports = commentsRouter;
