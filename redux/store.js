import { configureStore } from "@reduxjs/toolkit";
import request_requestDetailSlice from "./slices/request-requestDetail-slice";
import authSlice from "./slices/authSlice";
import withdrawHistorySlice from "./slices/withdrawHistorySlice";
import makeEventSlice from "./slices/makeEventSlice";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    withdrawHistory: withdrawHistorySlice,
    requestDetail: request_requestDetailSlice,
    makeEventSlice: makeEventSlice,
    categorySlice: categorySlice,
    productSlice: productSlice,
  },
});
