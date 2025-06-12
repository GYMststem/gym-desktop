import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AttendanceSync from './components/AttendanceSync';
import MemberManagement from './components/MemberManagement';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/attendance" element={<AttendanceSync />} />
            <Route path="/members" element={<MemberManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 