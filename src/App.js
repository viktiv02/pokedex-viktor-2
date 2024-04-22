import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pokedex from './components/Pokedex';
import Pokemon from './components/Pokemon';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
