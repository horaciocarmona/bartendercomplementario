console.log('selected',process.env.SELECTEDBDD)
//import productModel from '../models/MongoDB/ProductModel.js' 

let productModel=""
if (parseInt(process.env.SELECTEDBDD) == 1) {
  console.log('import model 1')
  // let productModel=""
     import("../models/MongoDB/ProductModel.js").then(
      module => {
       productModel = module.default;
       console.log('productmodel',module.default)
     }
    ).catch(error =>console.log(error))
  // console.log(pp)
} else {
  import("../models/PostgreSQL/ProductModel.js").then(
    (module) => (productModel = module.default)
  );
}

//import productModel from "../models/mongoDB/ProductModel.js";
import mongoose from "mongoose";

export const findProducts = async (limit, page, title, category, ord) => {
  try {
    console.log("consulta paginate", limit, page, title, category, ord);
    // postman ejemplo ingreso de parametros
    //http://localhost:8080/api/products?page=1&sort=des&title=Campari 750ml&category=grande&limit=2
    let products;
    if (parseInt(process.env.SELECTEDBDD) == 1) {
      console.log('pagina')
      console.log(productModel)
      await productModel.paginate({},{limit:10,page:1})
//      console.log(pp)
      products =
        title && category
          ? await productModel.paginate(
              {
                title: title,
                category: category,
              },
              {
                limit: limit,
                page: page,
                sort: {
                  price: ord,
                },
              }
            )
          : title
          ? await productModel.paginate(
              {
                title: title,
              },
              {
                limit: limit,
                page: page,
                sort: {
                  price: ord,
                },
              }
            )
          : category
          ? await productModel.paginate(
              {
                category: category,
              },
              {
                limit: limit,
                page: page,
                sort: {
                  price: ord,
                },
              }
            )
          : await productModel.paginate(
              {},
              {
                limit: limit,
                page: page,
                sort: {
                  price: ord,
                },
              }
            );
    } else {
      products = await productModel.findAll();
    }
    return products;
  } catch (error) {
    return error;
  }
};

export const findProductById = async (id) => {
  console.log("consulta de un elemento de MongoDb");
  try {
    const elemento = await productModel.findById(
      new mongoose.Types.ObjectId(id)
    );
    return elemento;
  } catch (error) {
    return error;
  }
};

export const deleteProductById = async (id) => {
  console.log('paso')
  try {
    const mensaje = await productModel.findByIdAndRemove(
      new mongoose.Types.ObjectId(id)
    );
    return mensaje;
  } catch (error) {
     return error;
  }
};

export const createProduct = async (product) => {
  let newProduct;
  if (parseInt(process.env.SELECTEDBDD) == 1) {
    newProduct = new productModel(product);
    newProduct.save();
  } else {
    newProduct = productModel.build(newProduct);
    newProduct.save();
  }
  return newProduct;
};

export const updateProductById = async (id, info) => {
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
};

export const insertProducts = async (elementos) => {
  try {
    const mensaje = await productModel.insertMany(elementos);
    return mensaje;
  } catch (error) {
    return error;
  }
};
