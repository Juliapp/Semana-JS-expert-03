import ComponentBuilder from './components.js';
export default class TerminalController {
  #usersColors = new Map();

  constructor() {}

  #pickColor() {
    return `#${(((1 << 24) * Math.random()) | 0).toString(16)}-fg`;
  }

  #getUserColors(userName) {
    if (this.#usersColors.has(userName)) return this.#usersColors.get(userName);

    const color = this.#pickColor();
    this.#usersColors.set(userName, color);
    return color;
  }

  #onInputReceived(eventEmitter) {
    return function () {
      const message = this.getValue();
      console.log(message);
      this.clearValue();
    };
  }

  #onMessageReceived({ screen, chat }) {
    return (msg) => {
      const { userName, message } = msg;
      const color = this.#getUserColors(userName);
      chat.addItem(`{${color}}{bold}${userName}{/}: ${message}`);
      screen.render();
    };
  }

  #registerEvents(eventEmitter, components) {
    eventEmitter.on('message:received', this.#onMessageReceived(components));
  }

  async initializeTable(eventEmitter) {
    const components = new ComponentBuilder()
      .setScreen({ title: 'HackerChat - Juh' })
      .setLayoutComponent()
      .setInputComponent(this.#onInputReceived(eventEmitter))
      .setChatComponent()
      .build();

    this.#registerEvents(eventEmitter, components);
    components.input.focus();
    components.screen.render();

    setInterval(() => {
      eventEmitter.emit('message:received', {
        message: 'hey',
        userName: 'juli',
      });
      eventEmitter.emit('message:received', {
        message: 'iae',
        userName: 'bruno',
      });
      eventEmitter.emit('message:received', {
        message: 'how',
        userName: 'jsus',
      });
    });
  }
}
