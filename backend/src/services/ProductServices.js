import productModel from "../models/ProductModel.js";
import mongoose from "mongoose";

export const findProducts= async (limit, page, title, category, ord) =>{
    try {
      console.log("consulta paginate", limit, page, title, category, ord);
      // postman ejemplo ingreso de parametros
      //http://localhost:8080/api/products?page=1&sort=des&title=Campari 750ml&category=grande&limit=2
      const products =
        title && category
          ? productModel.paginate(
              { title: title, category: category },
              { limit: limit, page: page, sort: { price: ord } }
            )
          : title
          ? await productModel.paginate(
              { title: title },
              { limit: limit, page: page, sort: { price: ord } }
            )
          : category
          ? await productModel.paginate(
              { category: category },
              { limit: limit, page: page, sort: { price: ord } }
            )
          : await productModel.paginate(
              {},
              { limit: limit, page: page, sort: { price: ord } }
            );
      return products;
    } catch (error) {
        return error
    }
  }

  export const findProductById=async(id)=> {
    console.log("consulta de un elemento de MongoDb");
    try {
      const elemento = await productModel.findById(
        new mongoose.Types.ObjectId(id)
      );
      return elemento;
    } catch (error) {
      return  error;
    }
  }

  export const deleteProductById=async (id)=> {
    try {
      const mensaje = await productModel.findByIdAndRemove(
        new mongoose.Types.ObjectId(id)
      );
      return mensaje;
    } catch (error) {
      return error;
    }
  }

  export const updateProductById=async(id, info)=> {
    try {
//      console.log(id,info)
      const mensaje = await productModel.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id),
        info
      );
      return mensaje;
    } catch (error) {
      return error;
    }
  }

  export const addProducts=async(elementos)=> {
    try {
      const mensaje = await productModel.insertMany(elementos);
      return mensaje;
    } catch (error) {
      return error;
    }
  }

