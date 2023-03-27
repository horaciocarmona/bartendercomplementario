import { Router } from "express";
import { getManagerCarts } from "../dao/daoManager.js";
//import { getManagerProducts } from "../dao/daoManager.js"
const cartManager = getManagerCarts();
const routerCart = Router();

//EndPoint crea carrito con products vacio ruta\api\carts
routerCart.post("/", async (req, res) => {
  let mensaje = await cartManager.addElements(req.body);
  console.log(mensaje);
  res.send(mensaje);
});

//EndPoint borra producto por pid del carrito cid
routerCart.delete("/:cid/products/:pid", async (req, res) => {
  let respuesta = cartManager.deleteProductsCart(
    req.params.cid,
    req.params.pid
  );
  res.send(respuesta);
});

//EndPoint actualiza carrito cid con productos body
routerCart.put("/:cid", async (req, res) => {
  //actualiza carrito con arreglo de productos
  if (req.params.cid) {
    let mensaje = await cartManager.updateElement(req.params.cid, req.body);
    console.log(mensaje);
    res.send(mensaje);
  }
});

//EndPoint carga en un producto al carrito ruta\api\carts cantidad
routerCart.put("/:cid/products/:pid", async (req, res) => {
  const { cant = "0" } = req.body;
  console.log(cant)
  const respuesta = await cartManager.addProductCart(
    req.params.cid,
    req.params.pid,
    parseInt(cant)
  );
  console.log(respuesta);
  res.send(respuesta);
});

//EndPoint borra todos los producto del carrito cid
routerCart.delete("/:cid", async (req, res) => {
  const mensaje = await cartManager.deleteAllProductsCart(req.params.cid);
  console.log(mensaje);
  res.send(mensaje);
});

//EndPoint Traer todos los producto por id de carrito ruta\api\carts
routerCart.get("/:cid", async (req, res) => {
  let CartProducts = await cartManager.getProductsCart(req.params.cid);
  if (CartProducts) {
    console.log(CartProducts);
    res.send(CartProducts);
  } else {
    console.log(
      `no existe el carrito con id: ${req.params.cid} en la base de datos`
    );
    res.send(
      `no existe el carrito con id: ${req.params.cid} en la base de datos`
    );
  }
});

//EndPoint carga uno o varios productos al carrito ruta\api\carts
routerCart.post("/:cid", async (req, res) => {
  let carrito = await cartManager.getElementById(req.params.cid);
  if (carrito) {
    let CartProducts = await cartManager.addElements(req.body);
    console.log(CartProducts);
    res.send(CartProducts);
  } else {
    console.log(
      `no existe el carrito con id: ${req.params.cid} en base de datos`
    );
    res.send(`no existe el carrito con id: ${req.params.cid} en base de datos`);
  }
});

export default routerCart;
