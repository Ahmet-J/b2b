import * as express from 'express';
import {   getallorders,  neworder , updateorder, deleteorder, getone , removeorder, restoreorder,  trashorder} from '../controllers/ordercontroller';


const router = express.Router();

router.get('/all' ,   getallorders)
router.post('/new' ,  neworder  )
router.put('/edit/:id' ,   updateorder)
router.delete('/delete/:id' , deleteorder)
router.get('/one/:id' ,getone)
router.get('/trash' ,   trashorder)
router.put('/remove/:id' ,  removeorder)
router.put('/restore/:id' , restoreorder)
export default router;