import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api';
import {
    fetchPartnersRequest,
    fetchPartnersSuccess,
    fetchPartnersFailure,
} from './adminSlice';

function* handleFetchPartners() {
    try {
        const response = yield call(api.get, '/admin/partners');
        yield put(fetchPartnersSuccess(response.data.data));
    } catch (error) {
        yield put(fetchPartnersFailure(error.response?.data?.message || 'Failed to fetch partners'));
    }
}

function* adminSaga() {
    yield takeLatest(fetchPartnersRequest.type, handleFetchPartners);
}

export default adminSaga;