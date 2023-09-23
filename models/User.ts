import { Document, Model, Schema, model } from 'mongoose';
import validator from 'validator';


// Define the User Document Interface.
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    } | null;
    role: string;
    resetPasswordToken: string | null;
    resetPasswordExpire: Date | null;
    token: string | null;
}

/**
 * ==== User Schema ====
 */
const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Please Enter Your Name'],
        maxLength: [30, 'Name cannot exceed 30 characters'],
        minLength: [3, 'Name should have more then 3 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please Enter Your Password'],
        minLength: [8, 'Password must be at least 8 characters'],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    role: {
        type: String,
        default: 'user',
    },
    token: String,
}, {
    timestamps: true,
});

/**
 * ==== User Model ====
 */
const User: Model<IUser> = model('User', userSchema);

export default User;