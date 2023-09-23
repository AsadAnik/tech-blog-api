import Blog, { IBlog } from '../models/Blog';

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
    static async getBlogById (blogId: string): Promise<any> {
        const blog = await Blog.findById(blogId);
        if (!blog) return false;
        return blog;
    }

    /**
     * ----- Get All Blogs ----
     */
    static async getBlogs (
        search: string,
        category: string,
        page: number,
        limit: number
    ): Promise<any> {
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
     * ---- Create New Blog ----
     * @param blog 
     * @returns 
     */
    static async createBlog (blog: IBlog): Promise<any> {
        const newBlog = new Blog(blog);
        if (!newBlog) return false;
        await newBlog.save();
        return newBlog;
    }
}

export default BlogService;