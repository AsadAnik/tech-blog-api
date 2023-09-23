import User from '../models/User';
import cloudinary from '../config/cloudinaryConfig';
import bcrypt from 'bcrypt';
import { signToken } from '../utils/jwt';
import ErrorHandler from '../utils/errorHandler';

class AuthService {
    /**
     * ---- Login for user ----
     * @param param0 
     */
    static async loginUser(nameOrEmail: string, password: string): Promise<any> {
        const user = await this.findByNameOrEmail(nameOrEmail);
        if (!user) return false;

        // Check if the provided password matches the stored hashed password..
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) return false;

        // Generate Token with User..
        const userWithToken = await this.saveToken(user._id);

        return userWithToken;
    }

    /**
     * ----- Find By Username Or Email -----
     * @param nameOrEmail 
     * @returns 
     */
    static async findByNameOrEmail(nameOrEmail: string): Promise<any> {
        // Find out user with name or email..
        const user = await User.findOne({
            $or: [{ email: nameOrEmail }, { name: nameOrEmail }],
        }).select("+password");

        return user;
    }

    /**
     * ---- Create for user registering -----
     * @param param0 
     * @returns 
     */
    static async createUser({ name, email, password, avatarPath = '' }: {
        name: string;
        email: string;
        password: string;
        avatarPath?: string;
    }): Promise<any> {
        // Upload the avatar to Cloudinary..
        let avatarResult;

        if (avatarPath) {
            avatarResult = await cloudinary?.v2.uploader.upload(avatarPath as string);
        }

        // Hasing Password..
        const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);

        // Store User..
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            ...(avatarPath && {
                public_id: avatarResult?.public_id,
                url: avatarResult?.secure_url,
            })
        });

        // Save and Returning User..
        return await newUser.save();
    }

    /**
     * ----- Check if an email is already registered -----
     * @param email 
     * @returns 
     */
    static async checkEmailExists(email: string): Promise<any> {
        return await User.findOne({ email }) !== null;
    }

    /**
     * ---- Check if a user with the same name already exits ----
     * @param name 
     * @returns 
     */
    static async checkNameExists(name: string): Promise<any> {
        return await User.findOne({ name }) !== null;
    }

    /**
     * ----- Save User with Token ------
     * @param token 
     * @param userId 
     * @returns 
     */
    static async saveToken(userId: string): Promise<any> {
        try {
            // Generate Token..
            const token = signToken({ userId });

            // Update the user document with the token..
            const updatedUser = await User.findByIdAndUpdate(userId, { token }, { new: true });
            return updatedUser;

        } catch (error) {
            // Handle Error here..
            return new ErrorHandler("Error saving Token: ", 400);
        }
    }
}

export default AuthService;