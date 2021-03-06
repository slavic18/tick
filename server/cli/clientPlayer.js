const socketEvents = require("@constants/socketEvents");
const EventEmitter = require("events");
class ClientPlayer extends EventEmitter {
  constructor(socket) {
    super();

    this._socket = socket;
    this.onMessage = this.onMessage.bind(this);

    this._socket.on(socketEvents.NEW_MESSAGE, this.onMessage);
  }

  sendMessage(message) {
    this._socket.sendMessage(message);
  }
  onMessage(message) {
    switch (message.type) {
      case socketEvents.GET_GAMES_LIST:
        this.emit(socketEvents.RECEIVED_GAMES_LIST, {
          rooms: message.rooms
        });
        break;
      case socketEvents.JOIN_GAME:
        this.emit(socketEvents.JOIN_GAME);
        break;
      case socketEvents.CREATED_NEW_GAME:
        this.emit(socketEvents.CREATED_NEW_GAME);
        break;
      case socketEvents.UPDATE_BOARD:
        this.emit(socketEvents.UPDATE_BOARD, { board: message.board });
        break;
    }
  }

  createNewGame() {
    this.sendMessage({ type: socketEvents.CREATE_NEW_GAME });
  }
  fetchListOfGames() {
    this.sendMessage({ type: socketEvents.GET_GAMES_LIST });
  }
  joinGameRoom(roomId) {
    this.sendMessage({
      type: socketEvents.JOIN_GAME,
      roomId
    });
  }

  move(x, y) {
    this.sendMessage({
      type: socketEvents.PLAYER_MOVE,
      x,
      y
    });
  }
  getBoard() {
    return [[null, null, null], [null, null, null], [null, null, null]];
  }
}

module.exports = ClientPlayer;
