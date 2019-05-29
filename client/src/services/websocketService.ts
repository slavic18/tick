import SocketEvents from "../constants/socketEvents";

const EventEmitter = require("events");

interface IWebsocketInstanceProps {
  onInitialized: (WebsocketService: WebsocketInstance) => void;
}

export default class WebsocketInstance extends EventEmitter {
  _props: IWebsocketInstanceProps;
  _socket: WebSocket;
  constructor(props: IWebsocketInstanceProps) {
    super();

    this._socket = new WebSocket("ws://localhost:4446");
    this._props = props;
    this._socket.onmessage = this.onMessage;
    this._socket.onopen = this.onOpen;
  }

  encodeMessage(message: string) {
    return JSON.stringify(message);
  }
  decodeMessage(message: string) {
    return JSON.parse(message);
  }
  sendMessage(message: string) {
    const preparedMessage = this.encodeMessage(message);
    this._socket!.send(preparedMessage);
  }
  onOpen = () => {
    this._props.onInitialized(this);
  };
  onMessage = (message: MessageEvent) => {
    const decodedMessage = this.decodeMessage(message.data);
    console.log(decodedMessage);
    this.emit(SocketEvents.NEW_MESSAGE, decodedMessage);
  };
}
