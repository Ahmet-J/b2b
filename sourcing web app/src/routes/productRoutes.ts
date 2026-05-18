import * as express from 'express';
import {  getallproducts, newproduct, updateproduct ,deleteproduct , getoneproduct, removeproduct , restoreproduct, trashproduct } from '../controllers/productcontroller';
import { upload } from '../middlewares/upload';


const router = express.Router();

router.get('/all' ,   getallproducts)
router.post('/new' ,  upload.array('images', 5), newproduct )
router.put('/edit/:id' ,   updateproduct)
router.delete('/delete/:id' , deleteproduct)
router.get('/one/:id' ,getoneproduct)
router.get('/trash' ,  trashproduct )
router.put('/remove/:id' ,  removeproduct)
router.put('/restore/:id' , restoreproduct)
export default router;