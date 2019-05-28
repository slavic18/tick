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
    }
    // console.log(message.type);
    // console.log("received: new message", message);
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
}

module.exports = ClientPlayer;
