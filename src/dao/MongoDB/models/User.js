import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema} from "mongoose";

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

export class ManagerUserMongoDB extends ManagerMongoDB {
    constructor() {
        super("mongodb+srv://horaciocarmona:h21163ho@cluster0.z8ctovc.mongodb.net/ecommerce?retryWrites=true&w=majority", "users", userSchema)
    }
    async getElementByEmail(email) {
        super.setConnection()
        try {
            // return await this.model.findOne({ email: email })
            return await this.model.findOne({ email: email })
            // if (!user){
            //     throw new Error('el ususario no exite')
            // }
        } catch (error) {
            return error
        }
    }


}

