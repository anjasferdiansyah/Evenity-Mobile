import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

export const makeEvent = createAsyncThunk(
  "makeEvent/makeEvent",
  async (data, { rejectWithValue }) => {
    const token = await asyncStorage.getItem("token");
    console.log("data", data);
    const response = await axios
      .post("/event/generate", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => e.response);
    // console.log("response makeEvent", response);
    if (response.status !== 200) return rejectWithValue(response.data.message);
    return response.data.data;
  }
);

export const regenerateEvent = createAsyncThunk(
  "makeEvent/regenerateEvent",
  async (data, { rejectWithValue }) => {
    const token = await asyncStorage.getItem("token");
    console.log("data", data);
    const response = await axios
      .post("/event/generate", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => e.response);
    // console.log("response", response);
    if (response.status !== 200) return rejectWithValue(response.data.message);
    return response.data.data;
  }
);

export const acceptAndMakeEvent = createAsyncThunk(
  "makeEvent/acceptAndMakeEvent",
  async (data, { rejectWithValue }) => {
    // console.log("HITTTT!");
    const token = await asyncStorage.getItem("token");
    console.log("data", data);
    const response = await axios
      .post("/event", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => e.response);
    // console.log("Hitt22");
    // console.log("response", response);
    if (response.status !== 200) return rejectWithValue(response.data.message);
    return response.data.data;
  }
);

const MakeEventSlice = createSlice({
  name: "makeEvent",
  initialState: {
    isLoading: false,
    status: "idle",
    makeEventRegist: null,
    makeEventData: null,
    recommendedList: {},
    listSelected: null,
  },
  reducers: {
    registMakeEvent: (state, action) => {
      state.makeEventRegist = {
        ...state.makeEventRegist,
        ...action.payload,
      };
    },
    addListSelected: (state, action) => {
      // state.listSelected.push(action.payload); // Add new item to listSelected array
      // console.log("listSelected", state.listSelected);
      state.listSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeEvent.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(makeEvent.fulfilled, (state, action) => {
        console.log("Action Payload", state);
        state.isLoading = false;
        state.status = "succeeded";
        state.makeEventData = action.payload;
        if (action.payload.categoryProduct) {
          state.listSelected = action.payload.categoryProduct;
        }
        if (action.payload.recommendedList) {
          action.payload.recommendedList.forEach((vendor) => {
            state.recommendedList[vendor.vendorId] = vendor; // Use vendorId as key
          });
        }
        console.log("recommendedList", state.recommendedList);
        console.log("listSelected", state.listSelected);
      })
      .addCase(makeEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        console.log("error fetching");
      })
      .addCase(regenerateEvent.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(regenerateEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        const { data } = action.payload;
        state.makeEventData = data;
        state.recommendedList = {};
        state.makeEventData = null;
        state.makeEventRegist = null;
      })
      .addCase(regenerateEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        console.log("error fetching");
      })
      .addCase(acceptAndMakeEvent.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(acceptAndMakeEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.makeEventData = action.payload;
        state.recommendedList = {};
        state.listSelected = null;
      })
      .addCase(acceptAndMakeEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        console.log("error fetching");
      });
  },
});

export const { registMakeEvent, addListSelected } = MakeEventSlice.actions;
export default MakeEventSlice.reducer;
