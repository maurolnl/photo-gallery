import { Document } from "mongoose";
import { IUser } from "./IUser";

export interface IPhoto extends Document{
   title: string,
   description: string, 
   imagePath: string,
   author: IUser['_id']
}