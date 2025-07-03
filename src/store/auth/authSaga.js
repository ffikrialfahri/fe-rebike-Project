// File: src/store/auth/authSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api';
import { jwtDecode } from 'jwt-decode';
import {
    loginSuccess, loginFailure, loginRequest,
    registerSuccess, registerFailure, registerRequest,
    forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFailure,
    resetPasswordRequest, resetPasswordSuccess, resetPasswordFailure,
    verifyEmailRequest, verifyEmailSuccess, verifyEmailFailure,
    resendOtpRequest, resendOtpSuccess, resendOtpFailure
} from './authSlice';
import toast from 'react-hot-toast';

// --- PERBAIKI BAGIAN INI ---
function* handleLogin(action) {
    const { credentials, onSuccess } = action.payload;
    try {
        const response = yield call(api.post, '/auth/login', credentials);
        const token = response.data.data.token;

        localStorage.setItem('token', token);
        const decodedUser = jwtDecode(token);
        const user = {
            username: decodedUser.sub,
            roles: decodedUser.roles,
            firstName: decodedUser.firstName
        };
        localStorage.setItem('user', JSON.stringify(user));

        yield put(loginSuccess({ token, user }));
        toast.success(`Selamat datang, ${user.firstName || user.username}!`);

        if (onSuccess) {
            yield call(onSuccess, user);
        }

    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Login gagal. Periksa kembali email dan password Anda.';
        yield put(loginFailure(errorMessage));
        toast.error(errorMessage);
    }
}

// Handler untuk registrasi
function* handleRegister(action) {
    const { userData, onComplete } = action.payload;
    try {
        // Panggil endpoint API untuk registrasi partner
        yield call(api.post, '/auth/register/partner', userData);

        // Jalankan callback onComplete untuk mengubah UI ke form verifikasi
        if (onComplete) {
            yield call(onComplete);
        }

        // Dispatch action success setelah UI berubah
        yield put(registerSuccess());
        toast.success('Registrasi berhasil! Silakan periksa email Anda untuk verifikasi.');

    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Registrasi gagal. Coba lagi.';
        yield put(registerFailure(errorMessage));
        toast.error(errorMessage);
    }
}

// --- TAMBAHKAN HANDLERS BARU DI SINI ---

function* handleForgotPassword(action) {
    const { email, onComplete } = action.payload;
    try {
        // Backend Anda tidak menggunakan onComplete, tapi kita tetap handle
        yield call(api.post, '/auth/forgot-password', { email });
        yield put(forgotPasswordSuccess());
        toast.success("Jika email terdaftar, link reset password telah dikirim.");
        if (onComplete) {
            yield call(onComplete);
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Gagal mengirim permintaan reset password.';
        yield put(forgotPasswordFailure(errorMessage));
        toast.error(errorMessage);
    }
}

function* handleResetPassword(action) {
    const { token, newPassword, onComplete } = action.payload;
    try {
        // Backend Anda menggunakan reset password dengan OTP, bukan token dari URL
        // Kita sesuaikan dengan backend:
        // const { email, otp, newPassword } = action.payload;
        // yield call(api.post, '/auth/reset-password-with-otp', { email, otp, newPassword });
        // Namun, FE Anda menggunakan token dari URL. Mari kita asumsikan BE juga punya endpoint ini.
        // Jika tidak, Anda harus mengubah FE (ResetPasswordPage) untuk meminta OTP.
        // Untuk sekarang, kita ikuti FE:
        yield call(api.post, '/auth/reset-password', { token, newPassword });
        
        yield put(resetPasswordSuccess());
        toast.success("Password berhasil direset! Silakan login.");
        if (onComplete) {
            yield call(onComplete);
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Gagal mereset password.';
        yield put(resetPasswordFailure(errorMessage));
        toast.error(errorMessage);
    }
}

function* handleVerifyEmail(action) {
    const { email, otp } = action.payload;
    try {
        yield call(api.post, '/auth/verify-email', { email, otp });
        yield put(verifyEmailSuccess());
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Verifikasi OTP gagal.';
        yield put(verifyEmailFailure(errorMessage));
        toast.error(errorMessage);
    }
}

function* handleResendOtp(action) {
    const { email } = action.payload;
    try {
        yield call(api.post, '/auth/resend-otp', { email });
        yield put(resendOtpSuccess());
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Gagal mengirim ulang OTP.';
        yield put(resendOtpFailure(errorMessage));
        toast.error(errorMessage);
    }
}


// --- DAFTARKAN SEMUA HANDLER DI SINI ---
function* authSaga() {
    yield takeLatest(loginRequest.type, handleLogin);
    yield takeLatest(registerRequest.type, handleRegister);
    yield takeLatest(forgotPasswordRequest.type, handleForgotPassword);
//    yield takeLatest(resetPasswordRequest.type, handleResetPassword); // Sementara dinonaktifkan, lihat catatan di bawah
    yield takeLatest(verifyEmailRequest.type, handleVerifyEmail);
    yield takeLatest(resendOtpRequest.type, handleResendOtp);
}

export default authSaga;