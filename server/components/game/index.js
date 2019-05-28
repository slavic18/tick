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
    const { board } = this;
    const isGameOver = false;
    // These are all of the possible combinations
    // that would win the game
    // var rows = [
    //   board[0][0] + board[1] + board[2],
    //   board[0] + board[1] + board[2],
    //   board[0] + board[1] + board[2],
    //   board[0] + board[1] + board[2],

    //   state.b0 + state.b1 + state.b2,
    //   state.c0 + state.c1 + state.c2,
    //   state.a0 + state.b1 + state.c2,
    //   state.a2 + state.b1 + state.c0,
    //   state.a0 + state.b0 + state.c0,
    //   state.a1 + state.b1 + state.c1,
    //   state.a2 + state.b2 + state.c2
    // ];

    // return isGameOver;
    // const currentPlayerPositions = player.getMovesPlayed();
    // const winsCombination = [7, 56, 448, 73, 146, 292, 273, 84];
    // winsCombination.forEach(function(winningPosition) {
    //   // We're checking for every winning position if the player has achieved it.
    //   // Keep in mind that we are using a bitwise AND here not a logical one.PlaysArr
    //   if (winningPosition & (currentPlayerPositions == winningPosition)) {
    //     // wins;
    //   }
    // });
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

  addPlayer(player) {
    this.addPlayerListeners(player);
    if (this.players.size === 1) {
      player.type = Player.types.X;
      player.currentTurn = true;
    } else if (this.players.size === 2) {
      player.type = Player.types.Y;
    } else {
      player.type = Player.types.VIEWER;
    }

    this.players.set(player.id, player);
  }
  addPlayerListeners(player) {
    player.on(socketEvent.PLAYER_MOVE, this.handlePlayerMove);
  }

  canDoMove({ x, y }) {
    const slot = this.board[x][y];
    if (slot) {
      // slot is already  ocupied
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
    if (currentPlayer.type === Player.TYPE_VIEWER) {
      return;
    }
    if (!currentPlayer.currentTurn) {
      return;
    }
    if (!this.canDoMove({ x, y })) {
      return;
    }
    this.occupyField({ x, y }, currentPlayer.type);
    if (this.isGameOver()) {
    }
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
  }
}

module.exports = Game;
