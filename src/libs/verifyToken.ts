import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {IPayload} from "./IPayload";

export const TokenVerification = (
   req: Request,
   res: Response,
   next: NextFunction) => {
   const token = req.header('auth-token');
   if(!token) return res.status(401).json('Access denied');

   const payload = jwt.verify(
      token, process.env.TOKEN_SECRET || 'othertoken'
   ) as IPayload;

   req.userId = payload._id;
   next();
}