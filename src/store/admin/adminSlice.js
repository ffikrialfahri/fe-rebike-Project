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
    async ({ name = '' }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/admin/partners?name=${name}`);
            return response.data.data.data;
        } catch (error) {
            console.error("Error fetching partners:", error);
            const errorMessage = error.response?.data?.message || 'Failed to fetch partners';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const updatePartner = createAsyncThunk(
    'admin/updatePartner',
    async (partnerData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/admin/partners/${partnerData.id}`, partnerData);
            return response.data.data;
        } catch (error) {
            console.error("Error updating partner:", error);
            const errorMessage = error.response?.data?.message || 'Failed to update partner';
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
            })
            .addCase(updatePartner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePartner.fulfilled, (state, action) => {
                state.loading = false;
                const updatedPartner = action.payload;
                state.partners = state.partners.map((partner) =>
                    partner.id === updatedPartner.id ? updatedPartner : partner
                );
            })
            .addCase(updatePartner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default adminSlice.reducer;
