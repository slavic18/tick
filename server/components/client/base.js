const EventEmitter = require("events");
const socketEvents = require("@constants/socketEvents");
class Connection extends EventEmitter {
  constructor(socket, options) {
    super();
    this._socket = socket;
    this.options = Object.assign({}, this.defaultOptions, options);
    // bind this
    this.onMessage = this.onMessage.bind(this);
    this.onError = this.onError.bind(this);
    this.onClose = this.onClose.bind(this);
    // attach listeners
    this._socket.on(this.options.events.NEW_MESSAGE, this.onMessage);
    this._socket.on(this.options.events.ERROR, this.onError);
    this._socket.on(this.options.events.CLOSE, this.onClose);
  }

  get defaultOptions() {
    return {};
  }

  encodeMessage(message) {
    return JSON.stringify(message);
  }
  decodeMessage(message) {
    try {
      const decodedMessage = JSON.parse(message);
      return decodedMessage;
    } catch (e) {
      throw new Error("error on parsing message");
    }
  }

  onMessage(message) {
    const decodedMessage = this.decodeMessage(message);
    this.emit(socketEvents.NEW_MESSAGE, decodedMessage);
  }
  sendMessage() {}
  onError() {}
  onClose() {}
}

module.exports = Connection;
