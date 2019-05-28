require("module-alias/register");
const inquirer = require("inquirer");
const config = require("@configs");
const net = require("net");
const ui = new inquirer.ui.BottomBar();
const socketEvents = require("@constants/socketEvents");
const ClientPlayer = require("@components/client/base");
const TcpConnection = require("@components/connection/tcp");
const client = net.createConnection(
  { port: config.TCP_SERVER_PORT },
  async () => {
    const socket = new TcpConnection(client);
    const Player = new ClientPlayer(socket);

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

    Player.on(socketEvents.RECEIVED_GAMES_LIST, async ({ rooms }) => {
      if (rooms.length) {
        askSelectRoomQuestion(rooms);
      } else {
        noRoomsQuestion();
      }
    });
  }
);
