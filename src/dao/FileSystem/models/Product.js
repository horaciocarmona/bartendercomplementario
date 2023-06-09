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
        super(process.env.MONGODBURL,"messages",messageSchema)
        //atributos propios
    }
    //metodos propios

}
