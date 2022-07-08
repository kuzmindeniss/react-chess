import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import "./reset.css";
import "./index.css";
import Board from "components/Board/Board";
import Main from "components/Main/Main";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="game" element={<Board/>} />
          <Route path="/" element={<Main/>} />
        </Routes>
      </BrowserRouter>
      <div className="app-bg"></div>
    </div>
  );
}

export default App;
