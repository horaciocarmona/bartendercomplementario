import mongoose from "mongoose";
const { Schema } = mongoose;
import { ManagerPostgresqlDB } from "../../../db/postgresqlDBManager.js";
const messageSchema = new Schema({
  name: { type: String, require: true, max: 50 },
  email: { type: String, require: true, max: 50 },
  message: { type: String, require: true, max: 250 },
});

export default class ManagerMessagePostgresqlDB extends ManagerPostgresqlDB {
  constructor() {
    super(process.env.MONGODBURL, "messages", messageSchema);
    //atributos propios
  }
  //metodos propios
}
