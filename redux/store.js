import { configureStore } from "@reduxjs/toolkit";
import request_requestDetailSlice from "./slices/request-requestDetail-slice";
import authSlice from "./slices/authSlice";
import withdrawHistorySlice from "./slices/withdrawHistorySlice";
import productSlice from "./slices/productSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        withdrawHistory: withdrawHistorySlice,
    requestDetail: request_requestDetailSlice,
    product : productSlice
  },
});
