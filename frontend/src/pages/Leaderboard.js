import React, { useState, useEffect } from 'react';
import { leaderboardAPI } from '../services/api';
import './Leaderboard.css';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await leaderboardAPI.getLeaderboard();
      const leaderboardData = Array.isArray(response.data) ? response.data : [];
      setLeaderboard(leaderboardData);
    } catch (err) {
      setError('Failed to load leaderboard');
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">🏆 Leaderboard</h1>

        <div className="leaderboard-container">
          {leaderboard.map((user, index) => (
            <div key={user.id} className={`leaderboard-item rank-${index + 1}`}>
              <div className="rank">{user.rank}</div>
              <div className="player-info">
                <h3>{user.name}</h3>
                <p>Level {user.level}</p>
              </div>
              <div className="player-stats">
                <div className="stat">
                  <span className="stat-label">Points</span>
                  <span className="stat-value">{user.points}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Wins</span>
                  <span className="stat-value">{user.wins}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Win Rate</span>
                  <span className="stat-value">{user.win_rate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
