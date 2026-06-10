import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice.js';
import toast from 'react-hot-toast';
import './Navbar.css';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: '⊞' },
  { to: '/tasks',     label: 'Tasks',     icon: '✓' },
  { to: '/profile',   label: 'Profile',   icon: '◎' },
];

const ADMIN_ITEMS = [
  { to: '/admin', label: 'Users', icon: '⊛' },
];

const Sidebar = () => {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success('Signed out');
    navigate('/signin');
  };

  const isActive = (path) => location.pathname === path;

  if (!user) return null;

  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar-logo">
        <div className="logo-icon">⬡</div>
        <span className="logo-text">TaskMinder</span>
      </Link>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <Link key={item.to} to={item.to} className={`nav-item ${isActive(item.to) ? 'active' : ''}`}>
            <span className="nav-item-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}

        {user.role === 'ADMIN' && ADMIN_ITEMS.map((item) => (
          <Link key={item.to} to={item.to} className={`nav-item ${isActive(item.to) ? 'active' : ''}`}>
            <span className="nav-item-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-row" onClick={handleLogout} title="Sign out">
          <div className="user-avatar">{user.fullName.charAt(0).toUpperCase()}</div>
          <div className="user-info">
            <div className="user-name">{user.fullName}</div>
            <div className="user-role">{user.role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export const Topbar = () => {
  const { user } = useSelector((s) => s.auth);
  if (!user) return null;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <header className="topbar">
      <div className="topbar-greeting">
        <h2>Hello, {user.fullName.split(' ')[0]} 👋</h2>
        <p>Lets organize your Daily Tasks</p>
      </div>
      <div className="topbar-right">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input placeholder="Search" />
        </div>
        <div className="icon-btn" title="Notifications">
          🔔
          <span className="notif-dot" />
        </div>
        <Link to="/profile" className="topbar-avatar">
          {user?.fullName.charAt(0).toUpperCase()}
        </Link>
      </div>
    </header>
  );
};

export default Sidebar;

// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser } from '../../store/slices/authSlice.js';
// import toast from 'react-hot-toast';
// import './Navbar.css';

// const Navbar = () => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = async () => {
//     await dispatch(logoutUser());
//     toast.success('Logged out successfully');
//     navigate('/signin');
//   };

//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav className="navbar">
//       <div className="navbar-inner">
//         <Link to="/" className="navbar-logo">
//           <span className="logo-mark">⬡</span>
//           <span className="logo-text">PrimeTrade</span>
//         </Link>

//         <div className="navbar-links">
//           {user ? (
//             <>
//               <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
//                 Dashboard
//               </Link>
//               <Link to="/tasks" className={`nav-link ${isActive('/tasks') ? 'active' : ''}`}>
//                 Tasks
//               </Link>
//               {user.role === 'ADMIN' && (
//                 <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>
//                   Admin
//                 </Link>
//               )}
//             </>
//           ) : null}
//         </div>

//         <div className="navbar-actions">
//           {user ? (
//             <div className="user-menu">
//               <Link to="/profile" className="user-avatar" title={user.fullName}>
//                 {user.fullName.charAt(0).toUpperCase()}
//               </Link>
//               <div className="user-info">
//                 <span className="user-name">{user.fullName.split(' ')[0]}</span>
//                 <span className={`badge badge-${user.role.toLowerCase()}`}>{user.role}</span>
//               </div>
//               <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
//                 Sign out
//               </button>
//             </div>
//           ) : (
//             <div className="auth-buttons">
//               <Link to="/signin" className="btn btn-ghost btn-sm">Sign in</Link>
//               <Link to="/signup" className="btn btn-primary btn-sm">Get started</Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
