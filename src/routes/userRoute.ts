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
import { TokenVerification } from "../libs/verifyToken";

router.route('/')
  .get(getUsers)

router.route('/:id')
  .delete(deleteUser)
  .put(updateUserPhotos)

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', TokenVerification, profile);

export default router;