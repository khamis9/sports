import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courtsAPI, bookingsAPI } from '../services/api';
import { isAuthenticated } from '../services/auth';
import './Courts.css';

function CourtDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [court, setCourt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [bookingData, setBookingData] = useState({
    date: '',
    start_time: '',
    end_time: ''
  });

  useEffect(() => {
    fetchCourt();
  }, [id]);

  const fetchCourt = async () => {
    try {
      const response = await courtsAPI.getById(id);
      setCourt(response.data);
    } catch (err) {
      setError('Failed to load court details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    setError('');
    setSuccess('');

    try {
      await bookingsAPI.create({
        ...bookingData,
        court_id: id
      });
      setSuccess('Booking created successfully! Waiting for admin approval.');
      setBookingData({ date: '', start_time: '', end_time: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error && !court) return <div className="error-message">{error}</div>;

  return (
    <div className="page court-detail-page">
      <div className="container">
        <div className="court-detail-header">
          <div className="court-detail-icon">🏀</div>
          <h1 className="page-title">{court.name}</h1>
          <p>{court.description}</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="booking-form">
          <h3>Book This Court</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={bookingData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <label>Start Time</label>
              <input
                type="time"
                name="start_time"
                value={bookingData.start_time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Time</label>
              <input
                type="time"
                name="end_time"
                value={bookingData.end_time}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success btn-full">
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CourtDetail;
