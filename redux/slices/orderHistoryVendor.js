import axios from "axios";

const {
    createSlice,
    createAsyncThunk
} = require("@reduxjs/toolkit");


export const loadOrderHistoryVendor = createAsyncThunk(
    'orderHistoryVendor/loadorderHistoryVendor',
    async (id) => {
        const response = await axios.get(`event/vendor/${id}`)
        return response.data.data
    }
)

export const loadOrderHistoryDetailVendor = createAsyncThunk(
    'orderHistoryVendor/loadOrderHistoryDetailVendor',
    async (id) => {
        const response = await axios.get(`event/detail/${id}`)
        return response.data.data
    }
)

export const getEventOnVendor = createAsyncThunk(
    'orderHistoryVendor/getEventOnVendor',
    async (eventId) => {
        const response = await axios.get(`event/${eventId}`)
        return response.data.data
    }
)

export const loadInvoiceByVendorId = createAsyncThunk(
    'orderHistoryVendor/invoiceByVendorId',
    async (id) => {
        const response = await axios.get(`invoice/vendor/${id}`)
        return response.data.data
    }
)


const orderHistoryVendorSlice = createSlice({
    name: "orderHistoryVendor",
    initialState: {
        orderHistoryVendor: [],
        invoiceByVendorId: [],
        selectedInvoiceVendor: null,
        selectedOrderHistoryVendor: null,
        eventOnVendor: null,
        status: ""
    },
    reducers: {
        setSelectedOrderHistoryVendor: (state, action) => {
            state.selectedOrderHistoryVendor = action.payload
        },
        resetOrderHistoryVendor: (state) => {
            state.orderHistoryVendor = []
            state.selectedOrderHistoryVendor = null
            state.eventOnVendor = null
            state.status = ""
            state.selectedInvoiceVendor = null
            state.invoiceByVendorId = []
        },
        setSelectedInvoiceVendor: (state, action) => {
            state.selectedInvoiceVendor = action.payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadOrderHistoryVendor.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loadOrderHistoryVendor.fulfilled, (state, action) => {
                state.orderHistoryVendor = action.payload.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
                state.status = "success";
            })
            .addCase(loadOrderHistoryDetailVendor.fulfilled, (state, action) => {
                state.selectedOrderHistoryVendor = action.payload;
                state.status = "success";
            })
            .addCase(getEventOnVendor.fulfilled, (state, action) => {
                state.eventOnVendor = action.payload;
            })
            .addCase(loadInvoiceByVendorId.fulfilled, (state, action) => {
                state.invoiceByVendorId = action.payload;
            })
            .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
                state.status = "loading";
            })
            .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
                state.status = "failed";
            })
    }

})

export const {
    setSelectedOrderHistoryVendor,
    resetOrderHistoryVendor,
    setSelectedInvoiceVendor
} = orderHistoryVendorSlice.actions
export default orderHistoryVendorSlice.reducer