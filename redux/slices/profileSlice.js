// src/redux/slices/profileSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk untuk fetch profile
export const fetchUserProfile = createAsyncThunk(
    "profile/fetchUserProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/auth/user/info`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Thunk untuk edit profile customer
export const editCustomerProfile = createAsyncThunk(
    "profile/editCustomerProfile",
    async ({updatedCustomerProfile, id}, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/customer/${id}`, updatedCustomerProfile);
            console.log("response edit customer", response.data.data);
            return response.data.data; // Return data yang diperbarui dari respons
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Thunk untuk edit profile vendor
export const editVendorProfile = createAsyncThunk(
    "profile/editVendorProfile",
    async ({updatedVendorProfile, id}, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/vendor/${id}`, updatedVendorProfile);
            console.log("response edit vendor", response.data.data);
            return response.data.data; // Return data yang diperbarui dari respons
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        userInfo: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearProfile: (state) => {
            state.userInfo = null;
        },
    },
    extraReducers: (builder) => {
        builder
        // Reducer untuk fetch profile
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
        // Reducer untuk edit profile customer
            .addCase(editCustomerProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(editCustomerProfile.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.loading = false;
            })
            .addCase(editCustomerProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(editVendorProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(editVendorProfile.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.loading = false;
            })
            .addCase(editVendorProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
