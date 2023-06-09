import mongoose from "mongoose";
const { Schema } = mongoose;
import { ManagerPostgresqlDB } from "../../../db/postgresqlDBManager.js";
const cartSchema = new Schema({
  id: { type: Number, require: true },
  products: { type: Array, default: [] },
});

export default class ManagerCartPostgresqlDB extends ManagerPostgresqlDB {
  constructor() {
    super(process.env.MONGODBURL, "carts", messageSchema);
    //atributos propios
  }
  //metodos propios
}
