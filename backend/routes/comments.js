const express =require("express")
const {addNewcomment,
    updatecomment,
    deletcomment,
    gitAllcomment,
    gitcommentById}=require("../controllers/comments")


const commentsRouter = express.Router();

commentsRouter.post("/", addNewcomment);
commentsRouter.put("/:id", updatecomment);
commentsRouter.delete("/:id", deletcomment);
commentsRouter.get("/", gitAllcomment);
commentsRouter.get("/:id", gitcommentById);


module.exports = commentsRouter;
