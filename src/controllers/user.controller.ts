import { Request, Response } from "express";

import User from "@models/User";

export async function createUser(req: Request, res: Response):Promise<Response>{
  try {
   const newUser = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
   }

   const user = new User(newUser);
   await user.save();

   return res.json({
      "message": "User successfully saved",
      user
   })
  } catch (error) {
     return res.json({
        error
     })
  } 
}

export async function getUsers(req: Request, res: Response):Promise<Response>{
   try {
      const users = await User.find();

      return res.json({
         users
      })
   } catch (error) {
      return res.json({
         "error": error
      })
   }
}

export async function updateUserById(req: Request, res: Response):Promise<Response>{
   try {
      const filter = {_id: req.params.id};
      const update = {
         userName: req.body.userName,
         password: req.body.password
      };
      const updatedUser = await User.findByIdAndUpdate(filter, update, {new:true});

      res.json({
         "message": "User updated Successfully",
         updatedUser
      })
   } catch (error) {
      res.json({error})
   }
   return
}

export async function deleteUser(req: Request, res: Response):Promise<Response>{
   try {
      const id = req.params.id;
      const deletedUser = await User.findByIdAndDelete(id);
      
      res.json({
         "message": "User deleted successfully",
         deletedUser
      })
   } catch (error) {
      error
   }
   return

}
