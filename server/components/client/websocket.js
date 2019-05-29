const Connection = require("./base");
class WebsocketConnection extends Connection {
  constructor(props) {
    super(props);
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

  sendMessage(message) {
    const preparedMessage = this.encodeMessage(message);
    this._socket.send(preparedMessage);
  }
}

module.exports = WebsocketConnection;
