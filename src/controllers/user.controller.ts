import { Request, Response, response } from "express";
import jwt from "jsonwebtoken";
 
import User from "@models/User";
import {IUser} from "@models/IUser";

export const signUp = async(
   req: Request, res: Response
   ):Promise<void> => {
      
   //create data object
   const newUser: IUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
   });

   //Encrypt password
   newUser.password = await newUser.encryptPassword(newUser.password);

   //save new user in db
   const user: IUser = new User(newUser);
   await user.save();

   //token
   const token: string = jwt.sign(
      {_id: user._id}, process.env.TOKEN_SECRET || 'othertoken'
   );

   res.header('auth-token', token).json({
      "message": "User successfully saved",
      user 
   })
   
}

export const signIn = async(
   req:Request, res: Response
   ):Promise<Response> =>{
   const user: IUser = await User.findOne({email: req.body.email});
   if(!user) return res.status(400).json('Email or Password is wrong');

   const isValidPw: boolean = await user.validatePassword(req.body.password);
   if(!isValidPw) return res.status(400).json('Invalid Password');

   const token: string = jwt.sign(
      { _id: user.id }, process.env.TOKEN_SECRET || 'othertoken'
   );
   res.header('auth-token', token).json(user);
}

export const profile = async (
   req:Request, res: Response
   ):Promise<Response>=>{
  
   const user: IUser = await User.findById(req.userId, { password: 0 });
   if(!user) return res.status(404).json('UserId not found.');

   return res.json(user);
}

export const getUsers = async(
   req: Request, res: Response
   ):Promise<Response>=>{

   try {
      const users: IUser[] = await User.find().populate(
         'images', 'title description imagePath -_id'
      );
      
      return res.json({
         users
      })
   } catch (error) {
      return res.json({
         "error": error
      })
   }
}

export const updateUserPhotos = async(
   req: Request, res: Response
   ):Promise<void>=>{

   try {
      const { id } = req.params;
      
      const updatedUser:IUser = await User.findByIdAndUpdate(id, req.body, {new:true});
      if(updatedUser){
         res.json({
            "message": "User updated Successfully",
            updatedUser
         })
      }
      res.json({"message": "Can't find user Id"});
   } catch (error) {
      res.json({error})
   }
}

export const deleteUser = async(
   req: Request, res: Response
   ):Promise<void>=>{

   try {
      const id = req.params.id;
      const deletedUser: IUser = await User.findByIdAndDelete(id);
      if(deletedUser){
         res.json({
            "message": "User deleted successfully",
            deletedUser
         })
      }
      res.json({"message": "Can't find the user with the given ID"})
   } catch (error) {
      error
   }
}
