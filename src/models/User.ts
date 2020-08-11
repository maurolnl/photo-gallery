import { Schema, model } from "mongoose";
import { PhotoSchema } from "./Photo";

const UserSchema = new Schema({
   firstName: {type: String, required: true},
   lastName: {type: String, required: true},
   images: [{
      type: Schema.Types.ObjectId,
      ref: 'Photo'
   }]
})

export default model('User', UserSchema);