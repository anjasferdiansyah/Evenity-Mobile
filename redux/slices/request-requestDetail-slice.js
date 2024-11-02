import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import { setupAxios } from "@/config/axiosConfig";

export const historyOrderCustomer = createAsyncThunk(
  "request/loadRequestDetail",
  async (id, { rejectWithValue }) => {
    const customerId = "71447de8-c5b4-4c09-b0c2-a8b659c8ba59";
    const token = await asyncStorage.getItem("token");
    const response = await axios
      .get(`event/customer/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => e.response);

    if (response.status !== 200) return rejectWithValue(response.data.message);
    console.log(JSON.stringify(response));
    return response.data.data;
  }
);

const RequestDetailSlice = createSlice({
  name: "requestDetail",
  initialState: {
    isLoading: false,
    requestDetail: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(historyOrderCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requestDetail = action.payload;
        state.status = "success";
      })
      .addCase(historyOrderCustomer.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(historyOrderCustomer.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default RequestDetailSlice.reducer;
