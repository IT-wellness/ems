import { createSlice } from '@reduxjs/toolkit';

const auditLogSlice = createSlice({
    name: 'auditLogs',
    initialState: {
        logs: [],
        loading: false,
        error: null,
    },
    reducers: {
        setAuditLogs: (state, action) => {
            state.logs = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setAuditLogs, setLoading, setError } = auditLogSlice.actions;
export default auditLogSlice.reducer;