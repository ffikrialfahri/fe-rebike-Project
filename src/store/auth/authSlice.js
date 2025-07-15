import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

const initialState = {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    mutationLoading: false,
    error: null,
    verifySuccess: false,
    showMitraInfoModal: false, // New state for MitraInfoPage modal
    showLoginModal: false, // New state for Login Modal
    redirectTo: null, // New state to store the path to redirect after login
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ credentials, onSuccess }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/login', credentials);
            const token = response.data.data.token;
            localStorage.setItem('token', token);
            const decodedUser = jwtDecode(token);

            const roles = decodedUser.roles || (decodedUser.role ? [decodedUser.role] : []);
            const user = {
                username: decodedUser.sub,
                roles: roles,
                firstName: decodedUser.firstName,
                email: decodedUser.email // Tambahkan baris ini
            };
            localStorage.setItem('user', JSON.stringify(user));

            toast.success(`Selamat datang, ${user.firstName || user.username}!`);
            if (onSuccess) {
                onSuccess(user);
            }
            return { token, user };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login gagal. Periksa kembali email dan password Anda.';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ userData, onComplete }, { rejectWithValue }) => {
        try {
            await axiosInstance.post('/auth/register/partner', userData);
            toast.success('Registrasi berhasil! Silakan periksa email Anda untuk verifikasi.');
            if (onComplete) {
                onComplete();
            }
            return true;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Registrasi gagal. Coba lagi.';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async ({ email, onComplete }, { rejectWithValue }) => {
        try {
            await axiosInstance.post('/auth/forgot-password', { email });
            toast.success("Jika email terdaftar, link reset password telah dikirim.");
            if (onComplete) {
                onComplete();
            }
            return true;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Gagal mengirim permintaan reset password.';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ token, newPassword, onComplete }, { rejectWithValue }) => {
        try {
            // Asumsi BE memiliki endpoint ini, jika tidak, perlu disesuaikan dengan OTP
            await axiosInstance.post('/auth/reset-password', { token, newPassword });
            toast.success("Password berhasil direset! Silakan login.");
            if (onComplete) {
                onComplete();
            }
            return true;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Gagal mereset password.';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const verifyEmail = createAsyncThunk(
    'auth/verifyEmail',
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            await axiosInstance.post('/auth/verify-email', { email, otp });
            toast.success('Email berhasil diverifikasi.');
            return true;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Verifikasi OTP gagal.';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const resendOtp = createAsyncThunk(
    'auth/resendOtp',
    async ({ email }, { rejectWithValue }) => {
        try {
            await axiosInstance.post('/auth/resend-otp', { email });
            toast.success('OTP baru telah dikirim.');
            return true;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Gagal mengirim ulang OTP.';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        resetAuthStatus: (state) => {
            state.verifySuccess = false;
            state.error = null;
        },
        setShowMitraInfoModal: (state, action) => {
            state.showMitraInfoModal = action.payload;
        },
        setShowLoginModal: (state, action) => {
            state.showLoginModal = action.payload.isOpen;
            state.redirectTo = action.payload.redirectTo || null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.mutationLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.mutationLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.mutationLoading = false;
                state.error = action.payload;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.mutationLoading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.mutationLoading = false;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.mutationLoading = false;
                state.error = action.payload;
            })
            .addCase(resetPassword.pending, (state) => {
                state.mutationLoading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.mutationLoading = false;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.mutationLoading = false;
                state.error = action.payload;
            })
            .addCase(verifyEmail.pending, (state) => {
                state.mutationLoading = true;
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state) => {
                state.mutationLoading = false;
                state.verifySuccess = true;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.mutationLoading = false;
                state.error = action.payload;
            })
            .addCase(resendOtp.pending, (state) => {
                state.mutationLoading = true;
                state.error = null;
            })
            .addCase(resendOtp.fulfilled, (state) => {
                state.mutationLoading = false;
            })
            .addCase(resendOtp.rejected, (state, action) => {
                state.mutationLoading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, resetAuthStatus, setShowMitraInfoModal, setShowLoginModal } = authSlice.actions;
export default authSlice.reducer;