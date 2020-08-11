import { Schema, model } from "mongoose";

export const PhotoSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String},
  imagePath: {type: String, required: true, unique: true, lowercase: true}
});


export default model('Photo', PhotoSchema);