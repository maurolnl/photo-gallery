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

    const photos:IPhoto[] = await Photo.find().populate(
      'author', 'userName -_id'
    );
    
    return res.json({photos});
}

//GET mapping -> get photos by ID
export const getPhotoById = async(
  req:Request,
  res:Response):Promise<Response>=>{

  const id = req.params.id;
  const photo:IPhoto = await Photo.findById(id).populate(
    'author', 'userName -_id'
  );
  
  if(!photo) return res.status(404).json('Photo ID not found');

  return res.json(photo);
}

//DELETE mapping -> delete photo ID
export const deletePhotoById = async(
  req: Request, res: Response
  ):Promise<Response>=>{

  const photoControl:IPhoto = await Photo.findById(req.params.id);

  //Checks
  if(req.userId != photoControl.author) return res.status(403).json(
    'You cant update an image that you dont own'
  );
  if(!photoControl) return res.status(404).json('Photo ID not found');

  const id = req.params.id;
  const photo:IPhoto = await Photo.findByIdAndRemove(id);

  //Delete photo from disk
  await fs.unlink(path.resolve(photo.imagePath));
  return res.json({
    message: 'Photo Remove Successfully',
    photo
  });  

}

//POST mapping -> create a given photo
export const createPhoto = async(
  req: Request, res: Response
  ):Promise<Response>=>{
 
  //Create data object
  const newPhoto: IPhoto =  new Photo({
    title: req.body.title,
    description: req.body.description,
    imagePath:req.file.path,
    author: req.userId
  })

  const photo: IPhoto = new Photo(newPhoto);
  await photo.save();
 
  return res.json({
    message: 'Photo successfully saved',
    photo
  });
}

//POST mapping -> update photo by photo id
export const updatePhotoById = async(
  req: Request, res: Response
  ):Promise<Response>=>{

  const photo:IPhoto = await Photo.findById(req.params.id);
  if(req.userId != photo.author) return res.status(403).json(
    'You cant update an image that you dont own'
  );
  
  const { id } = req.params;
  const updatedPhoto:IPhoto = await Photo.findByIdAndUpdate(
    id, req.body, {new: true}
  );
 
  if(!updatedPhoto) return res.status(404).json('Photo ID not found');
  
  return res.json({
    message: 'Photo Updated Successfully',
    updatedPhoto
  });
}