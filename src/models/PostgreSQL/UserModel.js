import paginate from "mongoose-paginate-v2"
import { DataTypes } from 'sequelize'
import db from "../../db/sequelize.js"

const userModel = db.define('Users',{
    first_name: {
        type: DataTypes.STRING(100),
        allowNull:false
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull:false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull:false,
        index: true
    },
    age: {
        type: DataTypes.NUMBER,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull:false
    },
    rol: {
        type: DataTypes.STRING(100),
        default: "User"
    },
    id_Cart: {
        type: DataTypes.Types.ObjectId,
        ref: "carts"
    },
})


userModel.plugin(paginate)


export default userModel