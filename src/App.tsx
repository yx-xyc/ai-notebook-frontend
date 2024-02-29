import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotePage from './pages/NotePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Hello world!</h1>} />
        <Route path="/users/:userId/notes/:noteId" element={<NotePage />} />
      </Routes>
    </div>
  );
}

export default App;
