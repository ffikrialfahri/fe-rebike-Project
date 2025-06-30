import { all } from 'redux-saga/effects';
import authSaga from './auth/authSaga';
import mitraSaga from './mitra/mitraSaga';
import adminSaga from './admin/adminSaga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        mitraSaga(),
        adminSaga(),
    ]);
}