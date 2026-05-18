import * as express from 'express';
import { getAllcategory , creatingcategory , updatingcategory , deletingcategory ,getOnecategory ,removingcategory, restoringCategory , trashCategory} from '../controllers/Categorycontroller';
import { upload } from '../middlewares/upload';




const router = express.Router();

router.get('/all' , getAllcategory)
router.post('/new', upload.array('images', 5), creatingcategory )
router.put('/edit/:id' , updatingcategory  )
router.delete('/delete/:id' , deletingcategory )
router.get('/one/:id' , getOnecategory)
router.get('/trash' , trashCategory)
router.put('/remove/:id' ,  removingcategory)
router.put('/restore/:id' ,restoringCategory )
export default router;