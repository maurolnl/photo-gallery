import { Router } from "express";

import {
   signIn,
   signUp,
   profile
  } from "@controllers/auth.controllers";

const authRoutes: Router = Router();

authRoutes.route('/auth')
   .post(signUp)
   .get(signIn)
   .get(profile)

export default auth;