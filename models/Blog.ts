import { Document, Model, Schema, model } from 'mongoose';
import { LikeModel } from './Like';
import { CommentModel } from './Comment';

// Define the Blod Document Interface.
export interface IBlog extends Document {
    title: string;
    content: string;
    cover: {
        public_id: string;  
        url: string;
    } | null;
    likes: LikeModel[];
    comments: CommentModel[];
    approved: boolean;
    status: string;
}

/**
 * ==== Blog Schema ====
 */
const blogSchema = new Schema<IBlog>({
    title: {
        type: String,
        required: true
    },
    content: { 
        type: String, 
        required: true 
    },
    likes: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Like' 
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    approved: {
        type: Boolean,
        required: true,
        default: false,
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    }
}, {
    timestamps: true
});

/**
 * ==== Blog Model ====
 */
const Blog: Model<IBlog> = model('Blog', blogSchema);

export default Blog;