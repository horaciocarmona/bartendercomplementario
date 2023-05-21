import { Schema, model } from 'mongoose'
import paginate from "mongoose-paginate-v2"

const cartSchema = new Schema({
  id: { type: Number, require: true },
  products: { type: Array, default: [] },
});

cartSchema.plugin(paginate)

const cartModel = model("Carts", cartSchema)

export default cartModel