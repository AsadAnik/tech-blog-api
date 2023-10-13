import mongoose, { Schema, Document } from "mongoose";

export interface CommentModel extends Document {
    user: mongoose.Types.ObjectId;
    text: string;
}

const commentSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
    },
    text: { 
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model<CommentModel>('Comment', commentSchema);