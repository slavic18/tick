const Connection = require("./base");
const TcpConnection = require("./tcp");
const WebsocketConnection = require("./websocket");

module.exports = {
  Connection,
  TcpConnection,
  WebsocketConnection
};
