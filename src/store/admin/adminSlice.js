import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';
import toast from 'react-hot-toast';

const initialState = {
    partners: [],
    transactions: [],
    loading: false,
    error: null,
};

export const fetchPartners = createAsyncThunk(
    'admin/fetchPartners',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/admin/partners');
            return response.data.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch partners';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPartners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPartners.fulfilled, (state, action) => {
                state.loading = false;
                state.partners = action.payload;
            })
            .addCase(fetchPartners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default adminSlice.reducer;
