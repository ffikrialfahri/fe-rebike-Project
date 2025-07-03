import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';
import toast from 'react-hot-toast';

const initialState = {
    bikes: [],
    transactions: [],
    profile: {},
    loading: false,
    error: null,
};

// Async Thunks
export const fetchBikes = createAsyncThunk(
    'mitra/fetchBikes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/partner/bikes');
            return response.data.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch bikes';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchTransactions = createAsyncThunk(
    'mitra/fetchTransactions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/partner/transactions');
            return response.data.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch transactions';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

const mitraSlice = createSlice({
    name: 'mitra',
    initialState,
    reducers: {
        // Reducers for direct state manipulation if needed, otherwise use extraReducers
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBikes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBikes.fulfilled, (state, action) => {
                state.loading = false;
                state.bikes = action.payload;
            })
            .addCase(fetchBikes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default mitraSlice.reducer;
