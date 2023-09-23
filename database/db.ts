import mongoose, { Mongoose } from 'mongoose';

// Create a new Mongoose instance..
const db: Mongoose = mongoose;

// Mongoose Promise..
mongoose.Promise = global.Promise;

export async function connectDB(URL: string): Promise<Mongoose> {
    try {
        await db.connect(URL);
        console.log('-------- DATABASE IS CONNECTED -------');
        return db;

    } catch (error) {
        console.error('MongoDB connection error: ', error);
        throw error;
    }
}
