import { Request, Response, NextFunction } from 'express';

/**
 * ====== Common Interface for All Controllers should use ======
 */
export interface ControllerFunction {
    (req: Request, res: Response, next: NextFunction): void;
}