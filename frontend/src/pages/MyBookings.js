import React, { useState, useEffect } from 'react';
import { bookingsAPI } from '../services/api';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getMyBookings();
      const bookingsData = Array.isArray(response.data) ? response.data : [];
      setBookings(bookingsData);
    } catch (err) {
      setError('Failed to load bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="card">
            <p>You don't have any bookings yet.</p>
          </div>
        ) : (
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Court</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.court?.name}</td>
                    <td>{booking.date}</td>
                    <td>{booking.start_time} - {booking.end_time}</td>
                    <td>
                      <span className={`badge badge-${booking.status}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
