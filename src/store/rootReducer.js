import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import mitraReducer from './mitra/mitraSlice';
import adminReducer from './admin/adminSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    mitra: mitraReducer,
    admin: adminReducer,
});

export default rootReducer;