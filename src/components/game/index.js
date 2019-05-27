class GameInterface {
  create() {
    throw new Error("create method should be implemented");
  }

  addPlayer() {}
  removePlayer() {}

  addSpectator() {}
  removeSpectator() {}

  updateBoard() {}

  currentTurn() {}

  destroy() {
    throw new Error("destroy method should be implemented");
  }
}

class Game extends GameInterface {
  get currentTurn() {}
}

module.exports = Game;
