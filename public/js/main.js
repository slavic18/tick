const GameStatus = {
  INITIAL: "INITIAL",
  INITIALIZED: "INITIALIZED"
};

// server

const NEW_MESSAGE = "NEW_MESSAGE";
// game
const CREATE_NEW_GAME = "CREATE_NEW_GAME";
const CREATED_NEW_GAME = "CREATED_NEW_GAME";
const JOIN_GAME = "JOIN_GAME";
const EXIT_FROM_GAME = "EXIT_FROM_GAME";
// list
const GET_GAMES_LIST = "GET_GAMES_LIST";
const RECEIVED_GAMES_LIST = "RECEIVED_GAMES_LIST";
const REFRESH_GAMES_LIST = "REFRESH_GAMES_LIST";

class Game {
  constructor() {
    this.status = GameStatus.INITIAL;
    this.onMessage = this.onMessage.bind(this);
    this.initWebsocketInstance();
  }

  setStatus(status) {
    this.status = status;
  }

  initWebsocketInstance() {
    const websocketInstance = new WebSocket("ws://localhost:4446");
    this.socket = websocketInstance;
    websocketInstance.onmessage = this.onMessage;
    websocketInstance.onopen = () => {
      this.setStatus(GameStatus.INITIALIZED);
      // emulate a new game
      this.createNewGame();
    };
  }

  encodeMessage(message) {
    return JSON.stringify(message);
  }
  decodeMessage(message) {
    return JSON.parse(message);
  }
  sendMessage(message) {
    const preparedMessage = this.encodeMessage(message);
    this.socket.send(preparedMessage);
  }
  onMessage(message) {
    const decodedMessage = this.decodeMessage(message.data);
    switch (decodedMessage.type) {
      case CREATED_NEW_GAME:
        this.renderBoard();
        break;
    }
  }

  createNewGame() {
    this.sendMessage({
      type: "CREATE_NEW_GAME"
    });
  }
  renderBoard() {}
}

new Game();
