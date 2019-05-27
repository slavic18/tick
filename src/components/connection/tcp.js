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
    this._socket.write(message);
  }
  onMessage(message) {
    console.log(message, this.id);
  }
}

module.exports = TcpConnection;
