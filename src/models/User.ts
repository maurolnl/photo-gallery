import { Schema, model } from "mongoose";
import { IUser } from "./IUser";
import bcryptjs from "bcryptjs";

const UserSchema = new Schema({
   userName:{type: String, required: true, lowercase: true},
   email:{type: String, required:true, unique: true, lowercase: true},
   password:{type: String, required:true},
})

//Encrypt password with bcryptjs lib  
UserSchema.methods.encryptPassword = async (
   password: string
   ): Promise<string> =>{
   const salt = await bcryptjs.genSalt(10);
   
   return bcryptjs.hash(password, salt);
};

//Validate pw with bcryptjs lib
UserSchema.methods.validatePassword = async function(
   password:string
   ):Promise<boolean> {
      return await bcryptjs.compare(password, this.password);
   }
export default model<IUser>('User', UserSchema);