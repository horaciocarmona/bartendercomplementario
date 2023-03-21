import mongoose from 'mongoose'
const {Schema}=mongoose
import  {ManagerMongoDB}  from "../../../db/mongoDBManager.js"
const cartSchema = new Schema({
    products:{type:Array,default:[]},
})

export default class ManagerCartMongoDB extends ManagerMongoDB {
    constructor(){
        super(process.env.MONGODBURL,"carts",cartSchema)
        //atributos propios
    }
    //metodos propios
    async addProductCart(id,idProd,cant){
        super.setConnection();
        let carrito= await this.model.findById(id)
        let prodId= new mongoose.Types.ObjectId(idProd)
        carrito.products.push({prodId,cant})
        const respuesta=await this.model.findByIdAndUpdate(id,carrito)
        return respuesta
    }
}
