import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
const router = Router();


/**
 * ==== Login Route ====
 */
router.post('/login', AuthController.login);

/**
 * ==== Register Route ====
 */
router.post('/register', AuthController.register);


export default router;