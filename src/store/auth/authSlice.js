// File: src/store/auth/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    mutationLoading: false,
    error: null,
    verifySuccess: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // ... (login, logout, register reducers sudah ada di sini)
        loginRequest: (state) => { /*...*/ },
        loginSuccess: (state, action) => { /*...*/ },
        loginFailure: (state, action) => { /*...*/ },
        logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        registerRequest: (state) => { /*...*/ },
        registerSuccess: (state) => { /*...*/ },
        registerFailure: (state, action) => { /*...*/ },
        
        // --- TAMBAHKAN REDUCERS BARU DI SINI ---
        forgotPasswordRequest: (state) => {
            state.mutationLoading = true;
            state.error = null;
        },
        forgotPasswordSuccess: (state) => {
            state.mutationLoading = false;
        },
        forgotPasswordFailure: (state, action) => {
            state.mutationLoading = false;
            state.error = action.payload;
        },

        resetPasswordRequest: (state) => {
            state.mutationLoading = true;
            state.error = null;
        },
        resetPasswordSuccess: (state) => {
            state.mutationLoading = false;
        },
        resetPasswordFailure: (state, action) => {
            state.mutationLoading = false;
            state.error = action.payload;
        },

        // --- Reducers lain yang sudah ada ---
        verifyEmailRequest: (state) => { state.mutationLoading = true; state.error = null; },
        verifyEmailSuccess: (state) => { state.mutationLoading = false; state.verifySuccess = true; },
        verifyEmailFailure: (state, action) => { state.mutationLoading = false; state.error = action.payload; },
        
        resendOtpRequest: (state) => { state.mutationLoading = true; state.error = null; },
        resendOtpSuccess: (state) => { state.mutationLoading = false; },
        resendOtpFailure: (state, action) => { state.mutationLoading = false; state.error = action.payload; },

        resetAuthStatus: (state) => {
            state.verifySuccess = false;
            state.error = null;
        },
    },
});

// --- PERBARUI EKSPOR DI SINI ---
export const {
    loginRequest, loginSuccess, loginFailure, logout,
    registerRequest, registerSuccess, registerFailure,
    forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFailure, // <-- Tambahkan ini
    resetPasswordRequest, resetPasswordSuccess, resetPasswordFailure,   // <-- Tambahkan ini
    verifyEmailRequest, verifyEmailSuccess, verifyEmailFailure,
    resendOtpRequest, resendOtpSuccess, resendOtpFailure,
    resetAuthStatus
} = authSlice.actions;

export default authSlice.reducer;