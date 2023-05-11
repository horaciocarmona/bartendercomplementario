import cartModel from "../models/CartModel.js";
import mongoose from "mongoose";


  export const findCartById=async(id)=> {
    console.log("consulta de un elemento de MongoDb");
    try {
      const elemento = await cartModel.findById(
        new mongoose.Types.ObjectId(id)
      );
      return elemento;
    } catch (error) {
      return  error;
    }
  }

  export const deleteCartById=async (id)=> {
    try {
      const mensaje = await cartModel.findByIdAndRemove(
        new mongoose.Types.ObjectId(id)
      );
      return mensaje;
    } catch (error) {
      return error;
    }
  }

  export const updateCartById=async(id, info)=> {
    try {
//      console.log(id,info)
      const mensaje = await cartModel.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id),
        info
      );
      return mensaje;
    } catch (error) {
      return error;
    }
  }

  export const addCarts=async(elementos)=> {
    try {
      const mensaje = await cartModel.insertMany(elementos);
      return mensaje;
    } catch (error) {
      return error;
    }
  }

 export const addProductCart=async(id, idProd, cant)=> {
    try {
      let cartId = new mongoose.Types.ObjectId(id);
      let prodId = new mongoose.Types.ObjectId(idProd);
      let carrito = await cartModel.findById(cartId);
      const product = carrito.products.find((product) =>
        new mongoose.Types.ObjectId(idProd).equals(product.id_Prod)
      );
      const nuevoProducts = carrito.products;
      if (product) {
        product.cant = cant;
        console.log(cant);
      } else {
        const nuevoProducts = carrito.products.push({
          prodId: prodId,
          cant: cant,
        });
      }
      carrito.products = nuevoProducts;
      const respuesta = await cartModel.findByIdAndUpdate(cartId, carrito);
      return respuesta;
    } catch (error) {
      console.log("error en adproductcart", error);
    }
  }

  export const getProductsCart=async()=> {
    try {
      const respuesta = await cartModel
        .find()
        .populate({ path: "products.id_Prod" });
      return respuesta;
    } catch (error) {
      console.log("error en getProductsCart", error);
    }
  }

  const deleteProductsCart=async(id, idProd)=> {
    try {
      let cartId = new mongoose.Types.ObjectId(id);
      let prodId = new mongoose.Types.ObjectId(idProd);

      let carrito = await cartModel.findById(cartId);
      const resto = carrito.products.filter(
        (product) => !new mongoose.Types.ObjectId(idProd).equals(product.id_Prod)
      );
      console.log(resto);
      carrito.products = resto;
      const respuesta = await cartModel.findByIdAndUpdate(id, carrito);
      return respuesta;
    } catch (error) {
      console.log("error en getProductsCart", error);
    }
  }

  const deleteAllProductsCart=async(id)=> {
    try {
      let cartId = new mongoose.Types.ObjectId(id);
      let carrito = await cartModel.findById(id);
      let mensaje = "";
      if (carrito) {
        const resto = carrito.products.filter(
          (product) =>
            !new mongoose.Types.ObjectId(product.id_Prod).equals(
              new mongoose.Types.ObjectId(product.id_Prod)
            )
        );
        console.log(resto);
        carrito.products = resto;
        const respuesta = await cartModel.findByIdAndUpdate(id, carrito);

        //            carrito.products.forEach(async element => {
        //            mensaje= await this.deleteProductsCart(cartId,element.idProd)

        //            });
        console.log(cartModel.find());
      } else {
        console.log(
          `no existe el carrito con id: ${req.params.cid} en la base de datos`
        );
      }
      return mensaje;
    } catch (error) {
      console.log("error en getProductsCart", error);
    }
  }

