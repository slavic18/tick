require("module-alias/register");
const inquirer = require("inquirer");
const net = require("net");
const Rx = require("rxjs");
const config = require("@configs");
const socketEvents = require("@constants/socketEvents");
const ClientPlayer = require("./clientPlayer");
const TcpConnection = require("@components/client/tcp");

const ui = new inquirer.ui.BottomBar();
const prompts = new Rx.Subject();

const client = net.createConnection(
  { port: config.TCP_SERVER_PORT },
  async () => {
    const socket = new TcpConnection(client);
    const Player = new ClientPlayer(socket);

    async function renderBoard({ board }) {
      let boardMessage = board.reduce((acc, current) => {
        acc += current.reduce((acc, current) => {
          acc += current ? ` | ${current.symbol}| ` : " |  | ";
          return acc;
        }, "");
        acc += "\r\n";
        return acc;
      }, "---------------------\r\n");

      boardMessage += "---------------------\r\n";
      ui.log.write(boardMessage);
    }

    function moveQuestion() {
      return {
        name: "keywords",
        type: "input",
        message: "Type comma-separated x, y values from 1 to 3 ",
        validate: function(input) {
          const done = this.async();
          const splittedResponse = input.split(",");
          try {
            if (splittedResponse.length > 2 || splittedResponse.length < 0) {
              throw new Error(
                "You need to provide correct number of parameters"
              );
            }
            splittedResponse.forEach(item => {
              const preparedItem = Number(item);
              if (typeof preparedItem === "NaN") {
                throw new Error("You need to provide a number");
              }
              if (preparedItem > 3 || preparedItem < 1) {
                throw new Error("Values could be between 1 and 3 ");
              }
            });
          } catch (e) {
            done(e.message);
          }
          done(null, true);
        }
      };
    }
    async function startGame() {
      inquirer.prompt(prompts).ui.process.subscribe(
        ({ answer }) => {
          const [x, y] = answer.split(",");
          Player.move(x - 1, y - 1);
          if (answer !== "") {
            prompts.next(moveQuestion());
          } else {
            prompts.complete();
          }
        },
        err => {
          console.warn(err);
        },
        () => {
          console.log("Game was ended. Good bye! 👋\n");
        }
      );

      prompts.next(moveQuestion());
    }
    (function subscribeToPlayerEvents() {
      Player.on(socketEvents.RECEIVED_GAMES_LIST, async ({ rooms }) => {
        if (rooms.length) {
          askSelectRoomQuestion(rooms);
        } else {
          noRoomsQuestion();
        }
      });
      Player.on(socketEvents.UPDATE_BOARD, renderBoard);
      Player.on(socketEvents.CREATED_NEW_GAME, startGame);
      Player.on(socketEvents.JOIN_GAME, startGame);
    })();

    async function askFirstQuestion() {
      const QUESTION_NAME = "Question";
      const question = await inquirer.prompt({
        name: QUESTION_NAME,
        type: "list",
        choices: [
          {
            name: "Create a new game?",
            value: socketEvents.CREATE_NEW_GAME
          },
          {
            name: "Check the list of games",
            value: socketEvents.GET_GAMES_LIST
          }
        ]
      });

      if (question[QUESTION_NAME] === socketEvents.CREATE_NEW_GAME) {
        Player.createNewGame();
      }
      if (question[QUESTION_NAME] === socketEvents.GET_GAMES_LIST) {
        Player.fetchListOfGames();
      }
    }
    async function noRoomsQuestion() {
      const QUESTION_NAME = "Question";
      const question = await inquirer.prompt({
        name: QUESTION_NAME,
        type: "list",
        choices: [
          {
            name: "Create a new game?",
            value: socketEvents.CREATE_NEW_GAME
          },
          {
            name: "Refresh the list of games",
            value: socketEvents.GET_GAMES_LIST
          }
        ]
      });

      if (question[QUESTION_NAME] === socketEvents.CREATE_NEW_GAME) {
        Player.createNewGame();
      }
      if (question[QUESTION_NAME] === socketEvents.GET_GAMES_LIST) {
        Player.fetchListOfGames();
      }
    }
    askFirstQuestion();

    async function askSelectRoomQuestion(rooms) {
      const QUESTION_NAME = "Select what room you would like to join";
      const choices = rooms.reduce((acc, current) => {
        acc.push({
          name: current.name,
          value: current.id
        });
        return acc;
      }, []);
      const question = await inquirer.prompt({
        name: QUESTION_NAME,
        type: "list",
        choices
      });
      Player.joinGameRoom(question[QUESTION_NAME]);
    }
  }
);
