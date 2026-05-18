import * as express from 'express';
import { uploadSingle, uploadMultiple } from '../controllers/uploadController';
import { upload } from '../middlewares/upload';


const router = express.Router();

router.post('/single', upload.single('image'), uploadSingle);
router.post('/multiple', upload.array('images', 10), uploadMultiple);
export default router;