import * as express from 'express';
import { getAllinquiries ,creatinginquiries,  updatinginquiry ,  deletinginquiry , getOneinquiry,  removinginquiry, restoringinquiry , trashinquiry} from '../controllers/inquiryController';


const router = express.Router();

router.get('/all' , getAllinquiries)
router.post('/new' ,  creatinginquiries)
router.put('/edit/:id' ,  updatinginquiry )
router.delete('/delete/:id' ,  deletinginquiry)
router.get('/one/:id' , getOneinquiry)
router.get('/trash' , trashinquiry)
router.put('/remove/:id' ,  removinginquiry )
router.put('/restore/:id' , restoringinquiry)
export default router;