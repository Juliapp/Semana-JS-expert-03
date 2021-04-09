import Events from 'events';
import TerminalController from './src/terminalController.js';
import CliConfig from './src/cliConfig.js';

console.log(process.argv);

const [, , ...commands] = process.argv;
const config = CliConfig.parseArguments(commands);
console.log('config', config);

const componentEmitter = new Events();
const controller = new TerminalController();

await controller.initializeTable(componentEmitter);
