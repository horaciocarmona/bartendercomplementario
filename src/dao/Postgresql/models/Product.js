import mongoose from 'mongoose'
const {Schema}=mongoose
import  {ManagerPostgresqlDB}  from "../../../db/postgresqlDBManager.js"
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

export default class ManagerProductPostgresqlDB extends ManagerPostgresqlDB {
    constructor(){
        super(process.env.MONGODBURL,"products",productSchema)
        //atributos propios
    }
    //metodos propios

}
