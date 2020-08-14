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
  .get(TokenVerification, getUsers)

router.route('/:id')
  .delete(TokenVerification, deleteUser)
  .put(TokenVerification, updateUserPhotos)

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', TokenVerification, profile);

export default router;