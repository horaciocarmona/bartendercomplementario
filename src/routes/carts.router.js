import {Router} from "express"
import {getManagerCarts,getManagerProducts}  from '../dao/daoManager.js'
//import { getManagerProducts } from "../dao/daoManager.js"
const cartManager = getManagerCarts()
const routerCart=Router()

//EndPoint crea carrito con products vacio ruta\api\carts
routerCart.post('/',async (req,res)=>{
    let mensaje= await cartManager.addElements(req.body)
    console.log(mensaje)
    res.send(mensaje)
})

//EndPoint Traer todos los producto por id de carrito ruta\api\carts
routerCart.get('/:cid',async (req,res)=>{
    let CartProducts= await cartManager.getElementById(req.params.cid)
    if (CartProducts) {
        console.log(CartProducts)
        res.send(CartProducts)
    } else {
        console.log(`no existe el carrito con id: ${req.params.cid} en archivo de productos.txt`)
        res.send(`no existe el carrito con id: ${req.params.cid} en archivo de productos.txt`)
    }
})

//EndPoint carga productos al carrito ruta\api\carts
routerCart.post('/:cid/product/:pid',async (req,res)=>{
    //Persiste producto en productos.txt
        if (req.cant) {
            cant=parseInt(req.cant)
        } else {
             cant=0    
        }
    //    let Product= await productManager.getProductById(parseInt(req.params.pid))
//    if (Product) {
        const respuesta= await cartManager.addProductCart(req.params.cid,req.params.pid,cant)
        console.log(respuesta)
        res.send(respuesta)
    // } else {
    //     console.log(`no existe el producto con id: ${req.params.pid} en archivo de productos.txt`)
    //     res.send(`no existe el producto con id: ${req.params.pid} en archivo de productos.txt`)
    // }
}
)

//EndPoint carga uno o varios productos al carrito ruta\api\carts
routerCart.post('/:cid',async (req,res)=>{
    //Persiste producto en productos.txt
    let Product= await cartManager.getElementById(req.params.cid)
    if (Product) {
        let CartProducts= await cartManager.addElements(req.body)
        console.log(CartProducts)
        res.send(CartProducts)
    } else {
        console.log(`no existe el producto con id: ${req.params.pid} en archivo de productos.txt`)
        res.send(`no existe el producto con id: ${req.params.pid} en archivo de productos.txt`)
    }
}
)

//EndPoint borra producto por pid del carrito cid
routerCart.delete('/:cid/product/:pid',async (req,res)=>{
    let Product=await productManager.deleteProduct(req.params.pid)
    console.log(JSON.stringify(Product))
    res.send(JSON.stringify(Product))
})

export default routerCart
