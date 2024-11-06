import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const loadOrderHistoryVendor = createAsyncThunk(
    'orderHistoryVendor/loadorderHistoryVendor',
    async (id) => {
        const response = await axios.get(`event/vendor/${id}`)
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


const orderHistoryVendorSlice = createSlice({
    name: "orderHistoryVendor",
    initialState : {
        orderHistoryVendor : [],
        selectedOrderHistoryVendor: null,
        eventOnVendor : null,
        status : ""
    },
    reducers: {
        setSelectedOrderHistoryVendor: (state, action) => {
            state.selectedOrderHistoryVendor = action.payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadOrderHistoryVendor.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loadOrderHistoryVendor.fulfilled, (state, action) => {
                state.orderHistoryVendor = action.payload;
                state.status = "success";
            })
            .addCase(getEventOnVendor.fulfilled, (state, action) => {
                state.eventOnVendor = action.payload;
                        })
            .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
                state.status = "failed";
            })
    }

})

export const { setSelectedOrderHistoryVendor } = orderHistoryVendorSlice.actions
export default orderHistoryVendorSlice.reducer