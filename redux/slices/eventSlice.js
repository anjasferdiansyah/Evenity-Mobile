import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

export const getEventById = createAsyncThunk(
    "event/getEventById",
    async (id) => {
        const token = await asyncStorage.getItem("token");
        const response = await axios
            .get(`/event/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .catch((e) => e.response);
        if (response.status !== 200) return;
        return response.data.data;
    }
)

const eventSlice = createSlice({
    name: "event",
    initialState: {
        isLoading: false,
        event: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEventById.fulfilled, (state, action) => {
                state.event = action.payload;
                state.isLoading = false;
                state.status = "success";
            })
            .addCase(getEventById.pending, (state) => {
                state.isLoading = true;
                state.status = "loading";
            })
            .addCase(getEventById.rejected, (state) => {
                state.isLoading = false;
                state.status = "failed";
            });
    },
});

export default eventSlice.reducer;