import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * ===== To Handle Try Catch Errors =====
 * @param controllerFunction 
 * @returns 
 */
const catchAsyncErrorHandle = (controllerFunction: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(controllerFunction(req, res, next)).catch(next);
}

export default catchAsyncErrorHandle;