import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

export const makeEvent = createAsyncThunk(
  "makeEvent/makeEvent",
  async (data, { rejectWithValue }) => {
    const token = await asyncStorage.getItem("token");
    console.log("data" ,data)
    const response = await axios
      .get("/event/generate", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => e.response);
      console.log("response" ,response)
    if (response.status !== 200) return rejectWithValue(response.data.message);
    return response.data.data;
  }
);
const MakeEventSlice = createSlice({
  name: "makeEvent",
  initialState: {
    isLoading: false,
    status: "idle", 
    makeEventData: null,
  },
  reducers: {
    registMakeEvent: (state, action) => {
      state.makeEventData = {
        ...state.makeEventData,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeEvent.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(makeEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.makeEventData = action.payload;
      })
      .addCase(makeEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        console.log("error fetching")
      });
  },
});

export const { registMakeEvent } = MakeEventSlice.actions;
export default MakeEventSlice.reducer;
