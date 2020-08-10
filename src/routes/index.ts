import { Router } from "express";
const router = Router();

import { createPhoto, getPhotos, getPhotoById, deletePhotoById, updatePhotoById} from "../controllers/photo.controller";
import multer from "../libs/multer";

router.route('/photos')
  .post(multer.single('image'), createPhoto)
  .get(getPhotos)

router.route('/photos/:id')
  .get(getPhotoById)
  .delete(deletePhotoById)
  .put(updatePhotoById)

export default router;