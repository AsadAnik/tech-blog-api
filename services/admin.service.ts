import Blog, { IBlog } from '../models/Blog';
import User, { IUser } from '../models/User';

// Service for Admin
class AdminService {
    /**
     * ---- Get All Blogs ----
     * @returns 
     */
    static async getBlogs(): Promise<any> {
        const blogs = await Blog.find();
        if (!blogs.length) return false;
        return blogs;
    }

    /**
     * ---- Get Blog By ID ----
     * @param blogId 
     * @returns 
     */
    static async getBlog(blogId: string): Promise<any> {
        const blog = await Blog.findById(blogId);
        if (!blog) return false;
        return blog;
    }

    /**
    * ---- Create New Blog ----
    * @param blogData 
    * @returns 
    */
    static async createBlog(blogData: IBlog): Promise<any> {
        const newBlog = new Blog(blogData);
        if (!newBlog) return false;
        await newBlog.save();
        return newBlog;
    }

    /**
     * ---- Updated Blog ----
     * @param blogId 
     * @param updatedBlog 
     * @returns 
     */
    static async updateBlog(blogId: string, updatedBlog: IBlog): Promise<any> {
        const updated = await Blog.findByIdAndUpdate(blogId, updatedBlog, { new: true });
        if (!updated) return false;
        return updated;
    }

    /**
     * ---- Delete Blog ----
     * @param blogId 
     * @returns 
     */
    static async deleteBlog(blogId: string): Promise<any> {
        const deletedBlog = await Blog.findByIdAndDelete(blogId);
        if (!deletedBlog) return false;
        return deletedBlog;
    }

    /**
     * ---- Change Approvement of Blog ----
     * @param blogId 
     * @param approved 
     */
    static async changeBlogApprovement(blogId: string, approved: boolean): Promise<any> {
        const blog = await Blog.findById(blogId);
        if (!blog) return false;
        blog.approved = approved;
        await blog.save();
        return blog;
    }

    /**
     * ---- Change Status of Blog ----
     * @param blogId 
     * @param status 
     * @returns 
     */
    static async changeBlogStatus(blogId: string, status: string): Promise<any> {
        const blog = await Blog.findById(blogId);
        if (!blog) return false;
        blog.status = status;
        await blog.save();
        return blog;
    }

    /**
     * ---- Change User Role ----
     * @param userId 
     * @param role 
     * @returns 
     */
    static async changeUserRole(userId: string, role: string): Promise<any> {
        const user = await User.findById(userId);
        if (!user) return false;
        user.role = role;
        await user.save();
        return user;
    }
}

export default AdminService;
