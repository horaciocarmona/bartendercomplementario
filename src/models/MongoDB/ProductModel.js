import { Schema,model } from 'mongoose'
import paginate from "mongoose-paginate-v2"
///git 
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
    }
    )

    productSchema.plugin(paginate)
    const productModel = model("products", productSchema)

export default productModel