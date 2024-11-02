import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import withdrawHistorySlice from "./slices/withdrawHistorySlice";


export default configureStore({
    reducer: {
        auth: authSlice,
        withdrawHistory: withdrawHistorySlice
    }
})