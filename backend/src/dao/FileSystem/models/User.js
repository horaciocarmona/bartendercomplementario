import mongoose from "mongoose";
const { Schema } = mongoose;
import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
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
});

export default class ManagerUserMongoDB extends ManagerMongoDB {
  constructor() {
    super(process.env.MONGODBURL, "user", messageSchema);
    //atributos propios
  }
  //metodos propios
}
