import * as express from 'express';
import { getAllSuppliers , createsupplier, updatingSup ,  deletingSup , getOneSup , removingSup , restoringSupplier , trashSupplier} from '../controllers/suppliercontroller';


const router = express.Router();

router.get('/all' , getAllSuppliers)
router.post('/new' ,createsupplier)
router.put('/edit/:id' ,  updatingSup)
router.delete('/delete/:id' ,  deletingSup)
router.get('/one/:id' ,getOneSup )
router.get('/trash' , trashSupplier )
router.put('/remove/:id' , removingSup)
router.put('/restore/:id' , restoringSupplier)
export default router;