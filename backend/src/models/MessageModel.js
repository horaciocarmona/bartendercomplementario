import { Schema,model } from 'mongoose'
const messageSchema = new Schema({
  name: { type: String, require: true, max: 50 },
  email: { type: String, require: true, max: 50 },
  message: { type: String, require: true, max: 250 },
});

const messageModel = model("Messages", messageSchema)

export default messageModel