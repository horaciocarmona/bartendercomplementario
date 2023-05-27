import cartModel from "../models/MongoDB/CartModel.js";
import productModel from "../models/MongoDB/ProductModel.js";
import ticketModel from "../models/MongoDB/TicketModel.js";
import mongoose from "mongoose";

export const findCartById = async (id) => {
  console.log("consulta de un elemento de MongoDb");
  try {
    const elemento = await cartModel.findById(new mongoose.Types.ObjectId(id));
    return elemento;
  } catch (error) {
    return error;
  }
};

export const updateProductCartById = async (id, info) => {
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
};

export const addCarts = async (elementos) => {
  try {
    const mensaje = await cartModel.insertMany(elementos);
    return mensaje;
  } catch (error) {
    return error;
  }
};

export const insertProductCart = async (id, idProd, cant) => {
  try {
    console.log("insert productcart", id, idProd);
    let cartId = new mongoose.Types.ObjectId(id);
    let prodId = new mongoose.Types.ObjectId(idProd);
    let carrito = await cartModel.findById(cartId);
    console.log("carrito", carrito);
    const product = carrito.products.find((product) =>
      new mongoose.Types.ObjectId(idProd).equals(product.prodId)
    );
    const nuevoProducts = carrito.products;
    console.log("nuevo producto", carrito.products);
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
};

export const findProductsCart = async () => {
  try {
    const respuesta = await cartModel.find().populate("products.prodId");
    return respuesta;
  } catch (error) {
    return error;
  }
};

export const deleteProductCartById = async (id, idProd) => {

  try {
    let cartId = new mongoose.Types.ObjectId(id);
    let carrito = await cartModel.findById(cartId);
    console.log('carrito')
    carrito.products.forEach(element => {
      console.log('element',element)
    });
    const resto = carrito.products.filter(
       (product) => !idProd.equals(product.prodId)
    );
//    carrito.products = resto;
    console.log('resto',carrito) 
    const respuesta = await cartModel.findByIdAndUpdate(cartId,{products:resto});
    console.log('update',respuesta)  
    return respuesta;
  } catch (error) {
    return error;
  }
};

export const deleteAllProductsCartById = async (id) => {
  try {
    let cartId = new mongoose.Types.ObjectId(id);
    let carrito = await cartModel.findById(id);
    let mensaje = "";
    if (carrito) {
      carrito.products = [];
      const respuesta = await cartModel.findByIdAndUpdate(id, carrito);
      return respuesta;
    } else {
      return `no existe el carrito con id: ${req.params.cid} en la base de datos`;
    }
  } catch (error) {
    return error;
  }
};

export const addProductsCart = async (id, idProd, cant) => {
  try {
    let cartId = new mongoose.Types.ObjectId(id);
    let prodId = new mongoose.Types.ObjectId(idProd);
    let carrito = await cartModel.findById(cartId);
    const product = carrito.products.find((product) =>
      new mongoose.Types.ObjectId(idProd).equals(product.prodId)
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
};

export const purchaseTicket = async (id, user) => {
  try {
    let cartId = new mongoose.Types.ObjectId(id);
    let carrito= await findCartById(id)
    // obtengo los precios de los productos del carrito
    let productsTicket = await findProductsCart();
    // calculo el importe del carrito y genero orden y carrito de productos no vendidos
    let cartProductsNotSales=carrito
    let ticket = await addOrder(productsTicket[0].products, user,cartProductsNotSales,id);
    // actualizo stock 
    await actustock(ticket, user,cartId); 
    return ticket
  } catch (error) {
    return error;
  }
};

const addOrder = async (carrito, user,cartProductsNotSales,idCart) => {
  console.log("ticket", carrito);
  let ticket=[]
  // creo ticket con productos con stock y carrito no vendidos 
  await carrito.forEach(async produ => {
      if (produ.prodId.stock >= produ.cant) {
        ticket.push(produ)
        await deleteProductCartById(idCart,produ.prodId._id)
      } 
  });
  //Calculo importe del carrito
  const importeTicket = await ticket.reduce(
    (total, produ) => total + produ.prodId.price * produ.cant,
    0
  );
  console.log("importeticket", importeTicket);
  // grabo la orden de compra  
  const buyOrder = await buyToCart(importeTicket, user);
  if (buyOrder) {
      return ticket
  } else {
      return {}
  } 
};

const actustock = async (carrito) => {
  await carrito.forEach(async produ => {
    if (produ.prodId.stock >= produ.cant) {
         const { title, description, code, price, status, stock, category, thumbnails } = produ.prodId
         let prodUpdate={ title: title, description: description, code: code, price: price, status: status, stock: stock, category: category, thumbnails: thumbnails }
         prodUpdate.stock-=produ.cant
         await productModel.findByIdAndUpdate(
          new mongoose.Types.ObjectId(produ.prodId._id),
           prodUpdate
         );
      }
  });
}

const buyToCart = async (amount, user) => {
  const ticket = {
    code: Date.now().toString(),
    purchase_datetime: Date.now(),
    amount: amount,
    purchaser: user.email,
  };
  const order = await ticketModel.insertMany(ticket);
  return order;
};

