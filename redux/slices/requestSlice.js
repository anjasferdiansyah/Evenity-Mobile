import axios from "axios";

const {createSlice, createAsyncThunk} = require("@reduxjs/toolkit");


export const fetchRequestLists = createAsyncThunk(
    'request/loadRequestList',
    async (id) => {
        const response = await axios.get(`event/vendor/${id}`)
        console.log(response)
        return response.data.data
    }
)

export const approveRequest = createAsyncThunk(
    'request/approveRequest',
    async (id) => {
        const response = await axios.put(`event/detail/${id}/approve`)
        console.log(response)
        return response.data.data
    }
)

export const rejectRequest = createAsyncThunk(
    'request/rejectRequest',
    async (id) => {
        const response = await axios.put(`event/detail/${id}/reject`)
        console.log(response)
        return response.data.data
    }
)

const requestSlice = createSlice({
    name: "request",
    initialState: {
        requestList: [],
        selectedRequest: null,
        status: ""
    },
    reducers: {
        setSelectedRequest: (state, action) => {
            state.selectedRequest = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRequestLists.fulfilled, (state, action) => {
                state.requestList = action.payload;
                state.status = "success";
            })
            .addCase(approveRequest.fulfilled, (state, action) => {
                state.selectedRequest = action.payload;
                state.status = "success";
            })
            .addCase(rejectRequest.fulfilled, (state, action) => {
                state.selectedRequest = action.payload;
                state.status = "success";
            })
            .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
                state.status = "loading";
            })
            .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
                state.status = "failed";
            })
    }
})

export const {setSelectedRequest} = requestSlice.actions

export default requestSlice.reducer