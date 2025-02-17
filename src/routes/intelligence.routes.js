import {Router} from 'express';
import { verifyJWT } from '../middleware/verifyJWT.middleware.js';
import { weatherKnowledge } from '../controllers/weather.controllers.js';

const router = Router();

router.route("/weather-data").post(weatherKnowledge);
router.route("/market-data").get()


export default router