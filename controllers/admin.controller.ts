import { Request, Response, NextFunction } from 'express';
import catchAsyncErrorHandle from "../middleware/catchAsyncErrors";
import { ControllerFunction } from '../common/types';
import AdminService from '../services/admin.service';


class AdminController {
    /**
     * ---- Get Blogs ----
     */
    static getBlogs: ControllerFunction = catchAsyncErrorHandle(async (
        _req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        const blogs = await AdminService.getBlogs();
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

        const blog = await AdminService.getBlog(blogId);
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
        const createdBlog = await AdminService.createBlog(blog);
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

        const updatedBlog = await AdminService.updateBlog(blogId, updatedData);
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

        const deletedBlog = await AdminService.deleteBlog(blogId);
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

        const blogApproved = await AdminService.changeBlogApprovement(blogId, approved);
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

        const blogStatus = await AdminService.changeBlogStatus(blogId, status);
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

        const userRole = await AdminService.changeUserRole(userId, role);
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
}

export default AdminController;
