import { createServer } from 'http';
import app from './app/app';
import { connectDB } from './database/db';

type CommonTypes = string | number;

const HOST: CommonTypes = process.env.HOST || 'localhost';
const PORT: CommonTypes = process.env.PORT || 8080;
const DATABASE_URI: CommonTypes = process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/tech-blog';

// Handling Uncaught Exception..
process.on("uncaughtException", (error: Error) => {
  console.log(`Error: ${error.message}`);
  console.log('Shutting down the server due to Uncaught Exception');
  process.exit(1);
});

// Node Server..
const server = createServer(app);

// DB Connection and server Listening..
connectDB(DATABASE_URI)
  .then(() => {
    // Listening to Server..
    server.listen(PORT, () => {
      console.log(`Welcome to -- ${process.env.APP_NAME} -- `);
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  });

  // Handling Unhandled Promise Rejection..
  process.on("unhandledRejection", (error: Error) => {
    console.log(`Error: ${error.message}`);
    console.log('Shutting down the server due to Uncaught Exception');

    server.close(() => {
      process.exit(1);
    });
  });
