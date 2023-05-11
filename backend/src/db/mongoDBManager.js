import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2"

// url esta propiedad deberia ser primvada
export class ManagerMongoDB {
  #url;
  constructor(url, collection, schema) {
    this.#url = url;
    this.collection = collection;
    this.schema = new mongoose.Schema(schema);
    this.schema.plugin(paginate)
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
    console.log("consulta de un elemento de MongoDb");

    this.setConnection();

    try {
      const elemento = await this.model.findById(
        new mongoose.Types.ObjectId(id)
      );
      return elemento;
    } catch (error) {
      console.log("error en consulta de un elemento de MongoDb", error);
    }
  }

  async deleteElementById(id) {
    this.setConnection();
    try {
      const mensaje = await this.model.findByIdAndRemove(
        new mongoose.Types.ObjectId(id)
      );
      return mensaje;
    } catch (error) {
      console.log("error en eliminacion de un elemento de MongoDb", error);
    }
  }

  async updateElement(id, info) {
    this.setConnection();
    try {
//      console.log(id,info)
      const mensaje = await this.model.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id),
        info
      );
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
