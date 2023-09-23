import { Request, Response, NextFunction } from 'express';
import catchAsyncErrorHandle from "../middleware/catchAsyncErrors";
import { ControllerFunction } from '../common/types';
import AuthService from '../services/auth.service';


class AuthController {
    /**
     * ---- Login Controller ----
     */
    static login: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        const { nameOrEmail, password } = req.body;

        // Check this Name or Email is avaiable..
        const isNameOrEmailAvailable = await AuthService.findByNameOrEmail(nameOrEmail);
        if (!isNameOrEmailAvailable) return res.status(404).json({
            success: false,
            message: 'This is Invalid User',
        });

        // Make Login..
        const isLoggedInUser = await AuthService.loginUser(nameOrEmail, password);
        if (!isLoggedInUser) return res.status(400).json({
            success: false,
            message: 'Wrong Password, try again.',
        });

        res.status(200).json({
            success: true,
            message: 'Successfully Logged-In',
            user: isLoggedInUser,
        });
    });


    /**
     * ---- Register Controller ----
     */
    static register: ControllerFunction = catchAsyncErrorHandle(async (
        req: Request,
        res: Response,
    ) => {
        const { name, email, password } = req.body;
        const avatar = req?.file;
        const avatarPath: any = avatar?.path;

        // Check if the email is already registered..
        const isEmailExists = await AuthService.checkEmailExists(email);
        if (isEmailExists) return res.status(409).json({
            success: false,
            message: 'Email already registered. Please use a different email address',
        });

        // Check if a user with same name already exists..
        const isNameExists = await AuthService.checkNameExists(name);
        if (isNameExists) return res.status(409).json({
            success: false,
            message: 'A user with the same name already exists. Please use a different name',
        });

        // Calling Service to Create User..
        let newUser = await AuthService.createUser({ name, email, password, avatarPath });
        if (!newUser) return res.status(400).json({
            success: false,
            message: 'Can\'t Register User!',
        });

        // Save with Token..
        const userWithToken = await AuthService.saveToken(newUser._id);
        if (!userWithToken) return res.status(400).json({
            success: false,
            message: 'Failed to save the token',
        });

        res.status(201).json({
            success: true,
            message: 'User Registered Successfully',
            user: userWithToken
        });
    });
}

export default AuthController;