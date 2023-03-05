const express =require("express")
const {gitItemBytype,gitItemById,addNewItem,updateItem,deletItem,gitAllItem,gitItemByuser}=require("../controllers/items")
const {Authorization} =require("../middleware/Authorization")
const {Authentication} =require("../middleware/Authentication")

const itemsRouter = express.Router();

itemsRouter.post("/",Authentication,Authorization("Add_New_Item"), addNewItem);
itemsRouter.put("/:id",Authentication,Authorization("Update_Item"), updateItem);
itemsRouter.delete("/:id",Authentication,Authorization("Delet_Item"), deletItem);
itemsRouter.get("/",Authentication,Authorization("Git_All_Item"), gitAllItem);
itemsRouter.get("/:id",Authentication,Authorization("Git_Item_By_Id"), gitItemById);
itemsRouter.get("/user/:id",Authentication,Authorization("Git_Item_By_User"), gitItemByuser);
itemsRouter.get("/type/:id",Authentication,Authorization("Git_Item_By_Type"), gitItemBytype);


module.exports = itemsRouter;
