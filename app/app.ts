import dotenv from 'dotenv';
import * as path from 'path';
import express, { Application } from 'express';
import swaggerUI from 'swagger-ui-express';
import setupMiddlewares from './middleware';
import globalErrorHandler from './error';
import routes from './routes';
import YAML from 'yamljs';

// Load Swagger YAML file..
const swaggerSpec = YAML.load('./docs/_build/swagger.yaml')

// Express App..
const app: Application = express();

// DotEnv Configuration..
dotenv.config();

// Middlewares..
const midddlewares = setupMiddlewares();

// Using Swagger Middleware.
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Using Middleware & Route.
app.use(globalErrorHandler);
app.use(midddlewares);
app.use(routes);


// For Production Environment..
if (process.env.NODE_ENV === 'production') {
    // Serve any static files..
    app.use(express.static(path.join(__dirname, "../../client/build")));

    // Handle react routing, return all requests to React App..
    app.get('*', (_req, res) => {
        res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
    });
}

export default app;
