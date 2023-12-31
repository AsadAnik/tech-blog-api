import Blog, { IBlog } from '../models/Blog';
import Comment, { CommentModel } from '../models/Comment';
import cloudinary from '../config/cloudinaryConfig';

class BlogService {
    /**
     * ---- Comment Delete ---
     * @param commentId 
     * @returns 
     */
    static async deleteComment(commentId: string): Promise<any> {
        const comment = await Comment.findByIdAndDelete(commentId);
        if (!comment) return false;
        return comment;
    }

    /**
     * ---- Comment Edit ----
     * @param commentId 
     * @param commentText 
     * @returns 
     */
    static async editComment(commentId: string, commentText: string): Promise<CommentModel | Boolean> {
        const comment = await Comment.findByIdAndUpdate(commentId, { text: commentText }, { new: true });
        if (!comment) return false;
        return comment;
    }

    /**
     * ---- Comment on Blog ----
     * @param userId 
     * @param blogId 
     * @param commentText 
     * @returns 
     */
    static async commentBlog(userId: string, blogId: string, commentText: string): Promise<any> {
        const comment = new Comment({user: userId, blog: blogId, text: commentText});
        await comment.save();

        // Add the comment reference to the blog's comments array..
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { comments: comment._id },
        });

        return blog;
    }

    /**
     * ---- Like A Blog ----
     * @param blogId 
     * @param userId 
     * @returns 
     */
    static async likeBlog(userId: string, blogId: string): Promise<any> {
        const blog = await Blog.findById(blogId);
        if (!blog) return false;

        const alreadyLiked = blog.likes.some((like) => like.toString() === userId);
        if (alreadyLiked) return false;

        console.log(alreadyLiked);

        const likedBLog = await Blog.findByIdAndUpdate(blogId, {
            $push: { likes: userId }
        });

        return likedBLog;
    }

    /**
     * ---- Dislike A Blog ----
     * @param userId 
     * @param blogId 
     * @returns 
     */
    static async dislikeBlog(userId: string, blogId: string): Promise<IBlog | Boolean> {
        const blog = await Blog.findById(blogId);
        if (!blog) return false;

        const likedIndex = blog.likes.findIndex((like) => like.toString() === userId);
        if (likedIndex === -1) return false;

        blog.likes.splice(likedIndex, 1);
        await blog.save();

        return blog;
    }

    /**
     * ---- Get Blogs By Author ----
     * @param userId 
     * @returns 
     */
    static async getBlogsByAuthor(userId: string): Promise<IBlog[] | Boolean> {
        const blogs = await Blog.find({ author: userId }).populate('author');
        if (!blogs?.length) return false;
        return blogs;
    }

    /**
     * ---- Delete Blog By Id ----
     * @param blogId 
     */
    static async deleteBlog(blogId: string): Promise<any> {
        const deletedBlog = await Blog.findByIdAndDelete(blogId);
        if (!deletedBlog) return false;
        return deletedBlog;
    }

    /**
     * ---- Update Blog By Id ----
     * @param blogId 
     */
    static async updateBlog(blogId: string, blog: IBlog): Promise<any> {
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, blog);
        if (!updatedBlog) return false;
        return updatedBlog;
    }

    /**
     * ---- Get Blog By Id ----
     * @param blogId 
     * @returns 
     */
    static async getBlog(blogId: string): Promise<any> {
        const blog = await Blog.findById(blogId)
            .populate('author')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: '-token'
                }
            });

        if (!blog) return false;
        return blog;
    }

    /**
     * ----- Get Blogs (With Features) ----
     */
    static async getBlogs(
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

        const blogs = await Blog.find(query).populate('author').sort({ createdAt: -1 }).skip(skip).limit(limit);
        if (!blogs.length) return false;
        return blogs;
    }

    /**
     * ---- Get Blogs ----
     * @returns 
     */
    static async getAllBlogs(): Promise<IBlog[] | Boolean> {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        if (!blogs.length) return false;
        return blogs;
    }

    /**
     * ---- Create New Blog ----
     * @param blog 
     * @returns 
     */
    static async createBlog(blog: IBlog | any): Promise<any> {
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