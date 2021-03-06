const net = require("net");
const http = require("http");
const WebSocket = require("ws");
const config = require("@configs");
const { TcpClient, WebsocketClient } = require("@components/client");
const GameWorld = require("@components/gameWorld");

const router = require("@components/router");

class Server {
  constructor() {
    this.gameWorld = new GameWorld();
    this.handleWebsocketConnection = this.handleWebsocketConnection.bind(this);
    this.handleTcpConnection = this.handleTcpConnection.bind(this);
  }
  handleWebsocketConnection(ws) {
    const connectionInstance = new WebsocketClient(ws);
    this.gameWorld.addNewClient(connectionInstance);
  }

  handleTcpConnection(socket) {
    const connectionInstance = new TcpClient(socket);
    this.gameWorld.addNewClient(connectionInstance);
  }

  run() {
    const httpServer = http.createServer(router.init);
    const wss = new WebSocket.Server({ server: httpServer });
    httpServer.listen(config.HTTP_SERVER_PORT);
    net.createServer(this.handleTcpConnection).listen(config.TCP_SERVER_PORT);
    wss.on("connection", this.handleWebsocketConnection);
    process.stdout.write("NEW_SERVER_INSTANCE");
  }
}

module.exports = Server;
