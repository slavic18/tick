import React from "react";
import Game from "./components/Game";
import { ToastContainer } from "react-toastify";

// import styles
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Game />
      <ToastContainer />
    </div>
  );
};

export default App;
