import User, { IUser } from '../models/User';


class UserService {
    /**
     * ---- Get Users ----
     * @returns 
     */
    static async getUsers (): Promise<IUser[] | Boolean> {
        const users = await User.find().sort({createdAt: -1});
        if (!users.length) return false;
        return users;
    }

    /**
     * ---- Get User ----
     * @param id 
     * @returns 
     */
    static async getUser (id: string): Promise<IUser | any> {
        const user = await User.findById(id);
        if (!user) return false;
        return user;
    }

    /**
     * ----- Logout User ----
     * @param userId 
     */
    static async logout (userId: string): Promise<any> {
        const user = await User.findOne({ _id: userId });
        if (!user) return false;

        // Update the token with empty for clear token..
        user.token = '';
        await user.save();
        return user;
    }

    /**
     * ----- User Check For Users Details ----
     * @param userId 
     */
    static async userCheck (userId: string): Promise<IUser | Boolean> {
        const user = await User.findOne({ _id: userId });
        if (!user) return false;
        return user;
    }

    /**
     * ---- User Profile Update ----
     * @param id 
     * @param updateData 
     * @returns 
     */
    static async updateUser (id: string, updateData: IUser): Promise<IUser | Boolean> {
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) return false;
        return updatedUser
    }
}

export default UserService;