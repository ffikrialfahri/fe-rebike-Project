import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';
import toast from 'react-hot-toast';

const initialState = {
    partners: [],
    transactions: [],
    users: [],
    dashboardSummary: null,
    payouts: [],
    platformFee: null,
    fraudAlerts: [],
    businessRecommendations: [],
    loading: false,
    transactionsLoading: false,
    error: null,
    pagination: {
        page: 0,
        size: 20,
        totalElements: 0,
        totalPages: 0,
    },
};

export const fetchPartners = createAsyncThunk(
    'admin/fetchPartners',
    async ({ id = '', page = 0, size = 20 }, { rejectWithValue }) => {
        try {
            let url = '/admin/partners';
            if (id) {
                url = `/admin/partners/${id}`;
            } else {
                url = `/admin/partners?page=${page}&size=${size}`;
            }
            const response = await axiosInstance.get(url);
            
            if (id) {
                // If searching by ID, the response is a single object, wrap it in an array
                return { data: [response.data.data], page: 0, size: 1, totalElements: 1, totalPages: 1 };
            } else {
                // If fetching all partners, the response is an array within data.data
                return response.data.data;
            }
        } catch (error) {
            console.error("Error fetching partners:", error);
            const errorMessage = error.response?.data?.message || 'Failed to fetch partners';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchUsers = createAsyncThunk(
    'admin/fetchUsers',
    async ({ id = '', page = 0, size = 20 }, { rejectWithValue }) => {
        try {
            let url = '/admin/users';
            if (id) {
                url = `/admin/users/${id}`;
            }
            const response = await axiosInstance.get(`${url}?page=${page}&size=${size}`);
            
            if (id) {
                return { data: [response.data.data], page: 0, size: 1, totalElements: 1, totalPages: 1 };
            } else {
                return response.data.data;
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            const errorMessage = error.response?.data?.message || 'Failed to fetch users';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchTransactions = createAsyncThunk(
    'admin/fetchTransactions',
    async ({ page = 0, size = 20 }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/admin/transactions?page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching transactions:", error);
            const errorMessage = error.response?.data?.message || 'Failed to fetch transactions';
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

export const fetchDashboardSummary = createAsyncThunk(
    'admin/fetchDashboardSummary',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/admin/dashboard/summary');
            return response.data.data;
        } catch (error) {
            console.error("Error fetching dashboard summary:", error);
            const errorMessage = error.response?.data?.message || 'Failed to fetch dashboard summary';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchPayouts = createAsyncThunk(
    'admin/fetchPayouts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/admin/payouts');
            return response.data.data;
        } catch (error) {
            console.error("Error fetching payouts:", error);
            const errorMessage = error.response?.data?.message || 'Failed to fetch payouts';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const processPayout = createAsyncThunk(
    'admin/processPayout',
    async ({ payoutId, status, notes }, { rejectWithValue }) => {
        try {
            await axiosInstance.post(`/admin/payouts/${payoutId}/process`, { status, notes });
            toast.success('Payout processed successfully!');
            return payoutId; // Return payoutId to update state
        } catch (error) {
            console.error("Error processing payout:", error);
            const errorMessage = error.response?.data?.message || 'Failed to process payout';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchPlatformFee = createAsyncThunk(
    'admin/fetchPlatformFee',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/admin/settings/fee');
            return response.data.data.percentage; // Assuming the fee is directly in 'percentage' field
        } catch (error) {
            console.error("Error fetching platform fee:", error);
            const errorMessage = error.response?.data?.message || 'Failed to fetch platform fee';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchFraudAlerts = createAsyncThunk(
    'admin/fetchFraudAlerts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/admin/fraud-alerts');
            return response.data.data;
        } catch (error) {
            console.error("Error fetching fraud alerts:", error);
            const errorMessage = error.response?.data?.message || 'Failed to fetch fraud alerts';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchBusinessRecommendations = createAsyncThunk(
    'admin/fetchBusinessRecommendations',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/admin/recommendations');
            return response.data.data;
        } catch (error) {
            console.error("Error fetching business recommendations:", error);
            const errorMessage = error.response?.data?.message || 'Failed to fetch business recommendations';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const suspendUser = createAsyncThunk(
    'admin/suspendUser',
    async ({ userId, isSuspend }, { rejectWithValue }) => {
        try {
            await axiosInstance.patch(`/admin/users/${userId}/suspend`, { isSuspend });
            toast.success(`User ${isSuspend ? 'suspended' : 'unsuspended'} successfully!`);
            return { userId, isSuspend };
        } catch (error) {
            console.error("Error suspending/unsuspending user:", error);
            const errorMessage = error.response?.data?.message || `Failed to ${isSuspend ? 'suspend' : 'unsuspend'} user`;
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'admin/updateUserProfile',
    async (userData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('firstName', userData.firstName);
            formData.append('lastName', userData.lastName);
            formData.append('phoneNumber', userData.phoneNumber);
            if (userData.file) {
                formData.append('file', userData.file);
            }
            const response = await axiosInstance.put('/user/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Profil berhasil diperbarui!');
            return response.data.data;
        } catch (error) {
            console.error("Error updating user profile:", error);
            const errorMessage = error.response?.data?.message || 'Gagal memperbarui profil';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const changeUserPassword = createAsyncThunk(
    'admin/changeUserPassword',
    async (passwordData, { rejectWithValue }) => {
        try {
            await axiosInstance.patch('/user/password', passwordData);
            toast.success('Password berhasil diubah!');
            return true;
        } catch (error) {
            console.error("Error changing password:", error);
            const errorMessage = error.response?.data?.message || 'Gagal mengubah password';
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const updatePlatformFee = createAsyncThunk(
    'admin/updatePlatformFee',
    async (newFeePercentage, { rejectWithValue }) => {
        try {
            await axiosInstance.post('/admin/settings/fee', { percentage: newFeePercentage });
            toast.success('Platform fee updated successfully!');
            return newFeePercentage; // Return the new fee to update state
        } catch (error) {
            console.error("Error updating platform fee:", error);
            const errorMessage = error.response?.data?.message || 'Failed to update platform fee';
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
                state.partners = action.payload.data;
                state.pagination = {
                    page: action.payload.page,
                    size: action.payload.size,
                    totalElements: action.payload.totalElements,
                    totalPages: action.payload.totalPages,
                };
            })
            .addCase(fetchPartners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
                state.pagination = {
                    page: action.payload.page,
                    size: action.payload.size,
                    totalElements: action.payload.totalElements,
                    totalPages: action.payload.totalPages,
                };
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchTransactions.pending, (state) => {
                state.transactionsLoading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.transactionsLoading = false;
                state.transactions = action.payload.data.data;
                state.pagination = {
                    page: action.payload.data.page,
                    size: action.payload.data.size,
                    totalElements: action.payload.data.totalElements,
                    totalPages: action.payload.data.totalPages,
                };
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.transactionsLoading = false;
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
            })
            .addCase(fetchDashboardSummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboardSummary = action.payload;
            })
            .addCase(fetchDashboardSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPayouts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPayouts.fulfilled, (state, action) => {
                state.loading = false;
                state.payouts = action.payload;
            })
            .addCase(fetchPayouts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(processPayout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(processPayout.fulfilled, (state, action) => {
                state.loading = false;
                state.payouts = state.payouts.filter(payout => payout.id !== action.payload); // Remove processed payout
            })
            .addCase(processPayout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPlatformFee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlatformFee.fulfilled, (state, action) => {
                state.loading = false;
                state.platformFee = action.payload;
            })
            .addCase(fetchPlatformFee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updatePlatformFee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePlatformFee.fulfilled, (state, action) => {
                state.loading = false;
                state.platformFee = action.payload;
            })
            .addCase(updatePlatformFee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchFraudAlerts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFraudAlerts.fulfilled, (state, action) => {
                state.loading = false;
                state.fraudAlerts = action.payload;
            })
            .addCase(fetchFraudAlerts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchBusinessRecommendations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBusinessRecommendations.fulfilled, (state, action) => {
                state.loading = false;
                state.businessRecommendations = action.payload;
            })
            .addCase(fetchBusinessRecommendations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                // Optionally update user data in state if returned by backend
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(changeUserPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changeUserPassword.fulfilled, (state) => {
                state.loading = false;
                // Password change successful, no state update needed for data
            })
            .addCase(changeUserPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(suspendUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(suspendUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((user) =>
                    user.userID === action.payload.userId
                        ? { ...user, nonLocked: !action.payload.isSuspend }
                        : user
                );
            })
            .addCase(suspendUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default adminSlice.reducer;
