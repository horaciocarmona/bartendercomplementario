import { Schema, model } from 'mongoose'
import paginate from "mongoose-paginate-v2"

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
    },
    rol: {
        type: String,
        default: "User"
    },
    id_Cart: {
        type: Schema.Types.ObjectId,
        ref: "carts"
    },


})


userSchema.plugin(paginate)

const userModel = model("users", userSchema)

export default userModel