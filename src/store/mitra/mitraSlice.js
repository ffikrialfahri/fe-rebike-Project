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
            return response.data?.data?.content || [];
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

export const fetchPartnerProfile = createAsyncThunk(
    'mitra/fetchPartnerProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/partner/profile');
            return response.data.data; // Assuming the profile data is directly in response.data.data
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch partner profile';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const updatePartnerBankInfo = createAsyncThunk(
    'mitra/updatePartnerBankInfo',
    async (bankData, { rejectWithValue }) => {
        try {
            await axiosInstance.put('/partner/bank-info', bankData);
            toast.success('Informasi bank berhasil diperbarui!');
            return bankData;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Gagal memperbarui informasi bank';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const addBike = createAsyncThunk(
    'mitra/addBike',
    async (bikeData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/partner/bikes', bikeData);
            toast.success('Motor berhasil ditambahkan!');
            return response.data.data; // Assuming backend returns the new bike data
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Gagal menambahkan motor';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateBike = createAsyncThunk(
    'mitra/updateBike',
    async ({ bikeId, bikeData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/partner/bikes/${bikeId}`, bikeData);
            toast.success('Motor berhasil diperbarui!');
            return response.data.data; // Assuming backend returns the updated bike data
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Gagal memperbarui motor';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteBike = createAsyncThunk(
    'mitra/deleteBike',
    async (bikeId, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/partner/bikes/${bikeId}`);
            toast.success('Motor berhasil dihapus!');
            return bikeId; // Return the ID of the deleted bike
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Gagal menghapus motor';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateBikeStatus = createAsyncThunk(
    'mitra/updateBikeStatus',
    async ({ bikeId, status }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/partner/bikes/${bikeId}/status`, { status });
            toast.success('Status motor berhasil diperbarui!');
            return response.data.data; // Assuming backend returns the updated bike data
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Gagal memperbarui status motor';
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
            })
            .addCase(fetchPartnerProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPartnerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchPartnerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updatePartnerBankInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePartnerBankInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = { ...state.profile, ...action.payload }; // Update profile with new bank data
            })
            .addCase(updatePartnerBankInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addBike.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBike.fulfilled, (state, action) => {
                state.loading = false;
                state.bikes.push(action.payload);
            })
            .addCase(addBike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateBike.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBike.fulfilled, (state, action) => {
                state.loading = false;
                state.bikes = state.bikes.map((bike) =>
                    bike.bikeID === action.payload.bikeID ? action.payload : bike
                );
            })
            .addCase(updateBike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteBike.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBike.fulfilled, (state, action) => {
                state.loading = false;
                state.bikes = state.bikes.filter((bike) => bike.bikeID !== action.payload);
            })
            .addCase(deleteBike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateBikeStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBikeStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.bikes = state.bikes.map((bike) =>
                    bike.bikeID === action.payload.bikeID ? action.payload : bike
                );
            })
            .addCase(updateBikeStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default mitraSlice.reducer;
