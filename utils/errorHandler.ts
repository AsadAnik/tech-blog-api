class ErrorHandler extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;

        // To Get the Stack type Errors..
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;
