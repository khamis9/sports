import React, { useState, useEffect } from 'react';
import { authAPI, badgesAPI, matchesAPI } from '../services/api';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [matchForm, setMatchForm] = useState({
    opponent_name: '',
    score: '',
    opponent_score: ''
  });
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
    fetchBadges();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchBadges = async () => {
    try {
      const response = await badgesAPI.getMyBadges();
      const badgesData = Array.isArray(response.data) ? response.data : [];
      setBadges(badgesData);
    } catch (err) {
      console.error('Failed to load badges:', err);
    }
  };

  const handleMatchSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await matchesAPI.create(matchForm);
      setSuccess('Match result recorded! Points awarded.');
      setMatchForm({ opponent_name: '', score: '', opponent_score: '' });
      fetchProfile();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record match');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error && !user) return <div className="error-message">{error}</div>;

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">My Profile</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Level</h3>
            <p>{user.level}</p>
          </div>
          <div className="stat-card">
            <h3>Points</h3>
            <p>{user.points}</p>
          </div>
          <div className="stat-card">
            <h3>Wins</h3>
            <p>{user.wins}</p>
          </div>
          <div className="stat-card">
            <h3>Win Rate</h3>
            <p>{user.win_rate}%</p>
          </div>
        </div>

        <div className="profile-section">
          <h2>My Badges</h2>
          <div className="badges-container">
            {badges.length === 0 ? (
              <p>No badges earned yet. Keep playing!</p>
            ) : (
              badges.map((badge, index) => (
                <div key={index} className="badge-item">
                  <span className="badge-emoji">🏅</span>
                  <span>{badge.badge_name}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="profile-section">
          <h2>Record Match Result</h2>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <form onSubmit={handleMatchSubmit} className="match-form">
            <div className="form-group">
              <label>Opponent Name</label>
              <input
                type="text"
                value={matchForm.opponent_name}
                onChange={(e) => setMatchForm({...matchForm, opponent_name: e.target.value})}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Your Score</label>
                <input
                  type="number"
                  value={matchForm.score}
                  onChange={(e) => setMatchForm({...matchForm, score: e.target.value})}
                  required
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Opponent Score</label>
                <input
                  type="number"
                  value={matchForm.opponent_score}
                  onChange={(e) => setMatchForm({...matchForm, opponent_score: e.target.value})}
                  required
                  min="0"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Result
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
