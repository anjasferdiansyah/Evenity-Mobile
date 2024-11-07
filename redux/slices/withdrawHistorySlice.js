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

export const getListBank = createAsyncThunk(
    'withdrawHistory/getListBank',
    async () => {
        try{ const response = await axios.get("https://api-rekening.lfourr.com/listBank")
            return response.data} catch (error) {
            console.log(error)
        }
    }
)

export const getBankAccount = createAsyncThunk(
    'withdrawHistory/getBankAccount',
    async ({bankCode, accountNumber}, {rejectWithValue}) => {
        { const response = await axios.get(`https://api-rekening.lfourr.com/getBankAccount?bankCode=${bankCode}&accountNumber=${accountNumber}`)
        
            return response.data}
    }
)

const withdrawHistorySlice = createSlice({
    name: "withdrawHistory",
    initialState: {
        withdrawHistory: [],
        listBank : [],
        accountName : "",
        accountNumber : "",
        bankName : "",
        status: "",
        isValidBankAccount : false
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
            .addCase(getListBank.fulfilled, (state, action) => {
                console.log("Action Payload", action.payload)
                state.listBank = action.payload.data;
                state.status = "success";
            })
            .addCase(getListBank.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getBankAccount.fulfilled, (state, action) => {
                console.log("Action Payload", action.payload)
                if(action.payload.status === true){
                    state.isValidBankAccount = true;
                    state.accountName = action.payload.data.accountname
                    state.accountNumber = action.payload.data.accountnumber
                    state.bankName = action.payload.data.bankname
                } else {
                    state.isValidBankAccount = false;
                }
            })
            .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
                state.status = "failed";
            })
    }
})

export default withdrawHistorySlice.reducer