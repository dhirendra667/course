import Task from '../models/task.model.js';
import AppError from '../utils/appError.js';

// @desc    Create a task
// @route   POST /api/v1/tasks
// @access  Private
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, message: 'Task created', task });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tasks (own for USER, all for ADMIN)
// @route   GET /api/v1/tasks
// @access  Private
export const getAllTasks = async (req, res, next) => {
  try {
    const { status, priority, page = 1, limit = 10, sort = '-createdAt' } = req.query;

    const filter = req.user.role === 'ADMIN' ? {} : { createdBy: req.user._id };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [tasks, total] = await Promise.all([
      Task.find(filter)
        .populate('createdBy', 'fullName email')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Task.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Private
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('createdBy', 'fullName email');
    if (!task) return next(new AppError('Task not found', 404));

    // Only owner or admin can view
    if (req.user.role !== 'ADMIN' && task.createdBy._id.toString() !== req.user._id.toString()) {
      return next(new AppError('Not authorized to view this task', 403));
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task
// @route   PUT /api/v1/tasks/:id
// @access  Private
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new AppError('Task not found', 404));

    // Only owner or admin can update
    if (req.user.role !== 'ADMIN' && task.createdBy.toString() !== req.user._id.toString()) {
      return next(new AppError('Not authorized to update this task', 403));
    }

    const { title, description, status, priority, dueDate } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, priority, dueDate },
      { new: true, runValidators: true }
    ).populate('createdBy', 'fullName email');

    res.status(200).json({ success: true, message: 'Task updated', task: updatedTask });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new AppError('Task not found', 404));

    // Only owner or admin can delete
    if (req.user.role !== 'ADMIN' && task.createdBy.toString() !== req.user._id.toString()) {
      return next(new AppError('Not authorized to delete this task', 403));
    }

    await task.deleteOne();

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get task stats (Admin only)
// @route   GET /api/v1/tasks/stats
// @access  Admin
export const getTaskStats = async (req, res, next) => {
  try {
    const stats = await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const priorityStats = await Task.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ success: true, statusStats: stats, priorityStats });
  } catch (error) {
    next(error);
  }
};
