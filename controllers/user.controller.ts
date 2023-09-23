import { Request, Response, NextFunction } from 'express';
import catchAsyncErrorHandle from "../middleware/catchAsyncErrors";
import { ControllerFunction } from '../common/types';
import UserService from '../services/user.service';


class UserController {
    /**
     * ---- Get Users ----
     */
    static getUsers: ControllerFunction = catchAsyncErrorHandle(async (
        _req: Request,
        res: Response,
    ) => {
        const users = await UserService.getUsers();
        if (!users) return res.status(401).json({
            success: false,
            message: "User not founds"
        });

        res.status(200).json({
            success: true,
            message: "Fetcehed Users Successfully",
            users
        });
    });


    /**
     * ---- Get User ----
     */
    static getUser: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request,
        res: Response,
    ) => {
        const { id } = req.params;
        if (!id) return res.status(401).json({
            success: false,
            message: 'ID not Provided, Try Again',
        });

        const user = await UserService.getUser(id);
        if (!user) return res.status(401).json({
            success: false,
            message: 'User not found!'
        });

        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            user
        });
    });


    /**
     * ---- Uer Check Controller ----
     */
    static userCheck: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request | any,
        res: Response,
        _next: NextFunction
    ) => {
        const { userId } = req.user;
        const user = await UserService.userCheck(userId);
        if (!user) return res.status(400).json({
            success: false,
            message: 'No User for Checks',
        });

        res.status(200).json({
            success: true,
            user,
        });
    });

    /**
     * ---- Logout Controller ----
     */
    static logout: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request | any,
        res: Response,
        _next: NextFunction
    ) => {
        // res.cookie('token', null, {
        //     expires: new Date(Date.now()),
        //     httpOnly: true,
        // });

        const { userId } = req.user;

        const user = await UserService.logout(userId);
        if (!user) return res.status(400).json({
            success: false,
            message: 'No User Found to Logout!',
        });

        res.status(200).json({
            success: true,
            message: 'Logged Out',
            user
        });
    });


    /**
     * ---- Update User ----
     */
    static updateProfile: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request | any,
        res: Response,
    ) => {
        const { userId: id } = req.user;
        const updatedData = req.body;

        if (!id) return res.status(401).json({
            success: false,
            message: 'ID not Provided, Try Again',
        });

        const updatedUser = await UserService.updateUser(id, updatedData);
        if (!updatedUser) return res.status(401).json({
            success: false,
            message: 'Cannot update profile data!'
        });

        res.status(200).json({
            success: true,
            message: 'Profile Updated Successfully',
            updatedUser
        });

    });
}

export default UserController;