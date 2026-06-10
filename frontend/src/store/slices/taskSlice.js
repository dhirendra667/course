import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createTaskAPI,
  getAllTasksAPI,
  updateTaskAPI,
  deleteTaskAPI,
  getTaskStatsAPI,
} from '../../services/task.service.js';

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const res = await getAllTasksAPI(params);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch tasks');
  }
});

export const createTask = createAsyncThunk('tasks/create', async (data, { rejectWithValue }) => {
  try {
    const res = await createTaskAPI(data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create task');
  }
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await updateTaskAPI(id, data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update task');
  }
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id, { rejectWithValue }) => {
  try {
    await deleteTaskAPI(id);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete task');
  }
});

export const fetchTaskStats = createAsyncThunk('tasks/stats', async (_, { rejectWithValue }) => {
  try {
    const res = await getTaskStatsAPI();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch stats');
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    stats: null,
    total: 0,
    pages: 1,
    page: 1,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearTaskError: (state) => { state.error = null; },
    setPage: (state, action) => { state.page = action.payload; },
  },
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchTasks.pending, (state) => { state.isLoading = true; state.error = null; });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload.tasks;
      state.total = action.payload.total;
      state.pages = action.payload.pages;
      state.page = action.payload.page;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Create
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks.unshift(action.payload.task);
      state.total += 1;
    });

    // Update
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const idx = state.tasks.findIndex((t) => t._id === action.payload.task._id);
      if (idx !== -1) state.tasks[idx] = action.payload.task;
    });

    // Delete
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      state.total -= 1;
    });

    // Stats
    builder.addCase(fetchTaskStats.fulfilled, (state, action) => {
      state.stats = action.payload;
    });
  },
});

export const { clearTaskError, setPage } = taskSlice.actions;
export default taskSlice.reducer;
