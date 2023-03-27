import {
    Router
} from "express"
import {
    getManagerProducts
} from "../dao/daoManager.js"

const productManager = getManagerProducts();
const routerProd = Router()

//EndPoint Traer un producto por id ruta\product
routerProd.get('/:pid', async (req, res) => {
    console.log('traer un producto', req.params.pid)

    let Product = await productManager.getElementById(req.params.pid)
    if (Product) {
        console.log(Product)
        res.send(Product)
    } else {
        console.log(`producto con id ${req.params.pid} no encontrado`)
        res.send(`producto con id ${req.params.pid} no encontrado`)

    }
})

//EndPoint todos los productos ruta\product ad product
routerProd.get('/', async (req, res) => {
    console.log(`consulta con limit page category name sort}`)
    const {
        page = "1", limit = "10", sort = "0", category = "", title = ""
    } = req.query
    let ord = "0";
    ord = (!sort) ? "0" : (sort === 'asc') ? "1" : "-1"
    const resultado = await productManager.getProducts(parseInt(limit), parseInt(page), title, category, parseInt(ord))
    res.send(resultado)
})



//EndPoint borra producto por id ruta\product
routerProd.delete('/:pid', async (req, res) => {
    let Product = await productManager.deleteElementById(req.params.pid)
    console.log(JSON.stringify(Product))
    res.send(JSON.stringify(Product))
})

//EndPoint Dar de alta un producto ruta\product por id
routerProd.post('/', async (req, res) => {
    //const {title,description,price,thumpbnail,code,stock,status,category}= req.body 
    let mensaje = await productManager.addElements(req.body)
    console.log(mensaje)
    res.send(mensaje)
})

//EndPoint Modificar un producto ruta\product por id
routerProd.put('/:pid', async (req, res) => {
    let mensaje = await productManager.updateElement(req.params.pid, req.body)
    console.log(mensaje)
    res.send(mensaje)
})


export default routerProd