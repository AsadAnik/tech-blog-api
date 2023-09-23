import multer from 'multer';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

interface CloudinaryParams {
    folder: string;
    allowed_formats: string[];
}

// Configure Multer storage using Multer-Storage-Cloudinary..
const storage = new CloudinaryStorage({
    cloudinary: cloudinaryV2,
    params: {
        folder: 'tech-blog',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    } as CloudinaryParams,
});

const uploadParser = multer({ storage });

export default uploadParser;