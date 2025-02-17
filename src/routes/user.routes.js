import {Router} from 'express';
import { changeCurrentPassword, 
         getCurrentUser,
         loginFarmer, 
         logoutFarmer, 
         refreshAccessToken, 
         registerFarmer } from '../controllers/user.controllers.js';
import { verifyJWT } from '../middleware/verifyJWT.middleware.js';

const router = Router();

router.route("/register").post(registerFarmer);
router.route("/login").post(loginFarmer);
router.route("/logout").post(verifyJWT,logoutFarmer);
router.route("/change-password").post(verifyJWT,changeCurrentPassword);
router.route("/current-user").get(verifyJWT,getCurrentUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router