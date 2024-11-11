import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios, {isAxiosError} from "axios";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import { resetProductState } from "./productVendorSlice";

export const getPriceRange = createAsyncThunk(
    "product/getPriceRange",
    async (data, {rejectWithValue}) => {
        try {
            const token = await asyncStorage.getItem("token");
            console.log("token", token);
            // console.log("data", data);
            const response = await axios.post("/product/price/range", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("response", response.data.data);
            if (response.status !== 200) {
                return rejectWithValue(response.data.message);
            }
            return response.data.data;
        } catch (error) {
            if (isAxiosError(error)) {
                // If the error is an Axios error, extract the message
                return rejectWithValue(
                    error.response?.data?.message || "An error occurred"
                );
            }
            // For any other type of error, return a generic message
            return rejectWithValue("An unexpected error occurred");
        }
    }
);

const ProductSlice = createSlice({
    name: "product",
    initialState: {
        isLoading: false,
        priceRange: null,
        status: "idle",
        error: null,
    },
    reducers: {
        resetProductCustomerState: (state) => {
            state.priceRange = null;
            state.status = "idle";
            state.error = null;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPriceRange.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.priceRange = action.payload;
                state.isLoading = false;
            })
            .addCase(getPriceRange.rejected, (state) => {
                state.status = "failed";
                state.isLoading = false;
                state.error = "error fetching";
            })
            .addCase(getPriceRange.pending, (state) => {
                state.status = "loading";
                state.isLoading = true;
            });
    },
});

export const {resetProductCustomerState} = ProductSlice.actions

export default ProductSlice.reducer;
