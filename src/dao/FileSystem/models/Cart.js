import mongoose from "mongoose";
const { Schema } = mongoose;
import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
const cartSchema = new Schema({
  id: { type: Number, require: true },
  products: { type: Array, default: [] },
});

export default class ManagerCartMongoDB extends ManagerMongoDB {
  constructor() {
    super(process.env.MONGODBURL, "messages", messageSchema);
    //atributos propios
  }
  //metodos propios
}
