import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import UserService from '../services/user.service';

/**
 * ----- Check the Token is Valid or Not -------
 * @param req 
 * @param res 
 * @param next 
 */
export const authenticateToken = (req: Request | any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ 
        success: false,
        message: 'Authentication Required',  
    });

    try {
        // Verify the Token..
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        // Error..
        return res.status(403).json({
            success: false,
            message: 'Invalid Token',
        });
    }
};

/**
 * ----- Check the Admin Based Users Only ----
 * @param req 
 * @param res 
 * @param next 
 */
export const isAdmin = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getUser(req.user.userId);
        if (!user) return res.status(401).json({
            success: false,
            message: 'User not found!'
        });

        if (user.role !== 'admin') return res.status(403).json({
            success: false,
            message: 'Access denied. Admin role required.'
        });

        next();

    } catch (error) {
        console.error(error);
        return res.status(403).json({
            success: false,
            message: 'Invalid Role of User',
        });
    }
};