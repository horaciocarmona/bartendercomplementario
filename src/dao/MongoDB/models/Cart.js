import mongoose from "mongoose";

const { Schema } = mongoose;
import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
const cartSchema = new Schema({
    products: { 
      type : [
        {
          idProd:{
              type:mongoose.Types.ObjectId,
              ref:"products"
          },  
          cant:Number
        }
    ]
  }
});

export default class ManagerCartMongoDB extends ManagerMongoDB {
  constructor() {
    super(process.env.MONGODBURL, "carts", cartSchema);
    //atributos propios
  }
  //metodos propios
  async addProductCart(id, idProd, cant) {
    super.setConnection();
    try {
        let cartId = new mongoose.Types.ObjectId(id);
        let prodId = new mongoose.Types.ObjectId(idProd);
        let carrito = await this.model.findById(cartId);
        const product=carrito.products.find(product=>(new mongoose.Types.ObjectId(idProd).equals(product.idProd)))
        const nuevoProducts=carrito.products
        if (product) {
            product.cant=cant
            console.log(cant)
          } else {
          const nuevoProducts=carrito.products.push({ prodId:prodId, cant:cant});
        }
        carrito.products=nuevoProducts
        const respuesta = await this.model.findByIdAndUpdate(cartId, carrito);
        return respuesta;
    } catch (error) {
       console.log("error en adproductcart", error);
    }

}


  async getProductsCart() {
    super.setConnection();
    try {
      const respuesta = await this.model.find().populate({path:"products.idProd"});
      return respuesta;
    } catch (error) {
        console.log("error en getProductsCart", error);
    }
  }

  async deleteProductsCart(id, idProd) {
    super.setConnection();
    try {
      let cartId = new mongoose.Types.ObjectId(id);
      let prodId = new mongoose.Types.ObjectId(idProd);

      let carrito = await this.model.findById(cartId);
      const resto=carrito.products.filter(product=>!(new mongoose.Types.ObjectId(idProd).equals(product.idProd)))
      console.log(resto)
      carrito.products=resto
      const respuesta = await this.model.findByIdAndUpdate(id,carrito)
      return respuesta;
    } catch (error) {
        console.log("error en getProductsCart", error);
    }
  }

  async deleteAllProductsCart(id) {
    super.setConnection();
    try {
      let cartId = new mongoose.Types.ObjectId(id);
      let carrito = await this.model.findById(id);
      let mensaje=""
      if (carrito) {
        const resto=carrito.products.filter(product=>(!new mongoose.Types.ObjectId(product.idProd).equals(new mongoose.Types.ObjectId(product.idProd))))
        console.log(resto)
        carrito.products=resto
        const respuesta = await this.model.findByIdAndUpdate(id,carrito)
  

//            carrito.products.forEach(async element => {
//            mensaje= await this.deleteProductsCart(cartId,element.idProd)

//            });
          console.log(this.model.find())
      } else {
        console.log(`no existe el carrito con id: ${req.params.cid} en la base de datos`)
      }
      return mensaje;
    } catch (error) {
        console.log("error en getProductsCart", error);
    }
  }

}
