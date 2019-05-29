const uuid = require("uuid");
const socketEvent = require("@constants/socketEvents");
const Player = require("@components/player");
class Game {
  constructor() {
    this.id = uuid();
    this.board = this.createBoard();
    this.players = new Map();
    this.winner = undefined;
    // bind this values
    this.handlePlayerMove = this.handlePlayerMove.bind(this);
  }
  createBoard() {
    return [[null, null, null], [null, null, null], [null, null, null]];
  }
  isGameOver() {
    const isGameOver = false;
    const { board } = this;

    return isGameOver;
  }

  sendMessageToAll(message) {
    this.players.forEach(player => player.sendMessage(message));
  }

  broadcast(message) {
    this.players.forEach(player => {
      if (player.id === this.id) {
        return;
      }

      player.sendMessage(message);
    });
  }

  getPlayerType() {
    if (this.players.size === 0) {
      return Player.types.X;
    }

    if (this.players.size === 1) {
      return Player.types.Y;
    }

    return Player.types.VIEWER;
  }
  getPlayerTurn() {
    let isMyTurn = false;
    if (this.players.size === 0) {
      isMyTurn = true;
    }

    let allPlayerAreDisabled = true;
    this.players.forEach(player => {
      if (player.currentTurn) {
        allPlayerAreDisabled = false;
      }
    });

    return isMyTurn || allPlayerAreDisabled;
  }

  addPlayer(player) {
    if (this.players.has(player.id)) {
      return;
    }
    this.addPlayerListeners(player);
    player.type = this.getPlayerType();
    player.currentTurn = this.getPlayerTurn();
    this.players.set(player.id, player);
    this.updateBoard();
  }
  addPlayerListeners(player) {
    player.on(socketEvent.PLAYER_MOVE, this.handlePlayerMove);
  }

  canPlayerDoMove(player, { x, y }) {
    const slot = this.board[x][y];

    if (player.type === Player.TYPE_VIEWER) {
      return false;
    }

    if (!player.currentTurn) {
      return false;
    }

    // slot is already  occupied
    if (slot) {
      return false;
    }
    return true;
  }
  occupyField({ x, y }, symbol) {
    this.board[x][y] = {
      symbol
    };
  }

  updateBoard() {
    this.sendMessageToAll({
      type: socketEvent.UPDATE_BOARD,
      board: this.board
    });
  }

  handlePlayerMove(currentPlayer, { x, y }) {
    if (!this.canPlayerDoMove(currentPlayer, { x, y })) {
      return;
    }
    this.occupyField({ x, y }, currentPlayer.type);

    currentPlayer.currentTurn = false;

    this.players.forEach(player => {
      if (player.id === currentPlayer.id) {
        return;
      }
      if (player.type === Player.types.VIEWER) {
        return;
      }
      player.currentTurn = true;
    });
    this.updateBoard();

    if (this.isGameOver()) {
      // notify about new  winner
    }
  }
}

module.exports = Game;
