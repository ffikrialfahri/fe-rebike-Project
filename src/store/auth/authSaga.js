import { call, put, takeLatest } from 'redux-saga/effects';
import { loginSuccess, loginFailure, loginRequest } from './authSlice';
import api from '../../api';
import { jwtDecode } from 'jwt-decode';

function* handleLogin(action) {
    try {
        const response = yield call(api.post, '/auth/login', action.payload.credentials);
        const token = response.data.data.token;

        // Store token and user info
        localStorage.setItem('token', token);
        const decodedUser = jwtDecode(token);
        const user = {
            username: decodedUser.sub,
            roles: decodedUser.roles,
        };
        localStorage.setItem('user', JSON.stringify(user));

        // Dispatch success with payload. The component will handle navigation.
        yield put(loginSuccess({ token, user }));

    } catch (error) {
        const errorMessage = error.response
            ? error.response.data.message || 'Login failed. Please check your credentials.'
            : 'Network Error: Could not connect to the server. Please ensure the backend is running.';
        yield put(loginFailure(errorMessage));
    }
}

function* authSaga() {
    yield takeLatest(loginRequest.type, handleLogin);
}

export default authSaga;