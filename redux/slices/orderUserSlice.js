import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const historyOrderCustomer = createAsyncThunk(
    "request/loadRequestDetail",
    async (id, {rejectWithValue}) => {
        const response = await axios
            .get(`event/customer/${id}`)
            .catch((e) => e.response);

        if (response.status !== 200) return rejectWithValue(response.data.message);
        return response.data.data;
    }
);

const orderUserSlice = createSlice({
    name: "requestDetail",
    initialState: {
        isLoading: false,
        ordersUser: [],
        selectedOrder: null,
        status: "idle",
        error: null,
    },
    reducers: {
        setSelectedOrderUser: (state, action) => {
            state.selectedOrder = action.payload;
        },
        resetOrderUserState: (state) => {
            state.selectedOrder = null;
            state.ordersUser = [];
            state.status = "idle";
            state.error = null;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(historyOrderCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ordersUser = action.payload;
                state.status = "success";
            })
            .addCase(historyOrderCustomer.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(historyOrderCustomer.pending, (state) => {
                state.isLoading = true;
            });
    },
});

export const {setSelectedOrderUser, resetOrderUserState} = orderUserSlice.actions;
export default orderUserSlice.reducer;
