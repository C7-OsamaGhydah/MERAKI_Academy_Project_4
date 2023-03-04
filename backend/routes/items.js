const express =require("express")
const {gitItemById,addNewItem,updateItem,deletItem,gitAllItem}=require("../controllers/items")


const itemsRouter = express.Router();

itemsRouter.post("/", addNewItem);
itemsRouter.put("/:id", updateItem);
itemsRouter.delete("/:id", deletItem);
itemsRouter.get("/", gitAllItem);
itemsRouter.get("/:id", gitItemById);


module.exports = itemsRouter;
