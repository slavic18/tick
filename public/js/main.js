const websocketInstance = new WebSocket("ws://localhost:4446");
websocketInstance.onmessage = function(message) {
  console.log(message.data);
};
