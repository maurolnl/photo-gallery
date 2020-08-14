import {
  Request,
  Response,
} from "express";

import Photo from "@models/Photo";
import {IPhoto} from "@models/IPhoto";
import path from "path";
import fs from 'fs-extra';

//Get mapping -> get all photos
export const getPhotos = async(
  req: Request, res: Response
  ): Promise<Response>=>{

  try {
    const photos:IPhoto[] = await Photo.find();
    return res.json({
      photos
    })
  } catch (Exception) {
    return res.json({
      Exception
    })
  }

}

//GET mapping get photos by photo id
export const getPhotoById = async(
  req:Request,
  res:Response):Promise<void>=>{

  const id = req.params.id;
  const photo:IPhoto = await Photo.findById(id);
  if(photo){
    res.json({
      photo
    })
  }
  res.json({"message": "Can't find photo with the given ID"})
}

//DELETE mapping delete photo by photo id
export const deletePhotoById = async(
  req: Request, res: Response
  ):Promise<void>=>{

  const id = req.params.id;
  const photo:IPhoto = await Photo.findByIdAndRemove(id);
  
  try {
    if(photo){
      await fs.unlink(path.resolve(photo.imagePath));
      res.json({
        message: 'Photo Remove Successfully',
        photo
      });  
    }
  } catch (error) {
    res.json({error});
  }
}

//POST mapping -> create a given photo
export const createPhoto = async(
  req: Request, res: Response
  ):Promise<Response>=>{
  
  const newPhoto: IPhoto =  new Photo({
    title: req.body.title,
    description: req.body.description,
    imagePath:req.file.path 
  })

  const photo: IPhoto = new Photo(newPhoto);
  console.log(photo);
  await photo.save();

  return res.json({
    message: 'Photo successfully saved',
    photo
  });
}

//POST mapping -> update photo by photo id
export const updatePhotoById = async(
  req: Request, res: Response
  ):Promise<void>=>{

  const filter = { _id: req.params.id };
  const update: IPhoto = new Photo({ 
    title: req.body.title,
    description: req.body.description 
   });

  const updatedPhoto:IPhoto = await Photo.findOneAndUpdate(filter, update, {new: true});
  
  if(updatedPhoto){
    res.json({
      message: 'Photo Updated Successfully',
      updatedPhoto
    })
  }
  res.json({"message": "Can't find photo with the given ID"});
}