import { Router } from "express";
import { updateProductsCart,createCart,deleteProductCart,getProductsCart,addProductCart,deleteAllProductsCart } from "../controllers/cart.controller.js";

//import { getManagerProducts } from "../dao/daoManager.js"
const routerCart = Router();

//EndPoint crea carrito con products vacio ruta\api\carts
routerCart.post("/",createCart);

//EndPoint borra producto por pid del carrito cid
routerCart.delete("/:cid/products/:pid",deleteProductCart)

//EndPoint actualiza-carga carrito cid con productos body
routerCart.put("/:cid", updateProductsCart) 

  //EndPoint carga en un producto al carrito ruta\api\carts cantidad
routerCart.put("/:cid/products/:pid", addProductCart) 

//EndPoint borra todos los producto del carrito cid
routerCart.delete("/:cid", deleteAllProductsCart) 

//EndPoint Traer todos los producto por id de carrito ruta\api\carts
routerCart.get("/:cid", getProductsCart) 


export default routerCart;
