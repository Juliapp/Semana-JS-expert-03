import Events from 'events';
import TerminalController from './src/terminalController.js';
import CliConfig from './src/cliConfig.js';
import SocketClient from './src/socket.js';
import EventManager from './src/eventManager.js';

const [, , ...commands] = process.argv;
const config = CliConfig.parseArguments(commands);

const componentEmitter = new Events();
const socketClient = new SocketClient(config);
await socketClient.initialize();

const eventManager = new EventManager({ componentEmitter, socketClient });
const events = eventManager.getEvents();
socketClient.attachEvents(events);

const data = {
  roomId: config.room,
  userName: config.username,
};

await eventManager.joinRoomAndWaitForMessages(data);

const controller = new TerminalController();
await controller.initializeTable(componentEmitter);
