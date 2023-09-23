import mongoose, { Schema, Document } from 'mongoose';

export interface LikeModel extends Document {
    userId: mongoose.Types.ObjectId;
}

const likeSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        required: true 
    }
}, {
    timestamps: true
});

export default mongoose.model<LikeModel>('Like', likeSchema);
