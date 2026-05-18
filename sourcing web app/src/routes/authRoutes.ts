import * as express from 'express';
import { getAllUsers , creatingUser, loginUser} from '../controllers/userController';

import { registerValidation, loginValidation, validate } from '../middlewares/validate';

const router = express.Router();
router.post('/register', registerValidation, validate, creatingUser);
router.post('/login', loginValidation, validate, loginUser);

router.get('/get',   getAllUsers); // Endpoint cusub oo loogu talagalay profile
export default router;