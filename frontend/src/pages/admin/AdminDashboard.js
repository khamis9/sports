import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Admin Dashboard</h1>

        <div className="admin-grid">
          <Link to="/admin/courts" className="admin-card">
            <div className="admin-icon">🏀</div>
            <h3>Manage Courts</h3>
            <p>Add, edit, and delete courts</p>
          </Link>

          <Link to="/admin/bookings" className="admin-card">
            <div className="admin-icon">📅</div>
            <h3>Manage Bookings</h3>
            <p>Approve or reject booking requests</p>
          </Link>

          <Link to="/leaderboard" className="admin-card">
            <div className="admin-icon">🏆</div>
            <h3>View Leaderboard</h3>
            <p>See top players and statistics</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
