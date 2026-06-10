import { Link } from 'react-router-dom';
import './PublicNavbar.css';

const PublicNavbar = () => {
  return (
    <header className="public-navbar">
      <div className="public-navbar-container">
        <Link to="/" className="public-logo">
          <div className="public-logo-icon">⬡</div>
          <span>TaskMinder</span>
        </Link>

        <nav className="public-nav-links">
          <a href="#features">Features</a>
          <a href="#tech">Tech Stack</a>
          <a href="#about">About</a>
        </nav>

        <div className="public-nav-actions">
          <Link to="/signin" className="btn btn-ghost">
            Sign In
          </Link>

          <Link to="/signup" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;