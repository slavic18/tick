const socketEvent = require("@constants/socketEvents");
const Game = require("@components/game");
const Player = require("@components/player");

class GameWorld {
  constructor() {
    this.players = new Map();
    this.games = new Map();
    this.handleCreatingOfNewGame = this.handleCreatingOfNewGame.bind(this);
    this.handleFetchGamesList = this.handleFetchGamesList.bind(this);
    this.handlePlayerJoinGame = this.handlePlayerJoinGame.bind(this);
  }

  addNewClient(connectionInstance) {
    const PlayerInstance = new Player(connectionInstance);
    this.addPlayerListeners(PlayerInstance);
    this.players.set(PlayerInstance.id, PlayerInstance);
  }

  addPlayerListeners(player) {
    player.on(socketEvent.CREATE_NEW_GAME, this.handleCreatingOfNewGame);
    player.on(socketEvent.GET_GAMES_LIST, this.handleFetchGamesList);
    player.on(socketEvent.JOIN_GAME, this.handlePlayerJoinGame);
  }

  removePlayerListeners(player) {
    player.removeAllListeners(socketEvent.CREATE_NEW_GAME);
    player.removeAllListeners(socketEvent.GET_GAMES_LIST);
    player.removeAllListeners(socketEvent.JOIN_GAME);
  }

  handleCreatingOfNewGame(player) {
    const GameInstance = new Game();
    GameInstance.addPlayer(player);
    player.createdNewGame();
    this.games.set(GameInstance.id, GameInstance);
  }

  handleFetchGamesList(player) {
    const gamesArray = [];
    this.games.forEach(item => {
      gamesArray.push(item);
    });

    player.sendListOfRooms(gamesArray);
  }
  handlePlayerJoinGame(player, gameId) {
    if (!this.games.has(gameId)) {
      throw new Error(`Room this ${gameId} doesn't exist.`);
    }
    player.joinGame();
    this.games.get(gameId).addPlayer(player);
  }

  broadcastToAll(message) {
    this.players.forEach(player => {
      if (player.id === this.id) {
        // send message to all except me
        return;
      }

      player.sendMessage(message);
    });
  }

  broadcastToRoomId(message, roomId) {
    this.players.forEach(player => {
      if (player.id === this.id) {
        return;
      }
      if (!roomId) {
        return;
      }

      if (player.room !== roomId) {
        // send message to all except me
        return;
      }
      player.sendMessage(message);
    });
  }
}

module.exports = GameWorld;
