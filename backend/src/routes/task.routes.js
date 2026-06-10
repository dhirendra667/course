import { Router } from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
} from '../controllers/task.controller.js';
import { isLoggedIn, authorizeRoles } from '../middlewares/auth.middleware.js';
import { createTaskValidation, updateTaskValidation } from '../validations/task.validation.js';
import validate from '../middlewares/validate.middleware.js';

const router = Router();

// All task routes require authentication
router.use(isLoggedIn);

/**
 * @swagger
 * /tasks/stats:
 *   get:
 *     summary: Get task statistics (Admin only)
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Task stats by status and priority
 */
router.get('/stats', authorizeRoles('ADMIN'), getTaskStats);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks (own for user, all for admin)
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [TODO, IN_PROGRESS, DONE] }
 *       - in: query
 *         name: priority
 *         schema: { type: string, enum: [LOW, MEDIUM, HIGH] }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: List of tasks
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               status: { type: string, enum: [TODO, IN_PROGRESS, DONE] }
 *               priority: { type: string, enum: [LOW, MEDIUM, HIGH] }
 *               dueDate: { type: string, format: date }
 *     responses:
 *       201:
 *         description: Task created
 */
router.route('/').get(getAllTasks).post(createTaskValidation, validate, createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Task details
 *       404:
 *         description: Task not found
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Task deleted
 */
router
  .route('/:id')
  .get(getTaskById)
  .put(updateTaskValidation, validate, updateTask)
  .delete(deleteTask);

export default router;
