import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import request_requestDetailSlice from "./slices/request-requestDetail-slice";

export default configureStore({
  reducer: {
    auth: authSlice,
    requestDetail: request_requestDetailSlice,
  },
});
