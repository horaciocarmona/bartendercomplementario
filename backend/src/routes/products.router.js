import { Router } from "express";
import { getProducts,getProduct,deleteProduct,updateProduct,addProducts } from "../controllers/product.controller.js";

const routerProd = Router();

//EndPoint Traer un producto por id ruta\product
routerProd.get("/:id", getProduct);

//EndPoint borra producto por id ruta\product
routerProd.delete("/:id", deleteProduct);

//EndPoint todos los productos ruta\product ad product
routerProd.get("/", getProducts) 


//EndPoint Dar de alta un producto ruta\product por id
routerProd.post("/", addProducts)

//EndPoint Modificar un producto ruta\product por id
routerProd.put("/:id", updateProduct)

export default routerProd;
