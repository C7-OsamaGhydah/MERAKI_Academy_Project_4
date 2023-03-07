const express =require("express")
const {addNewfavorite,deletfavorite,
    gitfavoriteByuser}=require("../controllers/favorites")
    const {Authorization} =require("../middleware/Authorization")
const {Authentication} =require("../middleware/Authentication")

const favoritesRouter = express.Router();

favoritesRouter.post("/",Authentication,Authorization("Add_New_Favorite"),
 addNewfavorite);
favoritesRouter.delete("/:id",Authentication,Authorization("Delet_Favorite"), deletfavorite);
favoritesRouter.get("/",Authentication,Authorization("Get_Favorite_By_User"), gitfavoriteByuser);


module.exports = favoritesRouter;
