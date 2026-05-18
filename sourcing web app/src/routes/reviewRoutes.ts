import * as express from 'express';
import { getAllreview , creatingreview ,  updatingreview ,  deletingreview ,  getOnereview , removingreview, restoringreview , trashreview} from '../controllers/reviewController';


const router = express.Router();

router.get('/all' ,   getAllreview)
router.post('/new' , creatingreview)
router.put('/edit/:id' ,  updatingreview )
router.delete('/delete/:id' , deletingreview )
router.get('/one/:id' , getOnereview)
router.get('/trash' , trashreview)
router.put('/remove/:id' , removingreview)
router.put('/restore/:id' , restoringreview)
export default router;