import { Request, Response, NextFunction } from 'express';
import catchAsyncErrorHandle from "../middleware/catchAsyncErrors";
import { ControllerFunction } from '../common/types';
import UserService from '../services/user.service';
import BlogService from '../services/blog.service';
import CategoryService from '../services/category.service';


class AdminController {
    /**
     * ---- Get Blogs ----
     */
    static getBlogs: ControllerFunction = catchAsyncErrorHandle(async (
        _req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        const blogs = await BlogService.getAllBlogs();
        if (!blogs) return res.status(404).json({
            success: false,
            message: 'No Blogs'
        });

        res.status(200).json({
            success: true,
            message: "Blogs Successfully Fetched",
            blogs
        });
    });

    
    /**
     * ---- Get Blog ----
     */
    static getBlog: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        const { blogId } = req.params;
        if (!blogId) return res.status(401).json({
            success: false,
            message: 'BlogId Not Given, Try Again',
        });

        const blog = await BlogService.getBlog(blogId);
        if (!blog) return res.status(404).json({
            success: false,
            message: 'No Blog Found',
        });

        res.status(200).json({
            success: true,
            message: "Blog Fetched",
            blog
        });
    });


    /**
     * ---- Create Blog ----
     */
    static createBlog: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        const blog = req.body;
        const createdBlog = await BlogService.createBlog(blog);
        if (!createdBlog) return res.status(403).json({
            success: false,
            message: 'Can not create blog!',
        });

        res.status(200).json({
            success: true,
            message: "Created blog successfully",
            createdBlog
        });
    });


    /**
     * ---- Update Blog ----
     */
    static updateBlog: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        const { blogId } = req.params;
        const updatedData = req.body;

        if (!blogId) return res.status(401).json({
            success: false,
            message: 'BlogId Not Given, Try Again',
        });

        const updatedBlog = await BlogService.updateBlog(blogId, updatedData);
        if (!updatedBlog) return res.status(401).json({
            success: false,
            message: 'Can not Update Blog!',
        });

        res.status(200).json({
            success: true,
            message: "Blog Updated Successfully",
            updatedBlog
        });
    });


    /**
     * ---- Delete Blog ----
     */
    static deleteBlog: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        const { blogId } = req.params;

        if (!blogId) return res.status(401).json({
            success: false,
            message: 'BlogId Not Given, Try Again',
        });

        const deletedBlog = await BlogService.deleteBlog(blogId);
        if (!deletedBlog) return res.status(401).json({
            success: false,
            message: 'Can not Delete Blog!',
        });

        res.status(200).json({
            success: true,
            message: 'Deleted Blog Successfully',
            deletedBlog
        });
    });


    /**
     * ---- Change Blog Approvement ----
     */
    static changeBlogApprovement: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request,
        res: Response,
    ) => {
        const { blogId } = req.params;
        const { approved } = req.body;

        if (!blogId) return res.status(401).json({
            success: false,
            message: 'BlogId Not Given, Try Again',
        });

        const blogApproved = await BlogService.changeBlogApprovement(blogId, approved);
        if (!blogApproved) return res.status(401).json({
            success: false,
            message: 'Can not change the approval of blog post!'
        });

        res.status(200).json({
            success: true,
            message: `Changed the Blog Approval to : ${approved}`,
            blogApproved
        });
    });


    /**
    * ---- Change Blog Status ----
    **/
    static changeBlogStatus: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request,
        res: Response,
    ) => {
        const { blogId } = req.params;
        const { status } = req.body;

        if (!blogId) return res.status(401).json({
            success: false,
            message: 'BlogId Not Given, Try Again',
        });

        const blogStatus = await BlogService.changeBlogStatus(blogId, status);
        if (!blogStatus) return res.status(401).json({
            success: false,
            message: 'Can not change the status of blog post!'
        });

        res.status(200).json({
            success: true,
            message: `Changed the Blog Status to : ${status}`,
            blogStatus
        });
    });


    /**
    * ---- Change User Role ----
    **/
    static changeUserRole: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request,
        res: Response,
    ) => {
        const { userId } = req.params;
        const { role } = req.body;

        if (!userId) return res.status(401).json({
            success: false,
            message: 'UserId Not Given, Try Again',
        });

        const userRole = await UserService.changeUserRole(userId, role);
        if (!userRole) return res.status(401).json({
            success: false,
            message: 'Can not change the role of User!'
        });

        res.status(200).json({
            success: true,
            message: `Changed the User's Role to : ${role}`,
            userRole
        });
    });

     /**
     * ---- Get Categories ----
     */
     static getCates: ControllerFunction = catchAsyncErrorHandle(async (
        _req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        const cates = await CategoryService.getCates();
        if (!cates) return res.status(404).json({
            success: false,
            message: 'No Categories'
        });

        res.status(200).json({
            success: true,
            message: "Categories Successfully Fetched",
            cates
        });
    });
    
     /**
     * ---- Create Category ----
     */
     static createCate: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        const cate = req.body;
        const createdCate = await CategoryService.createCate(cate);
        if (!createdCate) return res.status(403).json({
            success: false,
            message: 'Can not create category!',
        });

        res.status(200).json({
            success: true,
            message: "Created category successfully",
            createdCate
        });
    });


    /**
     * ---- Update Blog ----
     */
    static updateCate: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        const { cateId } = req.params;
        const updatedData = req.body;

        if (!cateId) return res.status(401).json({
            success: false,
            message: 'Category ID Not Given, Try Again',
        });

        const updatedCate = await CategoryService.updateCate(cateId, updatedData);
        if (!updatedCate) return res.status(401).json({
            success: false,
            message: 'Can not Update Category!',
        });

        res.status(200).json({
            success: true,
            message: "Category Updated Successfully",
            updatedCate
        });
    });


    /**
     * ---- Delete Blog ----
     */
    static deleteCate: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        const { cateId } = req.params;

        if (!cateId) return res.status(401).json({
            success: false,
            message: 'Category ID Not Given, Try Again',
        });

        const deletedCate = await CategoryService.deleteCate(cateId);
        if (!deletedCate) return res.status(401).json({
            success: false,
            message: 'Can not Delete Category!',
        });

        res.status(200).json({
            success: true,
            message: 'Deleted Category Successfully',
            deletedCate
        });
    });
}

export default AdminController;
