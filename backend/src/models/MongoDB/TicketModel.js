import { Schema,model } from 'mongoose'

const ticketSchema = new Schema({
    code:{type:String,require:true,index:true,unique:true},
    purchase_datetime:{type:Date},
    amount:{type:Number},
    purchaser:{type:String},
})

const ticketModel = model("tickets", ticketSchema)

export default ticketModel