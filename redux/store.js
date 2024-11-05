import {configureStore} from "@reduxjs/toolkit";
import request_requestDetailSlice from "./slices/request-requestDetail-slice";
import authSlice from "./slices/authSlice";
import withdrawHistorySlice from "./slices/withdrawHistorySlice";
import makeEventSlice from "./slices/makeEventSlice";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
import productVendorSlice from "./slices/productVendorSlice";
import requestSlice from "./slices/requestSlice"
import orderHistoryVendorSlice from "./slices/orderHistoryVendor"

export default configureStore({
    reducer: {
        auth: authSlice,
        withdrawHistory: withdrawHistorySlice,
        requestDetail: request_requestDetailSlice,
        makeEventSlice: makeEventSlice,
        categorySlice: categorySlice,
        productSlice: productSlice,
        productVendor: productVendorSlice,
        request: requestSlice,
        orderHistoryVendor: orderHistoryVendorSlice,
    },
});
