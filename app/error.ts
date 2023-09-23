import { Request, Response, NextFunction } from 'express';
import ErrorHandler from "../utils/errorHandler";


interface GlobalErrorHandler {
    (error: ErrorHandler | any, req: Request, res: Response, next: NextFunction ): void;
}

/**
 * ===== To Handle The Global Errors =====
 * @param error 
 * @param req 
 * @param res 
 * @param _next 
 */
const globalErrorHandler: GlobalErrorHandler = (error, _req, res, _next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";

    // MongoDB Cast Error Handling..
    if (error.name === "CastError") {
        const message: string = `Resource not found. Invalid: ${error.path}`;
        error = new ErrorHandler(message, 400);
    }

    // MongoDB Duplicate Key Error Handling..
    if (error.code === 1100) {
        const message: string = `Duplicate ${Object.keys(error.keyValue)} Entered`;
        error = new ErrorHandler(message, 400);
    }

    // Wrong JWT Error Handling..
    if (error.name === "JsonWebTokenError") {
        const message: string = "Invalid Json Web Token, Try again";
        error = new ErrorHandler(message, 400);
    }

    // Expired JWT Error Handling..
    if (error.name === "TokenExpiredError") {
        const message: string = "Expired Json Web Token, Try again";
        error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
        success: false,
        message: error.message
    });
};

export default globalErrorHandler;