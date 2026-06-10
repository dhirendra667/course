import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../store/slices/authSlice.js';
import toast from 'react-hot-toast';
import './Auth.css';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    if (user) navigate('/dashboard');
    return () => dispatch(clearError());
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(form));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success(`Welcome back, ${res.payload.user.fullName.split(' ')[0]}!`);
      navigate('/dashboard');
    } else {
      toast.error(res.payload || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow" />
      <div className="auth-card animate-fade">
        <div className="auth-brand">
          <span className="logo-mark" style={{ fontSize: '2rem', color: 'var(--accent)' }}>⬡</span>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your PrimeTrade account</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={isLoading} style={{ marginTop: 8 }}>
            {isLoading ? <span className="spinner" /> : 'Sign In'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>

        <div className="auth-demo">
          <p className="form-label" style={{ textAlign: 'center', marginBottom: 8 }}>Demo credentials</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary btn-sm btn-full" onClick={() => setForm({ email: 'admin@demo.com', password: 'admin123' })}>
              Admin
            </button>
            <button className="btn btn-secondary btn-sm btn-full" onClick={() => setForm({ email: 'user@demo.com', password: 'user1234' })}>
              User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
