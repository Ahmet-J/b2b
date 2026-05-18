import * as express from 'express';
import {  updatingsetting} from '../controllers/settingcontroller';


const router = express.Router();


router.put('/edit/:id' ,  updatingsetting  )

export default router;