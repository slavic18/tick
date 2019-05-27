require("module-alias/register");

const net = require("net");
const http = require("http");
const WebSocket = require("ws");
const config = require("./configs");
const {
  TcpConnection,
  WebsocketConnection
} = require("./components/connection");

const router = require("./router/index");
const httpServer = http.createServer(router.init);

httpServer.listen(config.HTTP_SERVER_PORT);
net.createServer(handleTcpConnection).listen(config.TCP_SERVER_PORT);
const wss = new WebSocket.Server({ server: httpServer });
wss.on("connection", handleWebsocketConnection);

function handleWebsocketConnection(ws) {
  new WebsocketConnection(ws);
}

function handleTcpConnection(socket) {
  new TcpConnection(socket);
}
