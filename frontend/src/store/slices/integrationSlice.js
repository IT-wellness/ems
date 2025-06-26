// redux/integrationsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  integrations: [
    { id: 1, name: 'Slack', status: 'connected', description: 'Get Slack notifications' },
    { id: 2, name: 'Google Workspace', status: 'disconnected', description: 'Sync calendar and email' },
    { id: 3, name: 'Zoom', status: 'connected', description: 'Schedule meetings' }
  ],
};

const integrationsSlice = createSlice({
  name: 'integrations',
  initialState,
  reducers: {
    toggleIntegrationStatus: (state, action) => {
      const integration = state.integrations.find(intg => intg.id === action.payload);
      if (integration) {
        integration.status = integration.status === 'connected' ? 'disconnected' : 'connected';
      }
    },
  },
});

export const { toggleIntegrationStatus } = integrationsSlice.actions;
export default integrationsSlice.reducer;
