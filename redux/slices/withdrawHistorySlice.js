import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const loadWithdrawHistory = createAsyncThunk(
    'withdrawHistory/loadWithdrawHistory',
    async () => {
        const response = await axios.get("transaction/withdraw/request/user/99a482c6-f3ec-4b0e-817a-34cf03ccf6d1").catch(e => e.response)
        console.log(response.data)
        return response.data.data
    }
);

const withdrawHistorySlice = createSlice({
    name: "withdrawHistory",
    initialState: {
        withdrawHistory: [],
        status: ""
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadWithdrawHistory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loadWithdrawHistory.fulfilled, (state, action) => {
                console.log("Action Payload", action.payload)
                state.withdrawHistory = action.payload;
                state.status = "success";
            })
            .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
                state.status = "failed";
            })
    }
})

export default withdrawHistorySlice.reducer