import { Router } from "express";
const router: Router = Router();

import {
  signUp,
  signIn,
  profile,
  getUsers,
  updateUserPhotos,
  deleteUser,
} from "../controllers/user.controller";

router.route('/')
  .get(getUsers)

router.route('/:id')
  .delete(deleteUser)
  .put(updateUserPhotos)

router.post('/signup', signUp);
router.post('/signIn', signIn);
router.post('/profile', profile);

export default router;