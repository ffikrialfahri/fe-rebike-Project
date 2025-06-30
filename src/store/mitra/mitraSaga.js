import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api';
import {
    fetchBikesRequest,
    fetchBikesSuccess,
    fetchBikesFailure,
    fetchTransactionsRequest,
    fetchTransactionsSuccess,
    fetchTransactionsFailure,
} from './mitraSlice';

function* handleFetchBikes() {
    try {
        const response = yield call(api.get, '/partner/bikes');
        yield put(fetchBikesSuccess(response.data.data));
    } catch (error) {
        yield put(fetchBikesFailure(error.response?.data?.message || 'Failed to fetch bikes'));
    }
}

function* handleFetchTransactions() {
    try {
        const response = yield call(api.get, '/partner/transactions');
        yield put(fetchTransactionsSuccess(response.data.data));
    } catch (error) {
        yield put(fetchTransactionsFailure(error.response?.data?.message || 'Failed to fetch transactions'));
    }
}


function* mitraSaga() {
    yield takeLatest(fetchBikesRequest.type, handleFetchBikes);
    yield takeLatest(fetchTransactionsRequest.type, handleFetchTransactions);
}

export default mitraSaga;