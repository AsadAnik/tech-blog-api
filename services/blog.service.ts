import Blog, { IBlog } from '../models/Blog';
import cloudinary from '../config/cloudinaryConfig';

class BlogService {
    /**
     * ---- Delete Blog By Id ----
     * @param blogId 
     */
    static async deleteBlog (blogId: string): Promise<any> {
        const deletedBlog = await Blog.findByIdAndDelete(blogId);
        if (!deletedBlog) return false;
        return deletedBlog;
    }

    /**
     * ---- Update Blog By Id ----
     * @param blogId 
     */
    static async updateBlog (blogId: string, blog: IBlog): Promise<any> {
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, blog);
        if (!updatedBlog) return false;
        return updatedBlog;
    }

    /**
     * ---- Get Blog By Id ----
     * @param blogId 
     * @returns 
     */
    static async getBlog (blogId: string): Promise<any> {
        const blog = await Blog.findById(blogId);
        if (!blog) return false;
        return blog;
    }

    /**
     * ----- Get Blogs (With Features) ----
     */
    static async getBlogs (
        search: string = '',
        category: string = '',
        page: number = 1,
        limit: number = 10
    ): Promise<IBlog[] | Boolean> {
        const skip = (page - 1) * limit;
        
        const query: any = search ? {
            $or: [
                { title: { $regex: new RegExp(search, 'i') } },
                { content: { $regex: new RegExp(search, 'i') } }
            ]
        } : {};

        if (category) {
            query.category = category;
        }

        const blogs = await Blog.find(query).sort({createdAt: -1}).skip(skip).limit(limit);
        if (!blogs.length) return false;
        return blogs;
    }

    /**
     * ---- Get Blogs ----
     * @returns 
     */
    static async getAllBlogs (): Promise<IBlog[] | Boolean> {
        const blogs = await Blog.find().sort({createdAt: -1});
        if (!blogs.length) return false;
        return blogs;
    }

    /**
     * ---- Create New Blog ----
     * @param blog 
     * @returns 
     */
    static async createBlog (blog: IBlog | any): Promise<any> {
        let coverResult;

        if (blog?.cover) {
            coverResult = await cloudinary?.v2.uploader.upload(blog?.cover as string);
        }

        const newBlog = new Blog({
            ...blog,
            cover: {
                public_id: coverResult?.public_id,
                url: coverResult?.secure_url
            }
        });

        if (!newBlog) return false;
        await newBlog.save();
        return newBlog;
    }

     /**
     * ---- Change Approvement of Blog ----
     * @param blogId 
     * @param approved 
     */
     static async changeBlogApprovement(blogId: string, approved: boolean): Promise<IBlog | Boolean> {
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
    static async changeBlogStatus(blogId: string, status: string): Promise<IBlog | Boolean> {
        const blog = await Blog.findById(blogId);
        if (!blog) return false;
        blog.status = status;
        await blog.save();
        return blog;
    }
}

export default BlogService;