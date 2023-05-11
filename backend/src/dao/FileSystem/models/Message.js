import mongoose from 'mongoose'
const {Schema}=mongoose
import  {ManagerFileSystemDB}  from "../../../db/fileSystemDBManager.js"
const messageSchema = new Schema({
    id:{type:Number,require:true,max:50},
    name: {type:String,require:true,max:50},
    email: {type:String,require:true,max:50},
    message:{type:String,require:true,max:250}
})

export default class ManagerMessageFileSystemDB extends ManagerFileSystemDB {
    constructor(){
        super(process.env.FILESYSTEMPATH,"messages",messageSchema)
        //atributos propios
    }
    
    //metodos propios

}

