import { Schema, model } from "mongoose";
import { IPhoto } from "./IPhoto";

export const PhotoSchema = new Schema({
  title: String,
  description: String,
  imagePath: String
});


export default model<IPhoto>('Photo', PhotoSchema);