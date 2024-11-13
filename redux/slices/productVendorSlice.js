import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
    "product/getProduct",
    async (id, {
        rejectWithValue
    }) => {
        try {
            const response = await axios.get(`/vendor/${id}/products`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
        }
    }
);

export const getProductById = createAsyncThunk(
    "product/getProductById",
    async (id, {
        rejectWithValue
    }) => {
        try {
            const response = await axios.get(`/product/${id}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
        }
    }

)

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (data, {
        rejectWithValue
    }) => {
        try {
            const response = await axios.put(`/product/${data.id}`, data);
            console.log("response update product", response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update product");
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id, {
        rejectWithValue
    }) => {
        try {
            const response = await axios.delete(`/product/${id}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete product");
        }
    }
);

export const createNewProduct = createAsyncThunk(
    "product/createNewProduct",
    async (data, {
        rejectWithValue
    }) => {
        console.log(data)
        try {
            const response = await axios.post("/product", data);
            console.log("response create product", response);
            return response.data.data;
        } catch (error) {
            console.error("Error creating product:", error);
            return rejectWithValue(error.response?.data?.message || "Failed to create product");
        }
    }
)

const initialState = {
    products: [],
    selectedProduct: null,
    status: "idle",
    error: null
};

const productVendorSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        resetProductVendorState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.products = action.payload.productList.sort((a, b) => {
                    return new Date(b.modifiedDate) - new Date(a.modifiedDate);
                });
                state.status = "success";
                state.error = null;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Unknown error occurred";
            })
            .addCase(updateProduct.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = "success";
                state.error = null;
            })
            .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Unknown error occurred";
                console.log("error", state.error);
            });
    }
});

export const {
    setSelectedProduct,
    resetProductVendorState
} = productVendorSlice.actions;

export default productVendorSlice.reducer;