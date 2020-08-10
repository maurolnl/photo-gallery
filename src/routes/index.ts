import { Router } from "express";
const router = Router();

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
  updateUserById,
  deleteUser,
  getUserById
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
  .put(updateUserById)    
  .delete(deleteUser)
  .get(getUserById)

export default router;