import { Router } from "express";
const router: Router = Router();

import { 
  createPhoto,
  getPhotos,
  getPhotoById,
  deletePhotoById,
  updatePhotoById
} from "../controllers/photo.controller";

import {
  createUser,
  getUsers,
  updateUserPhotos,
  deleteUser,
} from "../controllers/user.controller";

import multer from "../libs/multer";

router.route('/')
  .post(multer.single('image'), createPhoto)
  .get(getPhotos)

router.route('/:id')
  .get(getPhotoById)
  .delete(deletePhotoById)
  .put(updatePhotoById)
 
export default router;