import { Router } from 'express';
import UserController from '../controllers/user.controller';
const router = Router();

/**
 * ==== Get All Users ====
 */
router.get('/users', UserController.getUsers);

/**
 * ==== Login Route ====
 */
router.get('/check', UserController.userCheck);

/**
 * ==== Logout Route ====
 */
router.get('/logout', UserController.logout);


/**
 * ==== Get User ====
 */
router.get('/:id', UserController.getUser)
    .put('/', UserController.updateProfile);


export default router;
