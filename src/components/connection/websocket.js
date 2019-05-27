const Connection = require("./base");
class WebsocketConnection extends Connection {
  constructor(props) {
    super(props);
    this.broadcastToAll("connected");
  }
  get defaultOptions() {
    return {
      events: {
        ERROR: "error",
        NEW_MESSAGE: "message",
        CLOSE: "end"
      }
    };
  }

  onMessage(message) {
    console.log("new_message", message);
  }

  sendMessage(message) {
    super.sendMessage(message);
    this._socket.send(message);
  }
}

module.exports = WebsocketConnection;
