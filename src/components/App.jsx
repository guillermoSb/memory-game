import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './Main.jsx';
import Game from './Game.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
