const express =require("express")
const {addNewcomment,
    updatecomment,
    deletcomment,
    gitCommentByItem,
    gitcommentById,
    gitCommentByuser}=require("../controllers/comments")


const commentsRouter = express.Router();

commentsRouter.post("/", addNewcomment);
commentsRouter.put("/:id", updatecomment);
commentsRouter.delete("/:id", deletcomment);
commentsRouter.get("/item/:id", gitCommentByItem);
commentsRouter.get("/:id", gitcommentById);
commentsRouter.get("/user/:id", gitCommentByuser);



module.exports = commentsRouter;
