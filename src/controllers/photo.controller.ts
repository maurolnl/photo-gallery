import {
  Request,
  Response,
} from "express";

import Photo from "@models/Photo";
import {IPhoto} from "@models/IPhoto";
import path from "path";
import fs from 'fs-extra';

export async function getPhotos(req: Request, res: Response): Promise<Response>{
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

export async function getPhotoById(
  req:Request,
  res:Response):Promise<void>{
  const id = req.params.id;
  const photo:IPhoto = await Photo.findById(id);
  if(photo){
    res.json({
      photo
    })
  }
  res.json({"message": "Can't find photo with the given ID"})
}

export async function deletePhotoById(req: Request, res: Response):Promise<void>{
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

export async function createPhoto(req: Request, res: Response):Promise<Response>{
  
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

export async function updatePhotoById(req: Request, res: Response):Promise<void>{
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