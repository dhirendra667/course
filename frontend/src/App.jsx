import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import Sidebar, { Topbar } from './components/Layout/Navbar.jsx';
import RequireAuth from './components/Auth/RequireAuth.jsx';

import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Tasks from './pages/Tasks.jsx';
import Admin from './pages/Admin.jsx';
import Profile from './pages/Profile.jsx';
import { Denied, NotFound } from './pages/Misc.jsx';

const AUTH_ROUTES = ['/', '/signup', '/signin'];

function App() {
  const { user } = useSelector((s) => s.auth);
  const location = useLocation();
  const isAuthRoute = AUTH_ROUTES.includes(location.pathname);
  const showLayout = user && !isAuthRoute;

  return (
    <div className={showLayout ? 'app-layout' : ''}>
      {showLayout && <Sidebar />}

      <div className={showLayout ? 'main-content' : ''}>
        {showLayout && <Topbar />}

        <Routes>
          <Route path="/"       element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/denied" element={<Denied />} />

          <Route element={<RequireAuth allowedRoles={['USER', 'ADMIN']} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks"     element={<Tasks />} />
            <Route path="/profile"   element={<Profile />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#fff',
            color: '#1a1a2e',
            border: '1px solid #e8e8f0',
            borderRadius: '10px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.875rem',
            boxShadow: '0 4px 16px rgba(108,99,255,0.10)',
          },
          success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
    </div>
  );
}

export default App;

// import { Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';

// import Navbar from './components/Layout/Navbar.jsx';
// import RequireAuth from './components/Auth/RequireAuth.jsx';

// import Home from './pages/Home.jsx';
// import Signup from './pages/Signup.jsx';
// import Signin from './pages/Signin.jsx';
// import Dashboard from './pages/Dashboard.jsx';
// import Tasks from './pages/Tasks.jsx';
// import Admin from './pages/Admin.jsx';
// import Profile from './pages/Profile.jsx';
// import { Denied, NotFound } from './pages/Misc.jsx';

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/signin" element={<Signin />} />
//         <Route path="/denied" element={<Denied />} />

//         {/* Protected: USER + ADMIN */}
//         <Route element={<RequireAuth allowedRoles={['USER', 'ADMIN']} />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/tasks" element={<Tasks />} />
//           <Route path="/profile" element={<Profile />} />
//         </Route>

//         {/* Protected: ADMIN only */}
//         <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
//           <Route path="/admin" element={<Admin />} />
//         </Route>

//         {/* 404 */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>

//       <Toaster
//         position="top-right"
//         toastOptions={{
//           style: {
//             background: '#16161f',
//             color: '#f0f0f8',
//             border: '1px solid #2a2a3a',
//             borderRadius: '10px',
//             fontFamily: "'DM Sans', sans-serif",
//             fontSize: '0.875rem',
//           },
//           success: { iconTheme: { primary: '#22c55e', secondary: '#16161f' } },
//           error: { iconTheme: { primary: '#ef4444', secondary: '#16161f' } },
//         }}
//       />
//     </>
//   );
// }

// export default App;
