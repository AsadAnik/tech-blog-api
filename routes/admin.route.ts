import { Router } from 'express';
import AdminController from '../controllers/admin.controller';
const router = Router();

/**
 * ==== Admin Routes ====
 */
router.get('/blogs', AdminController.getBlogs)
    .get('/blog/:blogId', AdminController.getBlog)
    .post('/blog', AdminController.createBlog)
    .put('/blog/:blogId', AdminController.updateBlog)
    .delete('/blog/:blogId', AdminController.deleteBlog)
    .patch('/blog/change-approval/:blogId', AdminController.changeBlogApprovement)
    .patch('/blog/change-status/:blogId', AdminController.changeBlogStatus)
    .patch('/user/change-role/:userId', AdminController.changeUserRole);

export default router;
        