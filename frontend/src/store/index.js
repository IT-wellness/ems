import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slices/employeeSlice';
import assetReducer from './slices/assetSlice';
import assetFilterReducer from './slices/assetFilterSlice';
import userReducer from './slices/userSlice';
import softwareReducer from './slices/softwareSlice';
import integrationsReducer from './slices/integrationSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        assetFilter: assetFilterReducer,
        employees: employeeReducer,
        assets: assetReducer,
        software: softwareReducer,
        integrations: integrationsReducer,
    },

    devTools: import.meta.env.MODE === 'development',
});

export default store;