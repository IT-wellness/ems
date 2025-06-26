// redux/softwareSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  softwareList: [
    {
      id: 1,
      name: 'Slack',
      description: 'Team communication and collaboration',
      users: ['HR', 'Marketing'],
      permissions: ['Send Messages', 'Create Channels']
    },
    {
      id: 2,
      name: 'Jira',
      description: 'Project management and bug tracking',
      users: ['Developers'],
      permissions: ['View Tasks', 'Assign Issues', 'Edit Workflow']
    }
  ],
};

const softwareSlice = createSlice({
  name: 'software',
  initialState,
  reducers: {
    addSoftware: (state, action) => {
      state.softwareList.push(action.payload);
    },
    updateSoftware: (state, action) => {
      const index = state.softwareList.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.softwareList[index] = action.payload;
      }
    },
    removeSoftware: (state, action) => {
      state.softwareList = state.softwareList.filter(s => s.id !== action.payload);
    },
  },
});

export const { addSoftware, updateSoftware, removeSoftware } = softwareSlice.actions;
export default softwareSlice.reducer;
