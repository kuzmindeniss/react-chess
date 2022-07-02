import React from 'react';
import "./reset.css";
import "./index.css";
import Board from "components/Board/Board";

function App() {
  return (
    <div className="app">
      <Board/>
      <div className="app-bg"></div>
    </div>
  );
}

export default App;
