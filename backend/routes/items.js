const express =require("express")
const {gitItemBytype,gitItemById,addNewItem,updateItem,deletItem,gitAllItem,gitItemByuser}=require("../controllers/items")


const itemsRouter = express.Router();

itemsRouter.post("/", addNewItem);
itemsRouter.put("/:id", updateItem);
itemsRouter.delete("/:id", deletItem);
itemsRouter.get("/", gitAllItem);
itemsRouter.get("/:id", gitItemById);
itemsRouter.get("/user/:id", gitItemByuser);
itemsRouter.get("/type/:id", gitItemBytype);


module.exports = itemsRouter;
