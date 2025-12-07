import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Courts from './pages/Courts';
import CourtDetail from './pages/CourtDetail';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Challenges from './pages/Challenges';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourts from './pages/admin/AdminCourts';
import AdminBookings from './pages/admin/AdminBookings';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courts" element={<Courts />} />
          <Route path="/courts/:id" element={<CourtDetail />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          
          {/* Protected Routes */}
          <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/challenges" element={<PrivateRoute><Challenges /></PrivateRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/courts" element={<AdminRoute><AdminCourts /></AdminRoute>} />
          <Route path="/admin/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
