import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const loadOrderHistoryVendor = createAsyncThunk(
    'orderHistoryVendor/loadorderHistoryVendor',
    async () => {
        const response = await axios.get("event/vendor/1833136a-c581-4661-87a9-df151ca56f6c")
        return response.data.data
    }
)


const orderHistoryVendorSlice = createSlice({
    name: "historyOrderVendor",
    initialState : {
        orderHistoryVendor : [],
        selectedOrderHistoryVendor: null,
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
            .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
                state.status = "failed";
            })
    }

})

export const { setSelectedOrderHistoryVendor } = orderHistoryVendorSlice.actions
export default orderHistoryVendorSlice.reducer