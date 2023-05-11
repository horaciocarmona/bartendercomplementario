import mongoose from 'mongoose'
const {Schema}=mongoose
import  {ManagerPostgresqlDB}  from "../../../db/postgresqlDBManager.js"
const userSchema = new Schema({
    first_name: {
        type: String,
        requered: true
    },
    last_name: {
        type: String,
        requered: true
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    age: {
        type: Number,
        requered: true
    },
    password: {
        type: String,
        requered: true
    }

})

export default class ManagerUserPostgresqlDB extends ManagerPostgresqlDB {
    constructor(){
        super(process.env.MONGODBURL,"users",productSchema)
        //atributos propios
    }
    //metodos propios

}
