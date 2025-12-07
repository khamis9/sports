import React, { useState, useEffect } from 'react';
import { bookingsAPI } from '../../services/api';
import './AdminDashboard.css';

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getAllBookings();
      const bookingsData = Array.isArray(response.data) ? response.data : [];
      setBookings(bookingsData);
    } catch (err) {
      setError('Failed to load bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setError('');
    setSuccess('');
    
    try {
      await bookingsAPI.approve(id);
      setSuccess('Booking approved! User earned points.');
      fetchBookings();
    } catch (err) {
      setError('Failed to approve booking');
    }
  };

  const handleReject = async (id) => {
    setError('');
    setSuccess('');
    
    try {
      await bookingsAPI.reject(id);
      setSuccess('Booking rejected');
      fetchBookings();
    } catch (err) {
      setError('Failed to reject booking');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Manage Bookings</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="table">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Court</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.user?.name}</td>
                  <td>{booking.court?.name}</td>
                  <td>{booking.date}</td>
                  <td>{booking.start_time} - {booking.end_time}</td>
                  <td>
                    <span className={`badge badge-${booking.status}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    {booking.status === 'pending' && (
                      <div style={{display: 'flex', gap: '10px'}}>
                        <button 
                          className="btn btn-success btn-small"
                          onClick={() => handleApprove(booking.id)}
                        >
                          Approve
                        </button>
                        <button 
                          className="btn btn-danger btn-small"
                          onClick={() => handleReject(booking.id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminBookings;
