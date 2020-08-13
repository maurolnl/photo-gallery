import { Document } from "mongoose";

export interface IUser extends Document {
   userName: string,
   email: string,
   password: string,
   encryptPassword(password: string): Promise<string>;
   validatePassword(password: string): Promise<boolean>;
}