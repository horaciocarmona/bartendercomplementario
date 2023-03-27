import mongoose from "mongoose";
const { Schema } = mongoose;
import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
const messageSchema = new Schema({
  name: { type: String, require: true, max: 50 },
  email: { type: String, require: true, max: 50 },
  message: { type: String, require: true, max: 250 },
});

export default class ManagerMessageMongoDB extends ManagerMongoDB {
  constructor() {
    super(process.env.MONGODBURL, "messages", messageSchema);
    //atributos propios
  }
  //metodos propios
}
