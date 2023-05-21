import cartModel from "../models/MongoDB/CartModel.js";
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

  export const updateProductCartById=async(id, info)=> {
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

 export const insertProductCart=async(id, idProd, cant)=> {
    try {
      console.log('insert productcart',id,idProd)
      let cartId = new mongoose.Types.ObjectId(id);
      let prodId = new mongoose.Types.ObjectId(idProd);
      let carrito = await cartModel.findById(cartId);
      console.log('carrito',carrito)
      const product = carrito.products.find((product) =>
        new mongoose.Types.ObjectId(idProd).equals(product.id_Prod)
      );

      const nuevoProducts = carrito.products;
      console.log('nuevo producto',carrito.products)
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
      return error;
    }
  }

  export const findProductsCart=async()=> {
    try {
      const respuesta = await cartModel
        .find()
        .populate({ path: "products.id_Prod" });
      return respuesta;
    } catch (error) {
      return error;
    }
  }

  export const deleteProductCartById=async(id, idProd)=> {
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
      return error;
    }
  }

  export const deleteAllProductsCartById=async(id)=> {
    try {
      let cartId = new mongoose.Types.ObjectId(id);
      let carrito = await cartModel.findById(id);
      let mensaje = "";
      if (carrito) {
        // const resto = carrito.products.filter(
        //   (product) =>
        //     !new mongoose.Types.ObjectId(product.id_Prod).equals(
        //       new mongoose.Types.ObjectId(product.id_Prod)
        //     )
        // );
        // console.log(resto);
        carrito.products = [];
        const respuesta = await cartModel.findByIdAndUpdate(id, carrito);

        //            carrito.products.forEach(async element => {
        //            mensaje= await this.deleteProductsCart(cartId,element.idProd)

        //            });
//        console.log(cartModel.find());
         return respuesta     
} else {
        
          return `no existe el carrito con id: ${req.params.cid} en la base de datos`
        ;
      }
    } catch (error) {
      return error;
    }
  }

  export const addProductsCart=async(id, idProd, cant)=> {
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
      return error;
    }
  }
