import mongoose from "mongoose";
// url esta propiedad deberia ser primvada
export class ManagerPostgresqlDB {
  #url;
  constructor(url, collection, schema) {
    this.#url = url;
    this.collection = collection;
    this.schema = new mongoose.Schema(schema);
    this.model = mongoose.model(this.collection, this.schema);
  }

  async setConnection() {
    try {
      await mongoose.connect(this.#url);
      console.log("conectado a base MongoDB");
    } catch (error) {
      console.log("error de conexion a MongoDB", error);
    }
  }

  async getElements() {
    this.setConnection();
    try {
      const elementos = await this.model.find();
      return elementos;
    } catch (error) {
      console.log("error en consulta todos los elementos de MongoDb", error);
    }
  }

  async getElementById(id) {
    this.setConnection();
    try {
      const elemento = await this.model.findById(id);
      return elemento;
    } catch (error) {
      console.log("error en consulta de un elemento de MongoDb", error);
    }
  }

  async deleteElement(id) {
    this.setConnection();
    try {
      const mensaje = await this.model.findByIdAndRemove(id);
      return mensaje;
    } catch (error) {
      console.log("error en eliminacion de un elemento de MongoDb", error);
    }
  }

  async updateElement(id, info) {
    this.setConnection();
    try {
      const mensaje = await this.model.findByIdAndUpdate(id, info);
      return mensaje;
    } catch (error) {
      console.log("error en modificacion de un elemento de MongoDb", error);
    }
  }

  async addElements(elementos) {
    this.setConnection();
    try {
      const mensaje = await this.model.insertMany(elementos);
      return mensaje;
    } catch (error) {
      console.log("error en alta de elementos de MongoDb", error);
    }
  }
}
