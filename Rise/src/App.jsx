import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Footer';
import InstaCodes from './pages/InstaCodes';
import AdminLogin from './pages/AdminLogin';
import AdminCMS from './pages/AdminCMS';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/instaCodes" element={<InstaCodes />} />
          <Route path="/home" element={
            <main>
              <Navbar />
              <Hero />
              <Projects />
              <Contact />
            </main>
          } />
          <Route path="/auth/abcdef/admin-login" element={<AdminLogin />} />
          <Route path="/auth/abcdef/admin" element={
            <ProtectedRoute>
              <AdminCMS />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/instaCodes" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
