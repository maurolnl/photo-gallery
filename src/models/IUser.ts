import { Document } from "mongoose";
import { PhotoSchema } from "./Photo";

export interface IUser extends Document{
   firstName: string,
   lastName: string, 
   images: typeof PhotoSchema[]
}