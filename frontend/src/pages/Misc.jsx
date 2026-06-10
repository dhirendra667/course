import { Link } from 'react-router-dom';

export const Denied = () => (
  <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center', padding: 24 }}>
    <div style={{ fontSize: '4rem' }}>🚫</div>
    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800 }}>Access Denied</h1>
    <p style={{ color: 'var(--text-secondary)', maxWidth: 360 }}>You don't have permission to view this page. This area requires elevated privileges.</p>
    <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: 8 }}>← Back to Dashboard</Link>
  </div>
);

export const NotFound = () => (
  <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center', padding: 24 }}>
    <div style={{ fontSize: '4rem' }}>🌌</div>
    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800 }}>404 – Not Found</h1>
    <p style={{ color: 'var(--text-secondary)', maxWidth: 360 }}>The page you're looking for doesn't exist or has been moved.</p>
    <Link to="/" className="btn btn-primary" style={{ marginTop: 8 }}>Go Home</Link>
  </div>
);
