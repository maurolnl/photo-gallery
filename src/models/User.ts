import { Schema, model } from "mongoose";
import { PhotoSchema } from "./Photo";

const UserSchema = new Schema({
   userName:{type: String, required: true, lowercase: true},
   email:{type: String, required:true, unique: true},
   password:{type: String, required:true, unique: true},
   images: [{
      type: Schema.Types.ObjectId,
      ref: 'Photo'
   }]
})

export default model('User', UserSchema);