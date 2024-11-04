import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";


export const loadCategories = createAsyncThunk(
    "category/loadCategories",
    async () => {
        const token = await asyncStorage.getItem("token");
        const response = await axios
            .get("/category", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .catch((e) => e.response);
        if (response.status !== 200) return;
        return response.data.data;
    }
)

const CategorySlice = createSlice({
    name: "category",
    initialState: {
        isLoading: false,
        categories: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCategories.pending, (state) => {
                state.isLoading = true;
                state.status = "loading";
            })
            .addCase(loadCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
                state.status = "success";
            })
            .addCase(loadCategories.rejected, (state) => {
                state.isLoading = false;
                state.status = "failed";
            });
    },
});

export default CategorySlice.reducer