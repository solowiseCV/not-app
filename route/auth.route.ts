import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../middleware/validAuth.middleware';
import { isAuthenticatedUser } from '../middleware/auth.middleware';

const router = Router();

router.post('/register',validateRegister, register);
router.post('/login', validateLogin, login);

export default router;