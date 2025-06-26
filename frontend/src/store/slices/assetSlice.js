import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';

export const fetchAssets = createAsyncThunk(
  'assets/fetchAssets',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('/api/assets')
      if (!response.ok) throw new Error('Failed to fetch assets')
      const data = await response.json()
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const initialState = {
  assets: [],
  loading: false,
  error: null,
};

const assetSlice = createSlice({
    name: 'assets',
    initialState,
    reducers: {
        addAsset: {
          reducer: (state, action) => {
            state.assets.push(action.payload)
        },
        prepare: (payload) => {
          return { payload: { id: nanoid(), ...payload }}
        }
      },
        updateAsset: (state, action) => {
            const { id, ...updates } = action.payload;
            const index = state.assets.findIndex((asset) => asset.id === id);
            if (index !== -1) {
                state.assets[index] = { ...state.assets[index], ...updates };
            }
        },

        deleteAsset: (state, action) => {
            state.assets = state.assets.filter((asset) => asset.id !== action.payload);
        }
    },

    extraReducers: (builder) => {
      builder
        .addCase(fetchAssets.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(fetchAssets.fulfilled, (state, action) => {
          state.loading = false
          state.assets = action.payload
        })
        .addCase(fetchAssets.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload || 'Failed to fetch assets'
        })
    }
});

export const { addAsset, updateAsset, deleteAsset } = assetSlice.actions;
export default assetSlice.reducer;