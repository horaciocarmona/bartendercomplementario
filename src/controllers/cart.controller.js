// /
import CustomError from "../helpers/middlewares/errors/CustomError.js";
import EErrors from "../helpers/middlewares/errors/enums.js";
import {
    generateProductErrorInfo
} from "../helpers/middlewares/errors/info.js";

import {
    addProductsCart,
    deleteAllProductsCartById,
    deleteProductCartById,
    addCarts,
    updateProductCartById,
    findProductsCart,
    insertProductCart,
    purchaseTicket,
} from "../services/CartServices.js";

// const data = await getManagerCart()
// const managerCart = new data.ManagerCartMongoDB

export const createCart = async (req, res) => {
    try {
        const respuesta = await addCarts([{}]);
        return res.status(200).json(respuesta);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getProductsCart = async (req, res) => {
    try {
        const productos = await findProductsCart();
        if (productos) {
            console.log("productos", productos);
            return res.status(200).json(productos);
        }
        return res.status(200).json({
            message: "Productos no encontrados",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const addProductCart = async (req, res) => {
    const {
        cant = "0"
    } = req.body;

    try {
        const product = await insertProductCart(
            req.params.cid,
            req.params.pid,
            cant
        );
        if (product instanceof Error) {
            return res.status(200).json({
                message: "No se pudo agregar",
            });
        } else {
            if (product) {
                return res.status(200).json({
                    message: "Producto agregado al carrito",
                });
            }
        }
        return res.status(204).json(product);
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const updateProductCart = async (req, res, next) => {
    const id = req.params.cid;
    const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumpbnail,
    } = req.body;
    try {
        if (
            !title ||
            !description ||
            !code ||
            !price ||
            !status ||
            !stock ||
            !category ||
            !thumpbnail
        ) {
            CustomError.createError({
                name: "Product update cart error",
                cause: generateProductErrorInfo({
                    title,
                    description,
                    code,
                    price,
                    status,
                    stock,
                    category,
                    thumpbnail,
                }),
                message: "Error update Product Cart",
                code: EErrors.INVALID_TYPES_ERROR,
            });
        }

        const product = await updateProductCartById(id, {
            title: title,
            description: description,
            code: code,
            price: price,
            status: status,
            stock: stock,
            category: category,
            thumpbnail: thumpbnail,
        });
        if (product instanceof Error) {
            return res.status(200).json({
                message: "No se pudo actualizar",
            });
        } else {
            if (product) {
                return res.status(200).json({
                    message: "Producto actualizado",
                });
            }
        }

        return res.status(200).json({
            message: product,
        });
    } catch (error) {
        next(error);
        // return res.status(500).json({
        //     message: error.message,
        // });
    }
};

export const deleteProductCart = async (req, res) => {
    try {
        const product = await deleteProductCartById(req.params.cid, req.params.pid);
        if (product instanceof Error) {
            return res.status(200).json({
                message: "No se pudo eliminar",
            });
        } else {
            if (product) {
                return res.status(200).json({
                    message: "Producto eliminado",
                });
            }
        }
        return res.status(200).json({
            message: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const deleteAllProductsCart = async (req, res) => {
    try {
        const id = req.params.cid;
        const product = await deleteAllProductsCartById(id);
        if (product instanceof Error) {
            return res.status(200).json({
                message: "No se pudo borrar todos los productos",
            });
        } else {
            if (product) {
                return res.status(200).json({
                    message: "Se borraron todos los productos",
                });
            }
        }
        return res.status(200).json({
            message: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const updateProductsCart = async (req, res) => {
    if (req.params.cid) {
        const product = await addProductsCart(req.params.cid, req.body);
        if (product instanceof Error) {
            return res.status(200).json({
                message: "No se pudo actualizar los productos en el carrito",
            });
        } else {
            if (product) {
                return res.status(200).json({
                    message: "Se actualizaron los productos en el carrito",
                });
            }
        }
        return res.status(200).json({
            message: product,
        });
    }
};

export const purchaseCart = async (req, res) => {
    try {
        if (req.params.cid) {
            console.log(req.params.cid);
            const ticket = await purchaseTicket(req.params.cid, req.user);
            if (ticket) {
                return res.status(200).json({
                    message: "Ticket de Compra",
                });
            } else {
                return res.status(200).json({
                    message: "Se cancelo la Compra",
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};