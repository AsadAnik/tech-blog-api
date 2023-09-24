import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    description: string;
}

const categorySchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: String
}, {
    timestamps: true
});

export default mongoose.model<ICategory>('Category', categorySchema);