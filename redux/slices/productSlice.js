import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

export const getPriceRange = createAsyncThunk(
  "product/getPriceRange",
  async (data, { rejectWithValue }) => {
    try {
      const token = await asyncStorage.getItem("token");
      console.log("token" ,token)
      console.log("data" ,data)
      const response = await axios.get("/product/price/range", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: data,
      });
      console.log("response" ,response)
      if (response.status !== 200) {
        return rejectWithValue(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    priceRange: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPriceRange.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.priceRange = action.payload;
        state.isLoading = false;
      })
      .addCase(getPriceRange.rejected, (state) => {
        state.status = "failed";
        state.isLoading = false;
        console.log("error fetching");
      })
      .addCase(getPriceRange.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      });
  },
});

export default ProductSlice.reducer;
