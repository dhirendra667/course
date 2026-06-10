import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileAPI } from '../services/auth.service.js';
import { fetchProfile } from '../store/slices/authSlice.js';
import toast from 'react-hot-toast';
import './Profile.css';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ fullName: user?.fullName || '', avatar: user?.avatar || '' });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfileAPI(form);
      await dispatch(fetchProfile());
      toast.success('Profile updated!');
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content" style={{ maxWidth: 600 }}>
        <h1 className="page-title" style={{ marginBottom: 24 }}>My Profile</h1>

        <div className="card animate-fade">
          <div className="profile-avatar-section">
            <div className="profile-avatar-lg">
              {user?.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{user?.fullName}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{user?.email}</p>
              <span className={`badge badge-${user?.role.toLowerCase()}`} style={{ marginTop: 8 }}>{user?.role}</span>
            </div>
          </div>

          <div className="divider" />

          {editing ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  className="form-input"
                  name="fullName"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="button" className="btn btn-secondary btn-full" onClick={() => setEditing(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                  {loading ? <span className="spinner" /> : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="profile-field">
                <span className="form-label">Full Name</span>
                <span>{user?.fullName}</span>
              </div>
              <div className="profile-field">
                <span className="form-label">Email</span>
                <span>{user?.email}</span>
              </div>
              <div className="profile-field">
                <span className="form-label">Role</span>
                <span className={`badge badge-${user?.role.toLowerCase()}`}>{user?.role}</span>
              </div>
              <button className="btn btn-secondary" style={{ marginTop: 8 }} onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
