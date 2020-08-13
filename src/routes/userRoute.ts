import { Router } from "express";
const router: Router = Router();

import {
  createUser,
  getUsers,
  updateUserPhotos,
  deleteUser,
} from "../controllers/user.controller";

router.route('/')
  .post(createUser)
  .get(getUsers)

router.route('/:id')
  .delete(deleteUser)
  .put(updateUserPhotos)

export default router;