import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const loadWithdrawHistory = createAsyncThunk(
  "withdrawHistory/loadWithdrawHistory",
  async (id) => {
    const response = await axios
      .get(
        `transaction/withdraw/request/user/${id}`
      )
      .catch((e) => e.response);
    console.log(response.data);
    return response.data.data;
  }
);

export const getListBank = createAsyncThunk(
  "withdrawHistory/getListBank",
  async () => {
    try {
      const response = await axios.get(
        "https://api-rekening.lfourr.com/listBank"
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getBankAccount = createAsyncThunk(
  "withdrawHistory/getBankAccount",
  async ({ bankCode, accountNumber }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api-rekening.lfourr.com/getBankAccount?bankCode=${bankCode}&accountNumber=${accountNumber}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const getUserBalance = createAsyncThunk(
  "withdrawHistory/getUserBalance",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`transaction/balance/user/${id}`);
      console.log("response", response);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const makeWithdrawRequest = createAsyncThunk(
  "withdrawHistory/makeWithdrawRequest",
  async ({ amount, id }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `transaction/withdraw/${id}`,
        { amount }
      );
      console.log("makeWithdrawRequest", response);
      return response.data.data;
    } catch (error) {
      console.log("makeWithdrawRequest Error", error);
      rejectWithValue(error.response.data);
    }
  }
)

const withdrawHistorySlice = createSlice({
  name: "withdrawHistory",
  initialState: {
    withdrawHistory: [],
    listBank: [],
    userBalance: 0,
    accountName: "",
    accountNumber: "",
    bankName: "",
    status: "",
    statusWithdraw: "",
    isValidBankAccount: false,
  },

  reducers: {
    resetWithdrawHistory: (state) => {
      state.withdrawHistory = [];
      state.listBank = [];
      state.userBalance = 0;
      state.accountName = "";
      state.accountNumber = "";
      state.bankName = "";
      state.status = "";
      state.statusWithdraw = "";
      state.isValidBankAccount = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWithdrawHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadWithdrawHistory.fulfilled, (state, action) => {
        state.withdrawHistory = action.payload;
        state.status = "success";
      })
      .addCase(getListBank.fulfilled, (state, action) => {
        state.listBank = action.payload.data;
        state.status = "success";
      })
      .addCase(getListBank.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBankAccount.fulfilled, (state, action) => {
        if (action.payload.status === true) {
          state.isValidBankAccount = true;
          state.accountName = action.payload.data.accountname;
          state.accountNumber = action.payload.data.accountnumber;
          state.bankName = action.payload.data.bankname;
        } else {
          state.isValidBankAccount = false;
        }
      })
      .addCase(getBankAccount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserBalance.fulfilled, (state, action) => {
        console.log("Action Payload", action.payload);
        if(action.payload){
          state.userBalance = action?.payload.amount;
        }
        state.status = "success";
      })
      .addCase(makeWithdrawRequest.fulfilled, (state, action) => {
        state.statusWithdraw = "success";
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
        }
      );
  },
});

export const { resetWithdrawHistory } = withdrawHistorySlice.actions

export default withdrawHistorySlice.reducer;
