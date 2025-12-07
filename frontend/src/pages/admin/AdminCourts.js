import React, { useState, useEffect } from 'react';
import { courtsAPI } from '../../services/api';
import './AdminDashboard.css';

function AdminCourts() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      const response = await courtsAPI.getAll();
      const courtsData = Array.isArray(response.data) ? response.data : [];
      setCourts(courtsData);
    } catch (err) {
      setError('Failed to load courts');
      console.error('Error fetching courts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingId) {
        await courtsAPI.update(editingId, formData);
        setSuccess('Court updated successfully');
      } else {
        await courtsAPI.create(formData);
        setSuccess('Court created successfully');
      }
      setFormData({ name: '', description: '' });
      setEditingId(null);
      fetchCourts();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (court) => {
    setFormData({
      name: court.name,
      description: court.description
    });
    setEditingId(court.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this court?')) return;

    try {
      await courtsAPI.delete(id);
      setSuccess('Court deleted successfully');
      fetchCourts();
    } catch (err) {
      setError('Failed to delete court');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Manage Courts</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="admin-section">
          <h2>{editingId ? 'Edit Court' : 'Add New Court'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Court Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="4"
              />
            </div>

            <div style={{display: 'flex', gap: '10px'}}>
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Court' : 'Add Court'}
              </button>
              {editingId && (
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ name: '', description: '' });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-section">
          <h2>Existing Courts</h2>
          <div className="court-list">
            {courts.map(court => (
              <div key={court.id} className="court-item">
                <div className="court-item-info">
                  <h3>{court.name}</h3>
                  <p>{court.description}</p>
                </div>
                <div className="court-item-actions">
                  <button 
                    className="btn btn-primary btn-small"
                    onClick={() => handleEdit(court)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger btn-small"
                    onClick={() => handleDelete(court.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCourts;
