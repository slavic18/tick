const uuid = require("uuid");

class GameInterface {
  create() {
    throw new Error("create method should be implemented");
  }

  addPlayer() {
    throw new Error("addPlayer method should be implemented");
  }
  removePlayer() {
    throw new Error("removePlayer method should be implemented");
  }

  addSpectator() {
    throw new Error("addSpectator method should be implemented");
  }
  removeSpectator() {
    throw new Error("removeSpectator method should be implemented");
  }

  updateBoard() {
    throw new Error("updateBoard method should be implemented");
  }

  currentTurn() {
    throw new Error("currentTurn method should be implemented");
  }

  destroy() {
    throw new Error("destroy method should be implemented");
  }
}

class Game extends GameInterface {
  constructor() {
    super();
    this.id = uuid();
    this.board = this.createBoard();
    this.players = new Map();
  }
  createBoard() {
    return [[null, null, null], [null, null, null], [null, null, null]];
  }
  checkWinner() {
    const currentPlayerPositions = player.getMovesPlayed();
    const winsCombination = [7, 56, 448, 73, 146, 292, 273, 84];
    winsCombination.forEach(function(winningPosition) {
      // We're checking for every winning position if the player has achieved it.
      // Keep in mind that we are using a bitwise AND here not a logical one.PlaysArr
      if (winningPosition & (currentPlayerPositions == winningPosition)) {
        // wins;
      }
    });
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
    this.players.set(player.id, player);
  }
}

module.exports = Game;
