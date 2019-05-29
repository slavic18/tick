import WebsocketInstance from "./websocketService";
import SocketEvents from "../constants/socketEvents";

const EventEmitter = require("events");

export default class ClientPlayer extends EventEmitter {
  constructor(socket: WebsocketInstance) {
    super();
    this._socket = socket;
    this._socket.on(SocketEvents.NEW_MESSAGE, this.onMessage);
  }

  sendMessage(message: any) {
    this._socket.sendMessage(message);
  }

  onMessage = (message: any) => {
    switch (message.type) {
      case SocketEvents.GET_GAMES_LIST:
        this.emit(SocketEvents.RECEIVED_GAMES_LIST, {
          rooms: message.rooms
        });
        break;
      case SocketEvents.JOIN_GAME:
        this.emit(SocketEvents.JOIN_GAME);
        break;
      case SocketEvents.CREATED_NEW_GAME:
        this.emit(SocketEvents.CREATED_NEW_GAME);
        break;
      case SocketEvents.UPDATE_BOARD:
        this.emit(SocketEvents.UPDATE_BOARD, { board: message.board });
        break;
    }
  };

  createNewGame = () => {
    this.sendMessage({ type: SocketEvents.CREATE_NEW_GAME });
  };
  fetchListOfGames = () => {
    this.sendMessage({ type: SocketEvents.GET_GAMES_LIST });
  };
  joinGameRoom = (roomId: string) => {
    this.sendMessage({
      type: SocketEvents.JOIN_GAME,
      roomId
    });
  };

  move = (x: number, y: number) => {
    this.sendMessage({
      type: SocketEvents.PLAYER_MOVE,
      x,
      y
    });
  };
  getBoard() {
    return [[null, null, null], [null, null, null], [null, null, null]];
  }
}
