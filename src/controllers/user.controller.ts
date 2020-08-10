import { Request, Response } from "express";

import User from "@models/User";

export async function createUser(req: Request, res: Response):Promise<Response>{
  try {
   const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName
   }

   const user = new User(newUser);
   await user.save();

   return res.json({
      "message": "User successfully saved",
      user
   })
  } catch (error) {
     return res.json({
        "error": error
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
   return
}

export async function deleteUser(req: Request, res: Response):Promise<Response>{
   return
}

export async function getUserById(req: Request, res: Response):Promise<Response>{
   return
}