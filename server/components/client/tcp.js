const Connection = require("./base");
class TcpConnection extends Connection {
  constructor(props) {
    super(props);
    this._socket.setEncoding("utf8");
    this._socket.setNoDelay();
  }

  get defaultOptions() {
    return {
      events: {
        ERROR: "error",
        NEW_MESSAGE: "data",
        CLOSE: "close"
      }
    };
  }
  sendMessage(message) {
    super.sendMessage(message);
    const preparedMessage = this.encodeMessage(message);
    this._socket.write(preparedMessage);
  }
}

module.exports = TcpConnection;
