import React from "react";
import Main from "./Main";
import { Route, Router, Routes, BrowserRouter } from "react-router-dom";
import Game from "./Game";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/game" element={<Game />} />
    </Routes>

  );
}

export default App;
