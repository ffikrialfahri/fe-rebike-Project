import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    partners: [],
    transactions: [],
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        fetchPartnersRequest: (state) => { state.loading = true; },
        fetchPartnersSuccess: (state, action) => {
            state.loading = false;
            state.partners = action.payload;
        },
        fetchPartnersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Add other actions like verifyPartner etc.
    },
});

export const {
    fetchPartnersRequest,
    fetchPartnersSuccess,
    fetchPartnersFailure,
} = adminSlice.actions;

export default adminSlice.reducer;