(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,n,t){e.exports=t(33)},23:function(e,n,t){},24:function(e,n,t){},25:function(e,n,t){},32:function(e,n,t){},33:function(e,n,t){"use strict";t.r(n);var o,a=t(1),c=t.n(a),i=t(2),s=t.n(i),r=t(4),E=t(9),u=(t(23),function(e){var n=e.onFirstButtonClick,t=e.onSecondButtonClick;return c.a.createElement("div",{className:"initialscreen"},c.a.createElement("button",{type:"button",className:"btn btn-primary initialscreen__button",onClick:n},"Create a new game"),c.a.createElement("button",{type:"button",className:"btn btn-primary initialscreen__button",onClick:t},"Join existing games"))}),l=(t(24),function(e){var n=e.board,t=e.onClick;return c.a.createElement("div",{className:"gameboard"},n.map(function(e,n){return c.a.createElement("div",{className:"row",key:n},e.map(function(e,o){return c.a.createElement("div",{className:"square",key:"".concat(n,"_").concat(o),onClick:function(){return t(n,o)}},e?e.symbol:null)}))}))}),_=(t(25),function(e){var n=e.rooms,t=e.onClick;return c.a.createElement("div",{className:"roomslist"},c.a.createElement("h3",{className:"text-center"},"List of gaming rooms"),n.map(function(e){return c.a.createElement("button",{key:e.id,type:"button",className:"btn btn-primary initialscreen__button",onClick:function(){return t(e.id)}},"Join ",e.id," room")}))});!function(e){e.NEW_MESSAGE="NEW_MESSAGE",e.CREATE_NEW_GAME="CREATE_NEW_GAME",e.CREATED_NEW_GAME="CREATED_NEW_GAME",e.JOIN_GAME="JOIN_GAME",e.EXIT_FROM_GAME="EXIT_FROM_GAME",e.UPDATE_BOARD="UPDATE_BOARD",e.GET_GAMES_LIST="GET_GAMES_LIST",e.RECEIVED_GAMES_LIST="RECEIVED_GAMES_LIST",e.REFRESH_GAMES_LIST="REFRESH_GAMES_LIST",e.PLAYER_MOVE="PLAYER_MOVE"}(o||(o={}));var m,A=o,I=t(5),M=t(6),f=t(11),O=t(8),S=t(7),d=t(10),b=function(e){function n(e){var t;return Object(I.a)(this,n),(t=Object(f.a)(this,Object(O.a)(n).call(this)))._props=void 0,t._socket=void 0,t.onOpen=function(){t._props.onInitialized(Object(S.a)(t))},t.onMessage=function(e){var n=t.decodeMessage(e.data);t.emit(A.NEW_MESSAGE,n)},t._socket=new WebSocket("ws://localhost:4446"),t._props=e,t._socket.onmessage=t.onMessage,t._socket.onopen=t.onOpen,t}return Object(d.a)(n,e),Object(M.a)(n,[{key:"encodeMessage",value:function(e){return JSON.stringify(e)}},{key:"decodeMessage",value:function(e){return JSON.parse(e)}},{key:"sendMessage",value:function(e){var n=this.encodeMessage(e);this._socket.send(n)}}]),n}(t(13)),G=function(e){function n(e){var t;return Object(I.a)(this,n),(t=Object(f.a)(this,Object(O.a)(n).call(this))).onMessage=function(e){switch(e.type){case A.GET_GAMES_LIST:t.emit(A.RECEIVED_GAMES_LIST,{rooms:e.rooms});break;case A.JOIN_GAME:t.emit(A.JOIN_GAME);break;case A.CREATED_NEW_GAME:t.emit(A.CREATED_NEW_GAME);break;case A.UPDATE_BOARD:t.emit(A.UPDATE_BOARD,{board:e.board})}},t.createNewGame=function(){t.sendMessage({type:A.CREATE_NEW_GAME})},t.fetchListOfGames=function(){t.sendMessage({type:A.GET_GAMES_LIST})},t.joinGameRoom=function(e){t.sendMessage({type:A.JOIN_GAME,roomId:e})},t.move=function(e,n){t.sendMessage({type:A.PLAYER_MOVE,x:e,y:n})},t._socket=e,t._socket.on(A.NEW_MESSAGE,t.onMessage),t}return Object(d.a)(n,e),Object(M.a)(n,[{key:"sendMessage",value:function(e){this._socket.sendMessage(e)}},{key:"getBoard",value:function(){return[[null,null,null],[null,null,null],[null,null,null]]}}]),n}(t(13));function N(){var e=a.useState(m.INITIAL),n=Object(r.a)(e,2),t=n[0],o=n[1],c=a.useState(void 0),i=Object(r.a)(c,2),s=i[0],I=i[1],M=a.useState(void 0),f=Object(r.a)(M,2),O=f[0],S=f[1],d=a.useState(void 0),N=Object(r.a)(d,2),T=N[0],v=N[1],k=function(e){I(new G(e)),o(m.INITIALIZED)};a.useEffect(function(){new b({onInitialized:k})},[]);var R=t===m.INITIALIZED,p=function(e){var n=e.rooms;if(!n.length)return E.b.info("No rooms yet");S(n),o(m.SHOW_LIST_OF_ROOMS)},g=function(){v(s.getBoard()),o(m.GAME)},L=function(e){var n=e.board;v(n)};a.useEffect(function(){R&&s&&(s.on(A.RECEIVED_GAMES_LIST,p),s.on(A.JOIN_GAME,g),s.on(A.CREATED_NEW_GAME,g),s.on(A.UPDATE_BOARD,L))},[R]);var D=t===m.INITIALIZED,y=t===m.SHOW_LIST_OF_ROOMS,C=t===m.GAME;return a.createElement("div",{className:"container"},D?a.createElement(u,{onFirstButtonClick:function(){s.createNewGame()},onSecondButtonClick:function(){s.fetchListOfGames()}}):null,y?a.createElement(_,{rooms:O,onClick:function(e){s.joinGameRoom(e)}}):null,C?a.createElement(l,{board:T,onClick:function(e,n){s.move(e,n)}}):null)}!function(e){e.INITIAL="INITIAL",e.INITIALIZED="INITIALIZED",e.SHOW_LIST_OF_ROOMS="SHOW_LIST_OF_ROOMS",e.SHOW_BOARD="SHOW_BOARD",e.GAME="GAME"}(m||(m={}));t(30),t(31),t(32);var T=function(){return c.a.createElement("div",{className:"App"},c.a.createElement(N,null),c.a.createElement(E.a,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(c.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,1,2]]]);
//# sourceMappingURL=main.61461469.chunk.js.map