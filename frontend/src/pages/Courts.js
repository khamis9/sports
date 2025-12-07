import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courtsAPI } from '../services/api';
import './Courts.css';

function Courts() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      const response = await courtsAPI.getAll();
      console.log('Courts response:', response.data);
      // Handle both array and object responses
      const courtsData = Array.isArray(response.data) ? response.data : [];
      setCourts(courtsData);
    } catch (err) {
      setError('Failed to load courts');
      console.error('Error fetching courts:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading courts...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Available Courts</h1>
        
        {courts.length === 0 ? (
          <div className="card">
            <p>No courts available yet.</p>
          </div>
        ) : (
          <div className="grid">
            {courts.map(court => (
              <Link to={`/courts/${court.id}`} key={court.id} className="court-card">
                <div className="court-icon">🏀</div>
                <h3>{court.name}</h3>
                <p>{court.description}</p>
                <button className="btn btn-primary">View Details</button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courts;
