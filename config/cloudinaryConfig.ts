import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

// DotEnv Configuration..
dotenv.config();

// Configure the Cloudinary..
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
