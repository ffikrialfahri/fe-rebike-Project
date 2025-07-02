// File: src/store/auth/authSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api';
import { jwtDecode } from 'jwt-decode';
import {
    loginSuccess, loginFailure, loginRequest,
    registerSuccess, registerFailure, registerRequest // <-- Import action registrasi
} from './authSlice';
import toast from 'react-hot-toast';


// Handler untuk login (sudah ada)
function* handleLogin(action) {
    // ... (kode handleLogin tidak berubah)
}

// === TAMBAHKAN HANDLER UNTUK REGISTRASI DI SINI ===
function* handleRegister(action) {
    const { userData, onComplete } = action.payload;
    try {
        // Panggil endpoint API untuk registrasi
        yield call(api.post, '/auth/register', userData);
        
        // Jika berhasil, dispatch action success
        yield put(registerSuccess());
        
        // Tampilkan notifikasi sukses
        toast.success('Registrasi berhasil! Silakan login untuk melanjutkan.');
        
        // Jalankan callback onComplete jika ada (untuk membuka modal login)
        if (onComplete) {
            yield call(onComplete);
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Registrasi gagal. Coba lagi.';
        yield put(registerFailure(errorMessage));
        toast.error(errorMessage);
    }
}


function* authSaga() {
    yield takeLatest(loginRequest.type, handleLogin);
    // === DAFTARKAN SAGA BARU DI SINI ===
    yield takeLatest(registerRequest.type, handleRegister);
}

export default authSaga;