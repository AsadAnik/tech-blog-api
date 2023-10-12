import { Router } from 'express';
import BlogController from '../controllers/blog.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

/**
 * ==== Blog Routes ====
 */
router.get('/', BlogController.allBlogs)
    .get('/:blogId', BlogController.blogById)
    .post('/', authenticateToken, BlogController.createBlog)
    .post('/:blogId/like', authenticateToken, BlogController.likeABlog)
    .post('/:blogId/dislike', authenticateToken, BlogController.dislikeABlog)
    .get('/author/:userId', BlogController.blogsByAuthor)
    .put('/:blogId', authenticateToken, BlogController.updateBlog)
    .delete('/:blogId', authenticateToken, BlogController.deleteBlog);


export default router;
