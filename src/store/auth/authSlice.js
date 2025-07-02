// File: src/store/auth/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

// State yang sudah ada diperluas dengan mutationLoading
const initialState = {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false, // Untuk login, fetch user, etc.
    mutationLoading: false, // Khusus untuk create/update/delete seperti registrasi
    error: null,
    verifySuccess: false, // Tambahkan ini jika Anda menangani verifikasi email
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // ... (loginRequest, loginSuccess, loginFailure, logout sudah ada)
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },

        // === TAMBAHKAN REDUCER UNTUK REGISTRASI DI SINI ===
        registerRequest: (state) => {
            state.mutationLoading = true;
            state.error = null;
        },
        registerSuccess: (state) => {
            state.mutationLoading = false;
        },
        registerFailure: (state, action) => {
            state.mutationLoading = false;
            state.error = action.payload;
        },
        
        // Reducer lain yang mungkin Anda butuhkan nanti
        // (Saya ambil dari file lain yang Anda berikan untuk kelengkapan)
        resetAuthStatus: (state) => {
            state.verifySuccess = false;
            state.error = null;
        },
        // ... (tambahkan reducer lain seperti forgotPassword, verifyEmail, dll.)
    },
});

// Ekspor action yang baru
export const {
    loginRequest, loginSuccess, loginFailure, logout,
    registerRequest, registerSuccess, registerFailure, // <-- Ekspor yang baru
    resetAuthStatus
} = authSlice.actions;

export default authSlice.reducer;