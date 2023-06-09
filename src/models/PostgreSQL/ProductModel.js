import { DataTypes } from 'sequelize'
import db from "../../db/sequelize.js"

const productModel = db.define('products',{
    id:{type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title:{type:DataTypes.STRING(100),allowNull:false,index:true},
    description:{type:DataTypes.STRING(100),allowNull:false,index:true},
    price:{type:DataTypes.DOUBLE,allowNull:false},
    thumpbnail:{type:DataTypes.STRING(100),allowNull:false},
    code:{type:DataTypes.NUMBER,allowNull:false},
    stock:{type:DataTypes.INTEGER,allowNull:false},
    status:{type:DataTypes.BOOLEAN,allowNull:false},
    category:{type:DataTypes.STRING(100),
        index:true,
        allowNull:false
        // enum:['grande','mediano','chico'],
        // default:'mediano'}
    }
    
}
,{
    timestamps: false
  }
)

export default productModel