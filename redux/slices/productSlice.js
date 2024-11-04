import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const getProduct = createAsyncThunk(
    "product/getProduct",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/vendor/8f6d8a02-65f6-44dc-87c2-e9c4cc7f0786/products`);
            return response.data.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
     
    }
)


const productSlice = createSlice({
    name: "product",
    initialState: {
        products : [],
        selectedProduct: null,
        status: null,
        error: null
    },
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.fulfilled, (state, action) => {
                state.products = action.payload;
                state.status = "success";
            })
            .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})

export const {setSelectedProduct} = productSlice.actions

export default productSlice.reducer;