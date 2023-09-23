import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cloudinaryUpload from '../middleware/cloudinaryUpload';

/**
 * ==== Setting Up All Neccesary Middlwares ====
 * @returns 
 */
export default function setupMiddlewares() {
    const midddlewares = [
        morgan('dev'),
        cors(),
        express.json(),
        cookieParser(),
        cloudinaryUpload.single("avatar"),
    ];

    return midddlewares;
}