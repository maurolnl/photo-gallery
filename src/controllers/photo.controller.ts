import { Request, Response, RequestParamHandler } from "express";
import Photo from "@models/Photo";
import path from "path";
import fs from 'fs-extra';

export async function getPhotos(req: Request, res: Response): Promise<Response>{
  try {
    const photos = await Photo.find();
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
  res:Response):Promise<Response>{
  const id = req.params.id;
  const photo = await Photo.findById(id);
  return res.json({
    photo
  })

}

export async function deletePhotoById(req: Request, res: Response):Promise<Response>{
  const id = req.params.id;
  const photo = await Photo.findByIdAndRemove(id);

  try {
    if(photo){
      await fs.unlink(path.resolve(photo.imagePath));
    }
  } catch (error) {
    throw new Error(error);
  }
  

  return res.json({
    message: 'Photo Remove Successfully',
    photo
  });

}

export async function createPhoto(req: Request, res: Response):Promise<Response>{
  
  const newPhoto = {
    title: req.body.title,
    description: req.body.description,
    imagePath:req.file.path 
  } 

  const photo = new Photo(newPhoto);
  console.log(photo);
  await photo.save();

  return res.json({
    message: 'Photo successfully saved',
    photo
  });
}

export async function updatePhotoById(req: Request, res: Response):Promise<Response>{
  const filter = { _id: req.params.id };
  const update = { 
    title: req.body.title,
    description: req.body.description 
   };

  const updatedPhoto = await Photo.findOneAndUpdate(filter, update, {new: true});

  return res.json({
    message: 'Photo Updated Successfully',
    updatedPhoto
  })
}