import { InstanceError } from "sequelize";
import { findProducts} from "../services/MockingProductsServices.js";
import CustomError from "../helpers/middlewares/errors/CustomError.js";
import EErrors from "../helpers/middlewares/errors/enums.js"
import {generateProductErrorInfo} from "../helpers/middlewares/errors/info.js"
import {generateProductAddErrorInfo} from "../helpers/middlewares/errors/info.js"


export const getMockingProducts = async (req, res) => {

    try {
        const product = await findProducts();
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
