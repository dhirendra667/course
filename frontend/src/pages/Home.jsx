import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  IoShieldCheckmarkOutline,
  IoPeopleOutline,
  IoCheckmarkDoneOutline,
  IoBarChartOutline,
  IoArrowForward,
} from 'react-icons/io5';

import PublicNavbar from '../components/Layout/PublicNavbar.jsx';

import './Home.css';

const FEATURES = [
  {
    icon: <IoShieldCheckmarkOutline />,
    title: 'JWT Authentication',
    desc: 'Secure authentication with protected routes and persistent login sessions.',
  },
  {
    icon: <IoPeopleOutline />,
    title: 'Role Based Access',
    desc: 'Admin and User roles with advanced permission handling and security.',
  },
  {
    icon: <IoCheckmarkDoneOutline />,
    title: 'Task Management',
    desc: 'Create, update, filter, organize, and track tasks with modern workflows.',
  },
  {
    icon: <IoBarChartOutline />,
    title: 'Dashboard Analytics',
    desc: 'Visual task overview with productivity insights and real-time statistics.',
  },
];

const STATS = [
  { value: '10K+', label: 'Tasks Managed' },
  { value: '99.9%', label: 'Secure Sessions' },
  { value: '24/7', label: 'Availability' },
  { value: 'MERN', label: 'Powered Stack' },
];

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="home-page">
      <PublicNavbar />

      <div className="home-glow" />

      {/* HERO */}

      <section className="hero-section">
        <div className="hero-content animate-fade">
          <div className="hero-badge">
            Modern MERN Stack Task Platform
          </div>

          <h1 className="hero-title">
            Organize work.
            <br />
            Manage tasks.
            <br />
            <span>Boost productivity.</span>
          </h1>

          <p className="hero-description">
            A scalable task management platform built with React, Redux Toolkit,
            Node.js, Express, MongoDB, JWT authentication, and role-based access control.
          </p>

          <div className="hero-actions">
            {user ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Dashboard
                <IoArrowForward />
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary btn-lg">
                  Get Started
                </Link>

                <Link to="/signin" className="btn btn-secondary btn-lg">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* RIGHT PREVIEW */}

        <div className="hero-preview animate-fade">
          <div className="preview-card">
            <div className="preview-top">
              <div className="preview-dots">
                <span />
                <span />
                <span />
              </div>

              <div className="preview-title">
                Dashboard Overview
              </div>
            </div>

            <div className="preview-stats">
              <div className="mini-stat">
                <h3>24</h3>
                <p>Total Tasks</p>
              </div>

              <div className="mini-stat">
                <h3>8</h3>
                <p>Completed</p>
              </div>

              <div className="mini-stat">
                <h3>5</h3>
                <p>High Priority</p>
              </div>
            </div>

            <div className="preview-task-list">
              <div className="preview-task">
                <div>
                  <h4>Design Dashboard UI</h4>
                  <p>In Progress</p>
                </div>

                <span className="badge badge-progress">
                  Active
                </span>
              </div>

              <div className="preview-task">
                <div>
                  <h4>Setup Backend APIs</h4>
                  <p>Completed</p>
                </div>

                <span className="badge badge-done">
                  Done
                </span>
              </div>

              <div className="preview-task">
                <div>
                  <h4>Authentication System</h4>
                  <p>High Priority</p>
                </div>

                <span className="badge badge-high">
                  High
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="stats-section animate-fade">
        {STATS.map((item) => (
          <div className="stats-card" key={item.label}>
            <h3>{item.value}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </section>

      {/* FEATURES */}

      <section className="features-section" id="features">
        <div className="section-heading">
          <p className="section-tag">FEATURES</p>

          <h2>
            Everything needed for
            <span> modern task management</span>
          </h2>

          <p>
            Clean architecture, scalable backend, secure authentication,
            and responsive dashboard experience.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((feature) => (
            <div className="feature-card animate-fade" key={feature.title}>
              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK */}

      <section className="tech-section" id="tech">
        <p className="tech-label">BUILT WITH</p>

        <div className="tech-pills">
          {[
            'React',
            'Redux Toolkit',
            'Node.js',
            'Express',
            'MongoDB',
            'JWT',
            'REST API',
            'CSS',
          ].map((item) => (
            <span className="tech-pill" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="cta-section" id="about">
        <div className="cta-card">
          <h2>Start managing tasks smarter.</h2>

          <p>
            Build productivity workflows with secure authentication,
            organized dashboards, and scalable backend architecture.
          </p>

          {!user && (
            <Link to="/signup" className="btn btn-primary btn-lg">
              Create Free Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;


// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import './Home.css';

// const Home = () => {
//   const { user } = useSelector((state) => state.auth);

//   return (
//     <div className="home-page">
//       <div className="home-glow" />
//       <div className="home-grid-bg" />

//       <div className="home-hero animate-fade">
//         <div className="home-tag">Scalable · Secure · Fast</div>
//         <h1 className="home-headline">
//           Task Management<br />
//           <span className="headline-accent">Built for Teams</span>
//         </h1>
//         <p className="home-desc">
//           A full-stack platform with JWT authentication, role-based access, and real-time CRUD — designed to scale.
//         </p>
//         <div className="home-actions">
//           {user ? (
//             <Link to="/dashboard" className="btn btn-primary btn-lg">Go to Dashboard →</Link>
//           ) : (
//             <>
//               <Link to="/signup" className="btn btn-primary btn-lg">Get Started Free</Link>
//               <Link to="/signin" className="btn btn-secondary btn-lg">Sign In</Link>
//             </>
//           )}
//         </div>
//       </div>

//       <div className="home-features animate-fade">
//         {[
//           { icon: '🔐', title: 'JWT Auth', desc: 'Secure cookie-based token handling with automatic refresh.' },
//           { icon: '👥', title: 'Role-Based Access', desc: 'USER and ADMIN roles with protected routes and granular permissions.' },
//           { icon: '✅', title: 'Task CRUD', desc: 'Create, filter, update, and delete tasks with priority and status tracking.' },
//           { icon: '📊', title: 'Admin Dashboard', desc: 'Manage all users and tasks from a centralized admin panel.' },
//         ].map((f) => (
//           <div key={f.title} className="feature-card">
//             <div className="feature-icon">{f.icon}</div>
//             <h3 className="feature-title">{f.title}</h3>
//             <p className="feature-desc">{f.desc}</p>
//           </div>
//         ))}
//       </div>

//       <div className="tech-stack animate-fade">
//         <p className="tech-label">Built with</p>
//         <div className="tech-pills">
//           {['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'].map((t) => (
//             <span key={t} className="tech-pill">{t}</span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
