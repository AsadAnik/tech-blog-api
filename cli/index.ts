import { Command } from 'commander';
import { generateModel, generateService, generateController, generateRoute } from './generators';

const program = new Command();

program
    .command('generate:model <name>')
    .description('Generate a Model')
    .action((name) => {
        generateModel(name);
    });

program
    .command('generate:service <name>')
    .description('Generate a Service')
    .action((name) => {
        generateService(name);
    });

program
    .command('generate:controller <name>')
    .description('Generate a Controller')
    .action((name) => {
        generateController(name);
    });

program
    .command('generate:route <name>')
    .description('Generate a Route')
    .action((name) => {
        generateRoute(name);
    });

program
    .command('generate:all:schema <name>')
    .description('Generate a Model, Service and Controller')
    .action((name) => {
        generateModel(name);
        generateService(name);
        generateController(name);
        generateRoute(name);
    });

program
    .command('generate:all <name>')
    .description('Generate a Model, Service and Controller')
    .action((name) => {
        generateService(name);
        generateController(name);
        generateRoute(name);
    });

program.parse(process.argv);