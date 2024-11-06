

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const loadInvoiceOrderCustomer = createAsyncThunk(
    "request/loadRequestDetail",
    async (id, {rejectWithValue}) => {
        const response = await axios
            .get(`invoice/customer/${id}`)
            .catch((e) => e.response);

        if (response.status !== 200) return rejectWithValue(response.data.message);
        return response.data.data;
    }
);

const invoiceCustomerSlice = createSlice({
    name: "requestDetail",
    initialState: {
        isLoading: false,
        invoiceCustomer: [],
        selectedInvoiceCustomer: null,
        status: "idle",
        error: null,
    },
    reducers: {
        setSelectedInvoiceCustomer: (state, action) => {
            state.selectedInvoiceCustomer = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadInvoiceOrderCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.invoiceCustomer = action.payload;
                state.status = "success";
            })
            .addCase(loadInvoiceOrderCustomer.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(loadInvoiceOrderCustomer.pending, (state) => {
                state.isLoading = true;
            });
    },
});

export const { setSelectedInvoiceCustomer } = invoiceCustomerSlice.actions;
export default invoiceCustomerSlice.reducer;
