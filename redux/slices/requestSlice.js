import axios from "axios";

const {createSlice, createAsyncThunk} = require("@reduxjs/toolkit");


export const fetchRequestLists = createAsyncThunk(
    'requestListVendor/loadRequestListVendor',
    async (id) => {
        const response = await axios.get(`event/vendor/${id}`)
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
            .addCase(fetchRequestLists.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchRequestLists.fulfilled, (state, action) => {
                state.requestList = action.payload;
                state.status = "success";
            })
            .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
                state.status = "failed";
            })
    }
})

export const {setSelectedRequest} = requestSlice.actions

export default requestSlice.reducer