const socketEvents = require("@constants/socketEvents");
const uuid = require("uuid");
const EventEmitter = require("events");

class Player extends EventEmitter {
  constructor(socket) {
    super();
    this.onMessage = this.onMessage.bind(this);

    this.id = uuid();
    this._currentTurn = undefined;
    this._socket = socket;
    this._socket.on(socketEvents.NEW_MESSAGE, this.onMessage);
  }

  get currentTurn() {
    return this._currentTurn;
  }

  set currentTurn(currentTurn) {
    this._currentTurn = currentTurn;
  }

  get type() {
    return this._type;
  }
  set type(type) {
    this._type = type;
  }
  sendMessage(message) {
    this._socket.sendMessage(message);
  }

  onMessage(message) {
    console.log("message type", message.type);
    switch (message.type) {
      case socketEvents.CREATE_NEW_GAME:
        this.emit(socketEvents.CREATE_NEW_GAME, this);
        break;
      case socketEvents.GET_GAMES_LIST:
        this.emit(socketEvents.GET_GAMES_LIST, this);
        break;
      case socketEvents.JOIN_GAME:
        this.emit(socketEvents.JOIN_GAME, this, message.roomId);
        break;
      case socketEvents.PLAYER_MOVE:
        this.emit(socketEvents.PLAYER_MOVE, this, {
          x: message.x,
          y: message.y
        });
        break;
    }
    if (message === socketEvents.CREATE_NEW_GAME) {
      this.emit(socketEvents.CREATE_NEW_GAME, this);
    }

    console.log("server_player received new message", message);
  }
  createdNewGame() {
    this.sendMessage({ type: socketEvents.CREATED_NEW_GAME });
  }

  sendListOfRooms(rooms) {
    this.sendMessage({
      type: socketEvents.GET_GAMES_LIST,
      rooms
    });
  }
  joinGame() {
    this.sendMessage({
      type: socketEvents.JOIN_GAME
    });
  }
  onError() {}
  onClose() {}
}
Player.types = {
  X: "X",
  Y: "Y",
  VIEWER: "VIEWER"
};

module.exports = Player;
