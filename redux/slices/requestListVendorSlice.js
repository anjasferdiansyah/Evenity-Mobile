import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const loadRequestListVendor = createAsyncThunk(
    'requestListVendor/loadRequestListVendor',
    async () => {
        const response = await axios.get("event/vendor/1833136a-c581-4661-87a9-df151ca56f6c")
        return response.data.data
    }
)



const requestListVendorSlice = createSlice({
    name: "requestListVendor",
    initialState : {
        requestListVendor : [],
        selectedRequest : null,
        status : ""
    },
    reducers: {
        setSelectedRequest: (state, action) => {
            state.selectedRequest = action.payload
        }  
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadRequestListVendor.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loadRequestListVendor.fulfilled, (state, action) => {
                state.requestListVendor = action.payload;
                state.status = "success";
            })
            .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
                state.status = "failed";
            })
    }
})

export const { setSelectedRequest } = requestListVendorSlice.actions

export default requestListVendorSlice.reducer