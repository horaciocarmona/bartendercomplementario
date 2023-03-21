import mongoose from 'mongoose'
const {Schema}=mongoose
import  {ManagerMongoDB}  from "../../../db/mongoDBManager.js"
const productSchema = new Schema({
    title:{type:String,require:true,max:50,index:true},
    description:{type:String,require:true,max:50,index:true},
    price:{type:Number,require:true},
    thumpbnail:{type:String,require:true,max:50},
    code:{type:Number,require:true},
    stock:{type:Number,require:true},
    status:{type:Boolean,require:true},
    category:{type:String,
        index:true,
        require:true,
        enum:['grande','mediano','chico'],
        default:'mediano'}
})
export default class ManagerProductMongoDB extends ManagerMongoDB {
    constructor(){

      super(process.env.MONGODBURL,"products",productSchema)
      //atributos propios
    }
    async getProducts(limit,page,filter,ord) {

        super.setConnection();
        try {
            console.log("consulta agregate",limit,page,filter,ord);
//            const products = await this.model.paginate({filter:filter,limit:limit,page:page,sort:{price:ord}})
            const products = await this.model.paginate({category:filter},{limit:2,page:3,sort:{price:0}})

            return products;
        } catch (error) {
          console.log("error en consulta todos los elementos de MongoDb", error);
        }
      }
    //metodos propios
//    async agregado() {
//        const productModel=mongoose.model("products",productSchema)

//        return productModel
        // let ListProducts= await productModel.aggregate([
        //     {$match:{category:query}
        //     },
        //     {$sort:{price:1}},
        //     {$group:{_id:1,products:{$push:"$$ROOT"}}},
        //     {$project:{
        //         "_id":0,
        //         products:"$products"

        //     }},
        //     {
        //         $merge:{
        //             into:"reports"
        //         }
        //     }
        // ])
//    }
}
