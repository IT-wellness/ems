// src/store/slices/employeeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Async thunk example
export const fetchEmployees = createAsyncThunk(
  'employees/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE}/employees/all`);
      return data; // array of employees
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createEmployee = createAsyncThunk(
  'employees/create',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_BASE}/employees/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return data.employee; // created doc
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/update',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_BASE}/employees/update/${id}`, payload);
      return data.employee;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE}/employees/delete/${id}`);
      return id; // return the deleted _id so we can remove it locally
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    list: [],
    selected: null,
    status: 'idle', // idle | loading | succeeded | failed
    error: null
  },
  reducers: {
    selectEmployee: (state, action) => {
      state.selected = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    /* ---------------------------- fetch ---------------------------*/
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      /* --------------------------- create --------------------------*/
      .addCase(createEmployee.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      /* --------------------------- update --------------------------*/
      .addCase(updateEmployee.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const idx = state.list.findIndex(emp => emp._id === action.payload._id);
        if (idx !== -1) state.list[idx] = action.payload;
        if (state.selected && state.selected._id === action.payload._id) {
          state.selected = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      /* --------------------------- delete --------------------------*/
      .addCase(deleteEmployee.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = state.list.filter(emp => emp._id !== action.payload);
        if (state.selected && state.selected._id === action.payload) {
          state.selected = null;
        }
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { selectEmployee, clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
