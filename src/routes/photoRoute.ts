import { Router } from "express";
const router: Router = Router();

import { 
  createPhoto,
  getPhotos,
  getPhotoById,
  deletePhotoById,
  updatePhotoById
} from "../controllers/photo.controller";

import multer from "../libs/multer";
import { TokenVerification } from "src/libs/verifyToken";

router.route('/')
  .post(multer.single('image'), TokenVerification, createPhoto)
  .get(getPhotos)

router.route('/:id')
  .get(getPhotoById)
  .delete(TokenVerification, deletePhotoById)
  .put(TokenVerification,updatePhotoById)
 
export default router;