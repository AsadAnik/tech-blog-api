import fs from 'fs/promises';
import path from 'path';

// Define the base directories where we want to generate files
const baseDir = path.join(__dirname, '..'); // This is the directory where the generator script is located

/**
 * == Create Directory for perfect locations of files ==
 * @param dirPath 
 */
const makeDirectory = async (dirPath: any) => {
    try {
        await fs.mkdir(dirPath, { recursive: true });
    } catch (error: any) {
        console.error(`Error while creating directory ${dirPath} -- ${error.message}`);
    }
};

/**
 * == Create File Path for perfect naming of files..
 * @param type 
 * @param name 
 * @returns 
 */
const makeFilePath = (type: string, name: string) => {
    const dir = path.join(baseDir, `${type}s`);
    const filePath = type === "service" || type === "controller" || type === "route" ?
            path.join(dir, `${name}.${type}.ts`)
        :
            path.join(dir, `${name}.ts`);

    return filePath;
};

/**
 * == To Make Capitalise any Files name ==
 * @param str 
 * @returns 
 */
function capitalize(str: string) {
    if (typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * == Model ==
 * @param name 
 */
export const generateModel = async (name: string) => {
    try {
        const modelTemplate = `import { Document, Model, Schema, model } from 'mongoose';

export interface I${capitalize(name)} extends Document {
    // Types of ${capitalize(name)}..
}

const ${name.toLocaleLowerCase()}Schema = new Schema<I${capitalize(name)}>({
    // Schema Shape..
});

/**
* ==== Blog Model ====
*/
const ${capitalize(name)}: Model<I${capitalize(name)}> = model('${capitalize(name)}', ${name}Schema);
export default ${capitalize(name)};
        `;

        const modelDir = path.join(baseDir, 'models');
        await makeDirectory(modelDir);

        const modelFileName = makeFilePath('model', capitalize(name));
        await fs.writeFile(modelFileName, modelTemplate, 'utf-8');
        console.log(`Model ${name} created successfully in ${modelFileName}`);

    } catch (error: any) {
        console.error(`Error while creating Model -- ${error.message}`);
    }
}

/**
 * == Service ==
 * @param name 
 */
export const generateService = async (name: string) => {
    try {
        const serviceTemplate = `// Service for ${capitalize(name)}
import ${capitalize(name)}, { I${capitalize(name)} } from '../models/${capitalize(name)}';

class ${capitalize(name)}Service {
    // ${capitalize(name)} Services..
}

export default ${capitalize(name)}Service;
        `;

        const serviceDir = path.join(baseDir, 'services');
        await makeDirectory(serviceDir);

        const serviceFileName = makeFilePath('service', name.toLocaleLowerCase());
        await fs.writeFile(serviceFileName, serviceTemplate, 'utf-8');
        console.log(`Service ${name} created successfully in ${serviceFileName}`);

    } catch (error: any) {
        console.error(`Error while creating ${name} Service -- ${error.message}`);
    }
}

/**
 * == Controller ==
 * @param name 
 */
export const generateController = async (name: string) => {
    try {
        const controllerTemplate = `import { Request, Response, NextFunction } from 'express';
import catchAsyncErrorHandle from "../middleware/catchAsyncErrors";
import { ControllerFunction } from '../common/types';
import ${capitalize(name)}Service from '../services/${name.toLocaleLowerCase()}.service';

class ${capitalize(name)}Controller {
    // Controlles of ${capitalize(name)}..
    /**
     * ---- Get All ${capitalize(name)}s ----
     */
    static get${capitalize(name)}s: ControllerFunction = catchAsyncErrorHandle(async (
        _req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        res.status(200).json({
            success: true,
            message: "${capitalize(name)}'s Controller Ready",
        });
    });

    /**
     * ---- Get ${capitalize(name)} ----
     */
    static get${capitalize(name)}: ControllerFunction = catchAsyncErrorHandle(async (
        _req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        res.status(200).json({
            success: true,
            message: "${capitalize(name)}'s Controller Ready",
        });
    });


    /**
     * ---- Create ${capitalize(name)} ----
     */
    static create${capitalize(name)}: ControllerFunction = catchAsyncErrorHandle(async (
        _req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        res.status(200).json({
            success: true,
            message: "${capitalize(name)}'s Controller Ready",
        });
    });

    /**
     * ---- Update ${capitalize(name)} ----
     */
    static update${capitalize(name)}: ControllerFunction = catchAsyncErrorHandle(async (
        _req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        res.status(200).json({
            success: true,
            message: "${capitalize(name)}'s Controller Ready",
        });
    });

    /**
     * ---- Delete ${capitalize(name)} ----
     */
    static delete${capitalize(name)}: ControllerFunction = catchAsyncErrorHandle(async (
        _req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        res.status(200).json({
            success: true,
            message: "${capitalize(name)}'s Controller Ready",
        });
    });
}

export default ${capitalize(name)}Controller;
        `;

        const controllerDir = path.join(baseDir, 'controllers');
        await makeDirectory(controllerDir);

        const controllerFileName = makeFilePath('controller', name.toLocaleLowerCase());
        await fs.writeFile(controllerFileName, controllerTemplate, 'utf-8');
        console.log(`Controller ${name} created successfully in ${controllerFileName}`);

    } catch (error: any) {
        console.error(`Error while creating ${name} Controller -- ${error.message}`);
    }
};


/**
 * == Route ==
 * @param name 
 */
export const generateRoute = async (name: string) => {
    try {
        const routeTemplate = `import { Router } from 'express';
import ${capitalize(name)}Controller from '../controllers/${name.toLocaleLowerCase()}.controller';
const router = Router();

/**
 * ==== ${capitalize(name)} Routes ====
 */
router.get('/', ${capitalize(name)}Controller.get${capitalize(name)}s)
    .post('/', ${capitalize(name)}Controller.create${capitalize(name)})
    .get('/:Id', ${capitalize(name)}Controller.get${capitalize(name)})
    .put('/:Id', ${capitalize(name)}Controller.update${capitalize(name)})
    .delete('/:Id', ${capitalize(name)}Controller.delete${capitalize(name)});

export default router;
        `;

        const routeDir = path.join(baseDir, 'routes');
        await makeDirectory(routeDir);

        const routeFileName = makeFilePath('route', name.toLocaleLowerCase());
        await fs.writeFile(routeFileName, routeTemplate, 'utf-8');
        console.log(`Route ${name} created successfully in ${routeFileName}`);

    } catch (error: any) {
        console.error(`Error while creating ${name} Route -- ${error.message}`);
    }
};
