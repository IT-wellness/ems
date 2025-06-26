// src/store/slices/employeeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk example
export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async () => {
    // Simulate API call
    const response = await new Promise((resolve) =>
      setTimeout(() =>
        resolve([
          { id: '1', name: 'Sawan Khanna', email: 'sawan@wellnessextract.com' },
          { id: '2', name: 'Vijay Ramanan', email: 'vijay@wellnessextract.com' },
        ]), 500)
    );
    return response;
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    list: [],
    selectedEmployee: null,
    loading: false,
    error: null,
  },
  reducers: {
    setEmployees: (state, action) => {
      state.list = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setEmployees, setLoading, setError } = employeeSlice.actions;

export default employeeSlice.reducer;
