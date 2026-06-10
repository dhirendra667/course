import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, fetchTaskStats } from '../store/slices/taskSlice.js';
import { Link } from 'react-router-dom';
import { IoCheckmarkDone, IoTimeOutline, IoListOutline, IoFlashOutline } from 'react-icons/io5';
import './Dashboard.css';

const StatCard = ({ icon, label, value, color }) => (
  <div className="stat-card animate-fade" style={{ '--accent-color': color }}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-info">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, total, isLoading, stats } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks({ limit: 5, sort: '-createdAt' }));
    if (user?.role === 'ADMIN') dispatch(fetchTaskStats());
  }, []);

  const todoCount = tasks.filter((t) => t.status === 'TODO').length;
  const inProgressCount = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
  const doneCount = tasks.filter((t) => t.status === 'DONE').length;
  const highCount = tasks.filter((t) => t.priority === 'HIGH').length;

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="dashboard-header animate-fade">
          <div>
            <h1 className="page-title">
              Good {getGreeting()}, {user?.fullName.split(' ')[0]} 👋
            </h1>
            <p className="page-subtitle">Here's what's happening with your tasks today.</p>
          </div>
          <Link to="/tasks" className="btn btn-primary">
            <IoListOutline size={16} /> View All Tasks
          </Link>
        </div>

        <div className="stats-grid">
          <StatCard icon={<IoListOutline />} label="Total Tasks" value={total} color="var(--accent)" />
          <StatCard icon={<IoTimeOutline />} label="In Progress" value={inProgressCount} color="var(--warning)" />
          <StatCard icon={<IoCheckmarkDone />} label="Completed" value={doneCount} color="var(--success)" />
          <StatCard icon={<IoFlashOutline />} label="High Priority" value={highCount} color="var(--danger)" />
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Recent Tasks</h2>
            <Link to="/tasks" className="btn btn-ghost btn-sm">View all →</Link>
          </div>

          {isLoading ? (
            <div className="empty-state"><span className="spinner" /></div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state-icon">📋</span>
              <span className="empty-state-title">No tasks yet</span>
              <p>Create your first task to get started</p>
              <Link to="/tasks" className="btn btn-primary btn-sm" style={{ marginTop: 8 }}>Create Task</Link>
            </div>
          ) : (
            <div className="recent-tasks">
              {tasks.map((task) => (
                <div key={task._id} className="recent-task-row animate-fade">
                  <div className="recent-task-info">
                    <span className="recent-task-title">{task.title}</span>
                    {task.description && (
                      <span className="recent-task-desc">{task.description.slice(0, 60)}{task.description.length > 60 ? '...' : ''}</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className={`badge badge-${task.priority.toLowerCase()}`}>{task.priority}</span>
                    <span className={`badge badge-${task.status === 'IN_PROGRESS' ? 'progress' : task.status === 'DONE' ? 'done' : 'todo'}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {user?.role === 'ADMIN' && (
          <div className="dashboard-section" style={{ marginTop: 24 }}>
            <div className="section-header">
              <h2 className="section-title">Admin Panel</h2>
              <Link to="/admin" className="btn btn-ghost btn-sm">Manage →</Link>
            </div>
            <div className="admin-links">
              <Link to="/admin" className="admin-link-card">
                <span style={{ fontSize: '1.5rem' }}>👥</span>
                <span>Manage Users</span>
              </Link>
              <Link to="/tasks" className="admin-link-card">
                <span style={{ fontSize: '1.5rem' }}>📊</span>
                <span>All Tasks</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
};

export default Dashboard;
