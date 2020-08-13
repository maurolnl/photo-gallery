import { Router } from "express";

import {
   signIn,
   signUp,
   profile
  } from "@controllers/auth.controllers";

const router: Router = Router();

router.route('/auth')
   .post(signUp)
   .get(signIn)
   .get(profile)

export default router;