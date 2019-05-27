require("module-alias/register");
const inquirer = require("inquirer");
const config = require("@configs/index.js");
const net = require("net");
const ui = new inquirer.ui.BottomBar();
const Rx = require("rxjs");

const client = net.createConnection(
  { port: config.TCP_SERVER_PORT },
  async () => {
    const firstQuestionAnswer = await inquirer.prompt({
      name: "answer",
      type: "list",
      choices: [
        {
          name: "Create a new game?",
          value: "CREATE_NEW_GAME"
        },
        {
          name: "Check the list of games",
          value: "LIST_OF_GAMES"
        }
      ]
    });

    if (firstQuestionAnswer["answer"] === "CREATE_NEW_GAME") {
      client.write(firstQuestionAnswer.answer);
    }

    console.log(firstQuestionAnswer["answer"]);
  }
);
