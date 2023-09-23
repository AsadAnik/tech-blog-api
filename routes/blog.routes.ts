import { Router } from 'express';
import BlogController from '../controllers/blog.controller';

const router = Router();

/**
 * ==== Blog Routes ====
 */
router.get('/', BlogController.allBlogs)
    .post('/', BlogController.createBlog)
    .get('/:blogId', BlogController.blogById)
    .put('/:blogId', BlogController.updateBlog)
    .delete('/:blogId', BlogController.deleteBlog);


export default router;
