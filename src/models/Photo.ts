import { Schema, model } from "mongoose";
import {IPhoto} from "./IPhoto";

export const PhotoSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String},
  imagePath: {type:String, required: true},
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});


export default model<IPhoto>('Photo', PhotoSchema);