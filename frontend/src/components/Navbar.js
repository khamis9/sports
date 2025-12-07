import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, isAdmin, logout } from '../services/auth';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const admin = isAdmin();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            🏀 Sports Booking
          </Link>
          
          <div className="navbar-links">
            <Link to="/courts" className="nav-link">Courts</Link>
            <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
            
            {authenticated ? (
              <>
                <Link to="/my-bookings" className="nav-link">My Bookings</Link>
                <Link to="/challenges" className="nav-link">Challenges</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
                {admin && (
                  <Link to="/admin" className="nav-link admin-link">Admin</Link>
                )}
                <button onClick={handleLogout} className="btn btn-danger">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/register" className="btn btn-success">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
