import { Router } from "express";
import { getProducts,getProduct,deleteProduct,updateProduct,addProducts } from "../controllers/product.controller.js";
import { passportError, authorization } from "../utils/messageErrors.js";

const routerProd = Router();

//EndPoint Traer un producto por id ruta\product
// routerSession.get('/current',passportError('current'),authorization('User'),(req,res)=>{
//     routerProd.get("/:id", getProduct);
// })

routerProd.get("/:id",passportError('current'),authorization('User'),getProduct);


//EndPoint borra producto por id ruta\product
routerProd.delete("/:id",passportError('current'),authorization('Admin'), deleteProduct);

//EndPoint todos los productos ruta\product ad product
routerProd.get("/",passportError('current'),authorization('User'), getProducts) 


//EndPoint Dar de alta un producto ruta\product por id
routerProd.post("/",passportError('current'),authorization('Admin'), addProducts)

//EndPoint Modificar un producto ruta\product por id
routerProd.put("/:id",passportError('current'),authorization('Admin'), updateProduct)

export default routerProd;
