import {Router} from 'express';
import { verifyJWT } from '../middleware/verifyJWT.middleware.js';
import { listProducts } from '../controllers/market.controllers.js';

const router = Router();

router.route("/products").get(listProducts);
// router.route("/add-to-cart").post(verifyJWT,)


export default router