import mongoose, { Schema, Document, mongo } from "mongoose";

export interface CommentModel extends Document {
    userId: mongoose.Types.ObjectId;
    text: string;
}

const commentSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId,
        required: true 
    },
    text: { 
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model<CommentModel>('Comment', commentSchema);