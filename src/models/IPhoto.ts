import { Document } from "mongoose";

export interface IPhoto extends Document{
  title: string;
  description: string;
  imagePath: string;
}
