import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../store/slices/taskSlice.js';
import TaskCard from '../components/UI/TaskCard.jsx';
import TaskModal from '../components/UI/TaskModal.jsx';
import { IoAdd, IoFilter } from 'react-icons/io5';
import './Tasks.css';

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, total, pages, page } = useSelector((state) => state.tasks);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '', page: 1, limit: 12 });

  useEffect(() => {
    const params = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''));
    dispatch(fetchTasks(params));
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const openEdit = (task) => { setEditTask(task); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditTask(null); };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-header">
          <div>
            <h1 className="page-title">Tasks</h1>
            <p className="page-subtitle">{total} task{total !== 1 ? 's' : ''} total</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <IoAdd size={18} /> New Task
          </button>
        </div>

        {/* Filters */}
        <div className="filters-bar animate-fade">
          <IoFilter size={16} style={{ color: 'var(--text-muted)' }} />
          <select className="form-select filter-select" name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All Status</option>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
          <select className="form-select filter-select" name="priority" value={filters.priority} onChange={handleFilterChange}>
            <option value="">All Priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          {(filters.status || filters.priority) && (
            <button className="btn btn-ghost btn-sm" onClick={() => setFilters({ status: '', priority: '', page: 1, limit: 12 })}>
              Clear
            </button>
          )}
        </div>

        {/* Task Grid */}
        {isLoading ? (
          <div className="empty-state"><span className="spinner" style={{ width: 32, height: 32 }} /></div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-icon">🗂️</span>
            <span className="empty-state-title">No tasks found</span>
            <p>Try adjusting your filters or create a new task</p>
            <button className="btn btn-primary btn-sm" style={{ marginTop: 8 }} onClick={() => setShowModal(true)}>
              <IoAdd size={16} /> Create Task
            </button>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} onEdit={openEdit} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="pagination">
            <button
              className="btn btn-secondary btn-sm"
              disabled={filters.page <= 1}
              onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
            >
              ← Prev
            </button>
            <span className="page-info">Page {filters.page} of {pages}</span>
            <button
              className="btn btn-secondary btn-sm"
              disabled={filters.page >= pages}
              onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {showModal && <TaskModal onClose={closeModal} task={editTask} />}
    </div>
  );
};

export default Tasks;
