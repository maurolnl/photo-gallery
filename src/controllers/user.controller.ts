import { Request, Response, response } from "express";
import jwt from "jsonwebtoken";
 
import User from "@models/User";
import {IUser} from "@models/IUser";

//POST mapping -> sign up a user and generate token
export const signUp = async(
   req: Request, res: Response
   ):Promise<Response> => {
      
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

   return res.header('auth-token', token).json({
      "message": "User successfully saved",
      user 
   })
   
}

//POST mapping -> sign in a user and get token
export const signIn = async(
   req:Request, res: Response
   ):Promise<Response> =>{

   //find user account and check if exists
   const user: IUser = await User.findOne({email: req.body.email});
   if(!user) return res.status(400).json('Email or Password is wrong');

   //Validate password
   const isValidPw: boolean = await user.validatePassword(req.body.password);
   if(!isValidPw) return res.status(400).json('Invalid Password');
   
   //get session token
   const token: string = jwt.sign(
      { _id: user.id }, process.env.TOKEN_SECRET || 'othertoken'
   );
   return res.header('auth-token', token).json(user);
}

//GET mapping -> Return session profile 
export const profile = async (
   req:Request, res: Response
   ):Promise<Response>=>{
  
   //find user by token id
   const user: IUser = await User.findById(req.userId, { password: 0 });
   if(!user) return res.status(404).json('User ID not found.');

   return res.json(user);
}

//GET mapping -> Return all users 
export const getUsers = async(
   req: Request, res: Response
   ):Promise<Response>=>{

   const users: IUser[] = await User.find();
   
   return res.json({
      users
   })
   
   }

//POST mapping -> update user
export const updateUserPhotos = async(
   req: Request, res: Response
   ):Promise<Response>=>{

   const { id } = req.params;
   const updatedUser: IUser = await User.findByIdAndUpdate(id, req.body, {new:true});

   if(!updatedUser) return res.status(404).json('User ID not found');
   
   return res.json({
      "message": "User updated Successfully",
      updatedUser
   })
}

//DELETE mapping -> deletes user by ID
export const deleteUser = async(
   req: Request, res: Response
   ):Promise<Response>=>{

   const id = req.params.id;
   const deletedUser: IUser = await User.findByIdAndDelete(id);
   
   if(!deletedUser) return res.status(404).json('User ID not found');

   return res.json({
      "message": "User deleted successfully",
      deletedUser
   });
}
