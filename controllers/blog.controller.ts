import { Request, Response, NextFunction } from 'express';
import catchAsyncErrorHandle from "../middleware/catchAsyncErrors";
import { ControllerFunction } from '../common/types';
import BlogService from '../services/blog.service';


class BlogController {
    /**
     * ---- Like Blog ----
     */
    static likeABlog: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request | any,
        res: Response
    ) => {
        const { userId } = req?.user;
        const { blogId } = req?.params;

        const blog = await BlogService.likeBlog(userId, blogId);
        if (!blog) return res.status(403).json({
            success: false,
            message: 'Can not like this blog!',
        });

        res.status(200).json({
            success: true,
            message: 'Liked the blog',
            blog,
        });
    });

    /**
     * ---- Dislike Blog ----
     */
    static dislikeABlog: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request | any,
        res: Response
    ) => {
        const { userId } = req?.user;
        const { blogId } = req?.params;

        const blog = await BlogService.dislikeBlog(userId, blogId);
        if (!blog) return res.status(403).json({
            success: false,
            message: 'Can not dislike this blog!',
        });

        res.status(200).json({
            success: true,
            message: 'Disliked the blog',
            blog,
        });        
    });

    /**
     * ---- Blogs By Author ----
     */
    static blogsByAuthor: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request,
        res: Response
    ) => {
        const { userId } = req.params;

        const blogs = await BlogService.getBlogsByAuthor(userId);
        if (!blogs) return res.status(404).json({
            success: false,
            message: 'No Blogs',
        });

        res.status(200).json({
            success: true,
            blogs,
        });
    });

    /**
     * ---- Delete Blog ----
     */
    static deleteBlog: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request,
        res: Response,
    ) => {
        const { blogId } = req.params;

        const deletedBlog = await BlogService.deleteBlog(blogId);
        if (!deletedBlog) return res.status(400).json({
            success: false,
            message: 'Blog can not be Delete',
        });

        res.status(200).json({
            success: true,
            message: 'Blog Deleted Successfully',
            deletedBlog
        });
    });

    /**
     * ---- Update Blog ----
     */
    static updateBlog: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request | any,
        res: Response,
        _next: NextFunction
    ) => {
        const { blogId } = req.params;
        const newBlog = req.body;

        const updatedBlog = await BlogService.updateBlog(blogId, newBlog);
        if (!updatedBlog) return res.status(400).json({
            success: false,
            message: 'Blog Can\'t Update!',
        });

        res.status(200).json({
            success: true,
            message: 'Blog Successfully Updated',
            updatedBlog
        });
    });

    /**
     * ---- Get Blog By Id ----
     */
    static blogById: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request | any,
        res: Response,
        _next: NextFunction
    ) => {
        const { blogId } = req.params;
        const blog = await BlogService.getBlog(blogId);
        if (!blog) return res.status(404).json({
            success: false,
            message: 'Blog post not found'
        });

        res.status(200).json({
            success: true,
            message: 'Blog is fetched successfully',
            blog
        });
    });

    /**
     * ---- See All Blogs ----
     */
    static allBlogs: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request | any,
        res: Response,
        _next: NextFunction
    ) => {

        const { search, category, page = 1, limit = 10 } = req.query;
        const blogs = await BlogService.getBlogs(search, category, page, limit);
        if (!blogs) return res.status(401).json({
            success: false,
            message: 'No Blogs',
        });

        res.status(200).json({
            success: true,
            blogs,
        });
    });

    /**
     * ---- Create Blog ----
     */
    static createBlog: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request | any,
        res: Response,
        _next: NextFunction
    ) => {
        const userBlog = req.body;
        const { userId } = req?.user;
        const avatar = req?.file;
        const coverAvatarPath = avatar?.path;

        const blog = await BlogService.createBlog({ ...userBlog, cover: coverAvatarPath, author: userId });
        if (!blog) return res.status(400).json({
            succes: false,
            message: 'Can not create Blog!',
        });

        res.status(200).json({
            success: true,
            message: 'Blog Successfully Created!',
            blog
        });
    });
}

export default BlogController;