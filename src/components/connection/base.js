const uuid = require("uuid");

const clients = new Map();

class Connection {
  constructor(socket, options) {
    this.id = uuid();
    this._socket = socket;
    this._room = undefined;
    this.options = Object.assign({}, this.defaultOptions, options);
    console.log("new connection", this.id);
    this.onMessage = this.onMessage.bind(this);
    this.onError = this.onError.bind(this);
    this.onClose = this.onClose.bind(this);
    // attach listeners
    this._socket.on(this.options.events.NEW_MESSAGE, this.onMessage);
    this._socket.on(this.options.events.ERROR, this.onError);
    this._socket.on(this.options.events.CLOSE, this.onClose);

    clients.set(this.id, this);
  }

  get defaultOptions() {
    return {
      events: {
        ERROR: "ERROR",
        NEW_MESSAGE: "NEW_MESSAGE",
        CLOSE: "CLOSE"
      }
    };
  }
  get room() {
    return this._room;
  }

  set room(roomId) {
    this._room = roomId;
  }

  get type() {
    return this._type;
  }

  broadcastToAll(message) {
    clients.forEach(client => {
      if (client.id === this.id) {
        // send message to all except me
        return;
      }

      client.sendMessage(message);
    });
  }

  broadcastToRoomId(message, roomId) {
    clients.forEach(client => {
      if (client.id === this.id) {
        return;
      }
      if (!roomId) {
        return;
      }

      if (client.room !== roomId) {
        // send message to all except me
        return;
      }
      client.sendMessage(message);
    });
  }

  sendMessage(message) {
    process.stdout.write(`user:${this.id} NEW_MESSAGE: ${message}\r\n`);
  }
  onMessage() {
    throw new Error("onMessage method should be implemented");
  }
  onError() {}
  onClose() {}
}

module.exports = Connection;
