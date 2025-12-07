import React, { useState, useEffect } from 'react';
import { challengesAPI } from '../services/api';
import './Challenges.css';

function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const response = await challengesAPI.getAll();
      const challengesData = Array.isArray(response.data) ? response.data : [];
      setChallenges(challengesData);
    } catch (err) {
      setError('Failed to load challenges');
      console.error('Error fetching challenges:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (challengeId) => {
    setError('');
    setSuccess('');
    
    try {
      await challengesAPI.complete(challengeId);
      setSuccess('Challenge completed! Points awarded.');
      fetchChallenges();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to complete challenge');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error && challenges.length === 0) return <div className="error-message">{error}</div>;

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Weekly Challenges</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="grid">
          {challenges.map(challenge => (
            <div key={challenge.id} className="challenge-card">
              <div className="challenge-icon">🎯</div>
              <h3>{challenge.title}</h3>
              <p>{challenge.description}</p>
              <div className="challenge-reward">
                <span>🏆 {challenge.points_reward} Points</span>
              </div>
              
              {challenge.is_completed ? (
                <button className="btn btn-success" disabled>
                  ✓ Completed
                </button>
              ) : (
                <button 
                  className="btn btn-primary"
                  onClick={() => handleComplete(challenge.id)}
                >
                  Complete Challenge
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Challenges;
