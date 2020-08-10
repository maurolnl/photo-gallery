import { Schema, model } from "mongoose";
import { PhotoSchema } from "./Photo";
import { IUser } from "./IUser";

const UserSchema = new Schema({
   firstName: String,
   lastName: String,
   images: [PhotoSchema]
})

export default model<IUser>('User', UserSchema);