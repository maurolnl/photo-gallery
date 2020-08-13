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

router.route('/photos')
  .post(multer.single('image'), createPhoto)
  .get(getPhotos)

router.route('/photos/:id')
  .get(getPhotoById)
  .delete(deletePhotoById)
  .put(updatePhotoById)

router.route('/users')
  .post(createUser)
  .get(getUsers)

router.route('/users/:id')
  .delete(deleteUser)
  .put(updateUserPhotos)
  
export default router;