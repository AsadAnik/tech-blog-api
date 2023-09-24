import { Router } from 'express';
import BlogController from '../controllers/blog.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

/**
 * ==== Blog Routes ====
 */
router.get('/', BlogController.allBlogs)
    .post('/', authenticateToken, BlogController.createBlog)
    .get('/:blogId', BlogController.blogById)
    .put('/:blogId', authenticateToken, BlogController.updateBlog)
    .delete('/:blogId', authenticateToken, BlogController.deleteBlog);


export default router;
