import { useDispatch } from 'react-redux';
import { deleteTask } from '../../store/slices/taskSlice.js';
import toast from 'react-hot-toast';
import { IoPencil, IoTrash, IoCalendarOutline } from 'react-icons/io5';
import './TaskCard.css';

const statusClass = { TODO: 'todo', IN_PROGRESS: 'progress', DONE: 'done' };
const priorityClass = { LOW: 'low', MEDIUM: 'medium', HIGH: 'high' };

const TaskCard = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await dispatch(deleteTask(task._id)).unwrap();
      toast.success('Task deleted');
    } catch (err) {
      toast.error(err || 'Delete failed');
    }
  };

  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'DONE';

  return (
    <div className="task-card animate-fade">
      <div className="task-card-header">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span className={`badge badge-${statusClass[task.status]}`}>
            {task.status.replace('_', ' ')}
          </span>
          <span className={`badge badge-${priorityClass[task.priority]}`}>
            {task.priority}
          </span>
        </div>
        <div className="task-card-actions">
          <button className="btn btn-ghost btn-sm icon-btn" onClick={() => onEdit(task)} title="Edit">
            <IoPencil size={15} />
          </button>
          <button className="btn btn-ghost btn-sm icon-btn danger-icon" onClick={handleDelete} title="Delete">
            <IoTrash size={15} />
          </button>
        </div>
      </div>

      <h3 className="task-title">{task.title}</h3>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-card-footer">
        {formattedDate && (
          <span className={`task-due ${isOverdue ? 'overdue' : ''}`}>
            <IoCalendarOutline size={13} />
            {isOverdue ? 'Overdue · ' : ''}{formattedDate}
          </span>
        )}
        {task.createdBy?.fullName && (
          <span className="task-author">{task.createdBy.fullName}</span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
