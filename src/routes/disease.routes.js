import {Router} from 'express';
import { verifyJWT } from '../middleware/verifyJWT.middleware.js';
import { upload } from '../middleware/multer.middleware.js';
import { diseaseML } from '../controllers/disease.controllers.js';

const router = Router();

router.route("/upload-image").post(verifyJWT,upload.fields([
    {
        name: "Image-1",
        maxCount: 1
    },
    {
        name : "Image-2",
        maxCount: 1
    }
]),diseaseML)

export default router