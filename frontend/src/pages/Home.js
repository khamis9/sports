import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';
import './Home.css';

function Home() {
  const authenticated = isAuthenticated();

  return (
    <div className="home">
      <div className="hero">
        <div className="container">
          <h1 className="hero-title">Welcome to Sports Court Booking</h1>
          <p className="hero-subtitle">
            Book courts, play matches, earn points, and climb the leaderboard!
          </p>
          
          {!authenticated ? (
            <div className="hero-actions">
              <Link to="/register" className="btn btn-success btn-lg">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-primary btn-lg">
                Login
              </Link>
            </div>
          ) : (
            <div className="hero-actions">
              <Link to="/courts" className="btn btn-primary btn-lg">
                Browse Courts
              </Link>
              <Link to="/challenges" className="btn btn-success btn-lg">
                View Challenges
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="container">
        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">🏀</div>
            <h3>Book Courts</h3>
            <p>Browse and book various sports courts easily</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Earn Points</h3>
            <p>Get points for bookings and completing challenges</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🥇</div>
            <h3>Climb Leaderboard</h3>
            <p>Compete with others and reach the top</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎖️</div>
            <h3>Unlock Badges</h3>
            <p>Earn badges for your achievements</p>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Start Playing?</h2>
          <p>Join our community and start your journey today!</p>
          <Link to="/courts" className="btn btn-primary btn-lg">
            View Courts
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
