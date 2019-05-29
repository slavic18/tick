import * as React from "react";
import { toast } from "react-toastify";
import Initial from "./Initial";
import GameBoard from "./GameBoard";
import ListOfRooms from "./ListOfRooms";
import SocketEvents from "./../../constants/socketEvents";
import WebsocketService from "./../../services/websocketService";
import Player from "./../../services/player";

enum GameStatuses {
  INITIAL = "INITIAL",
  INITIALIZED = "INITIALIZED",
  SHOW_LIST_OF_ROOMS = "SHOW_LIST_OF_ROOMS",
  SHOW_BOARD = "SHOW_BOARD",
  GAME = "GAME"
}

export default function Game() {
  const [status, setStatus] = React.useState(GameStatuses.INITIAL);
  const [playerInstance, setPlayerInstance] = React.useState<
    Player | undefined
  >(undefined);
  const [rooms, setRooms] = React.useState<any[] | undefined>(undefined);
  const [board, setBoard] = React.useState<any[] | undefined>(undefined);
  const onWesocketInitialized = (websocketInstance: WebsocketService) => {
    setPlayerInstance(new Player(websocketInstance));
    setStatus(GameStatuses.INITIALIZED);
  };

  React.useEffect(() => {
    new WebsocketService({
      onInitialized: onWesocketInitialized
    });
  }, []);

  const isInitialized = status === GameStatuses.INITIALIZED;

  // socket events callbacks
  const onReceivingGamesList = ({ rooms }: { rooms: any[] }) => {
    if (!rooms.length) {
      return toast.info("No rooms yet");
    }
    setRooms(rooms);
    setStatus(GameStatuses.SHOW_LIST_OF_ROOMS);
  };
  const onJoinGame = () => {
    setBoard(playerInstance!.getBoard());
    setStatus(GameStatuses.GAME);
  };

  const onUpdateBoard = ({ board }: { board: any }) => {
    setBoard(board);
  };

  React.useEffect(() => {
    if (isInitialized && playerInstance) {
      // attach socket listeners
      playerInstance.on(SocketEvents.RECEIVED_GAMES_LIST, onReceivingGamesList);
      playerInstance.on(SocketEvents.JOIN_GAME, onJoinGame);
      playerInstance.on(SocketEvents.CREATED_NEW_GAME, onJoinGame);
      playerInstance.on(SocketEvents.UPDATE_BOARD, onUpdateBoard);
    }
  }, [isInitialized]);

  const onFirstButtonClick = () => {
    playerInstance!.createNewGame();
  };
  const onSecondButtonClick = () => {
    playerInstance!.fetchListOfGames();
  };
  const onRoomClick = (roomId: string) => {
    playerInstance!.joinGameRoom(roomId);
  };
  const onBoardSquareClick = (rowId: number, columnId: number) => {
    playerInstance!.move(rowId, columnId);
  };

  const mountInitialScreen = status === GameStatuses.INITIALIZED;
  const mountRoomsListScreen = status === GameStatuses.SHOW_LIST_OF_ROOMS;
  const mountBoard = status === GameStatuses.GAME;

  return (
    <div className="container">
      {mountInitialScreen ? (
        <Initial
          onFirstButtonClick={onFirstButtonClick}
          onSecondButtonClick={onSecondButtonClick}
        />
      ) : null}
      {mountRoomsListScreen ? (
        <ListOfRooms rooms={rooms!} onClick={onRoomClick} />
      ) : null}
      {mountBoard ? (
        <GameBoard board={board} onClick={onBoardSquareClick} />
      ) : null}
    </div>
  );
}
