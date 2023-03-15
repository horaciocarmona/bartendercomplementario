import {Schema,model} from "mongoose";

const userCollection="users"
const userSchema=new Schema({
    nombre:String,
    apellido:String,
    email:{
        type:String,
        unique:true
    },
    edad:Number
})

export const userModel=model(userCollection,userSchema)