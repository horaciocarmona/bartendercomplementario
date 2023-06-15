import { InstanceError } from "sequelize";
import { findProducts,findProductById,insertProducts,updateProductById,deleteProductById } from "../services/ProductServices.js";
import CustomError from "../helpers/middlewares/errors/CustomError.js";
import EErrors from "../helpers/middlewares/errors/enums.js"
import {generateProductErrorInfo} from "../helpers/middlewares/errors/info.js"
import {generateProductAddErrorInfo} from "../helpers/middlewares/errors/info.js"
//
export const getProducts = async (req,res) => {
    console.log(`consulta con limit page category name sort}`);
    const {
      page = "1",
      limit = "10",
      sort = "0",
      category = "",
      title = "",
    } = req.query;
  //  const resultado=await getProducts()
    //  const resultado = await getProducts(
    //  parseInt(limit),
    //  parseInt(page),
    //   title,
    //   category,
    //   parseInt(ord)
    //  );
    let ord="0" 
    ord = !sort ? "0" : sort === "asc" ? "1" : "-1";
    // const pag = page != undefined ? page : 1
    // const limi = limit != undefined ? limit : 10
    // //    const ord = sort == "asc" ? 1 : -1
    try {
        const productos = await findProducts(parseInt(limit), parseInt(page),title,category, parseInt(ord))
        console.log(productos)
        if (productos) {
            return res.status(200).send(productos)

//            return res.status(200).json(productos)
        }
        res.status(200).send({
            message: "Productos no encontrados"
        })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params

    try {
        const product = await findProductById(id);
        if (product) {
            return res.status(200).json(product)
        }

        return res.status(200).json({
            message: "Producto no encontrado"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const addProducts = async (req, res,next) => {
    const { title, description, code, price, status, stock, category } = req.body

    try {
        if (!title || !description || !code || !price || !status || !stock || !category )  {
            CustomError.createError({
            name:"Product add error",
            cause: generateProductAddErrorInfo({ title, description, code, price, status, stock, category }),
            message:"Error creation Product",
            code:EErrors.INVALID_TYPES_ERROR
          })
        }

        const product = await insertProducts([{ title, description, code, price, status, stock, category }])
        if (product instanceof Error){
            return res.status(200).json({
                message: "Error en creacion de Producto"
            })

        } else {
            if (product){
                return res.status(200).json({
                message: "Producto dado de alta"
                })
            }
        }   
    } catch (error) {
        next(error)
        // return res.status(500).json({
        //     message: error.message
        // })
    }
}

export const updateProduct = async (req, res,next) => {
    const { id } = req.params
    const { title, description, code, price, status, stock, category, thumpbnail } = req.body
    try {
        if (!title || !description || !code || !price || !status || !stock || !category || !thumpbnail)  {
            CustomError.createError({
            name:"Product update error",
            cause: generateProductErrorInfo({ title, description, code, price, status, stock, category, thumpbnail }),
            message:"Error update Product",
            code:EErrors.INVALID_TYPES_ERROR
          })
        }

        const product = await updateProductById(id, { title: title, description: description, code: code, price: price, status: status, stock: stock, category: category, thumpbnail: thumpbnail })

        if (product instanceof Error){
            return res.status(200).json({
                message: "Producto no encontrado"
            })

        } else {
            if (product) {
                return res.status(200).json({
                        message: "Producto actualizado"
                })
            }
        } 

        return res.status(200).json({
            message: "Producto no encontrado"
        })

    } catch (error) {
        next(error)
        // return res.status(500).json({
        //     message: error.message
        // })
    }

}

export const deleteProduct = async (req, res) => {
    try {
        console.log('delete product',req.params.id)
        const product = await deleteProductById(req.params.id)
        console.log(product instanceof Error)    
        if (product instanceof Error){
            return res.status(200).json({
                message: "Producto no encontrado"
            })

        } else {
            if (product) {
                return res.status(200).json({
                        message: "Producto eliminado"
                })
            }
        } 
        return res.status(200).json({
            message: "Producto no encontrado"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

    
}