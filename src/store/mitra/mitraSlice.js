import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bikes: [],
    transactions: [],
    profile: {},
    loading: false,
    error: null,
};

const mitraSlice = createSlice({
    name: 'mitra',
    initialState,
    reducers: {
        fetchBikesRequest: (state) => { state.loading = true; },
        fetchBikesSuccess: (state, action) => {
            state.loading = false;
            state.bikes = action.payload;
        },
        fetchBikesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchTransactionsRequest: (state) => { state.loading = true; },
        fetchTransactionsSuccess: (state, action) => {
            state.loading = false;
            state.transactions = action.payload;
        },
        fetchTransactionsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Add more actions for add, update, delete bikes etc.
    },
});

export const {
    fetchBikesRequest,
    fetchBikesSuccess,
    fetchBikesFailure,
    fetchTransactionsRequest,
    fetchTransactionsSuccess,
    fetchTransactionsFailure,
} = mitraSlice.actions;

export default mitraSlice.reducer;