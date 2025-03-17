// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
       
        <Routes>
          <Route path="/home" element={
            <main>
               <Navbar />
              <Hero />
              <Projects />
              <Contact />
            </main>
          } />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;