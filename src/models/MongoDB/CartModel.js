import { Schema, model } from 'mongoose'
import paginate from "mongoose-paginate-v2"

const cartSchema = new Schema({

  products: {
    type: [
      {
        prodId: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required:true
        },
        cant: Number,
      },
    ],
//    default: []
  },
});

cartSchema.plugin(paginate)

const cartModel = model("carts", cartSchema)

export default cartModel