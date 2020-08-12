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
      const users = await User.find().populate('images', 'title description imagePath -_id');
      
      return res.json({
         users
      })
   } catch (error) {
      return res.json({
         "error": error
      })
   }
}

export async function updateUserPhotos(req: Request, res: Response):Promise<void>{
   try {
      const { id } = req.params;
      
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {new:true});
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

export async function deleteUser(req: Request, res: Response):Promise<void>{
   try {
      const id = req.params.id;
      const deletedUser = await User.findByIdAndDelete(id);
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
