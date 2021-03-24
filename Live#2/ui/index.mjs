import { database } from '../shared/data.mjs';
const path = globalThis.window ? 'browser' : 'console';

const { default: ViewFactory } = await import(
  `./../plataforms/${path}/index.mjs`
);

const app = new ViewFactory();
app.render(database);
