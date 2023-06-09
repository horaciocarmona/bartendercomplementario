import { DataTypes } from 'sequelize'
import db from "../../db/sequelize.js"

const messageModel = db.define('Messages',{
  name: { type: DataTypes.STRING(50), allowNull:false },
  email: { type: DataTypes.STRING(50), allowNull:false },
  message: { type: DataTypes.STRING(250), allowNull:false },
});

export default messageModel