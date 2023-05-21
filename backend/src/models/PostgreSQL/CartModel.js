import paginate from "mongoose-paginate-v2"
import { DataTypes } from 'sequelize'
import db from "../../db/sequelize.js"

const cartModel = db.define('Carts',
{
  id: { type: DataTypes.NUMBER, allowNull:false },
  products: { type: DataTypes.ARRAY, default: [] },
});

cartModel.plugin(paginate)

export default cartModel