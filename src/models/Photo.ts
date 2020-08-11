import { Schema, model, Document } from "mongoose";
import {IPhoto} from "./IPhoto";

export const PhotoSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String},
  imagePath: {type:String, required: true}
});


export default model<IPhoto>('Photo', PhotoSchema);