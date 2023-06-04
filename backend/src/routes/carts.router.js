import { Router } from "express";
import { updateProductsCart,createCart,deleteProductCart,getProductsCart,addProductCart,deleteAllProductsCart,purchaseCart} from "../controllers/cart.controller.js";
import { passportError, authorization } from "../utils/messageErrors.js";

//import { getManagerProducts } from "../dao/daoManager.js"
const routerCart = Router();

//EndPoint crea carrito con products vacio ruta\api\carts
routerCart.post("/",passportError('current'),authorization('User'),createCart);

//EndPoint borra producto por pid del carrito cid
routerCart.delete("/:cid/products/:pid",passportError('current'),authorization('User'),deleteProductCart)

//EndPoint actualiza-carga carrito cid con productos body
routerCart.put("/:cid",passportError('current'),authorization('User'), updateProductsCart) 

  //EndPoint carga en un producto al carrito ruta\api\carts cantidad
routerCart.put("/:cid/products/:pid",passportError('current'),authorization('User'), addProductCart) 

//EndPoint borra todos los producto del carrito cid
routerCart.delete("/:cid",passportError('current'),authorization('User'), deleteAllProductsCart) 

//EndPoint Traer todos los producto por id de carrito ruta\api\carts
routerCart.get("/:cid",passportError('current'),authorization('User'), getProductsCart) 

//EndPoint finalizar la compra
routerCart.post("/:cid/purchase",passportError('current'),authorization('User'),purchaseCart) 


export default routerCart;
