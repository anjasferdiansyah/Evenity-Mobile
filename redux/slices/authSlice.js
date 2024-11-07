import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {setupAxios} from "@/config/axiosConfig";

export const initializeAuth = createAsyncThunk(
    'auth/initialize',
    async (_, {dispatch}) => {
        const token = await asyncStorage.getItem("token");
        if (token) {
            setupAxios(token);
            await dispatch(loadUser());
            return true;
        }
        return false;
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}, {dispatch, rejectWithValue}) => {
        try {
            email = email.toLowerCase();
            const response = await axios.post("auth/login", {email, password});

            if (response.data?.data) {
                const {token} = response.data.data;
                await asyncStorage.setItem("token", token);
                setupAxios(token);
                dispatch(loadUser());
                return response.data.data;
            }
            return rejectWithValue("Invalid credentials");
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

export const completingRegisterVendor = createAsyncThunk(
    'auth/register',
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post("auth/register/vendor", data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
);

export const completingRegisterUser = createAsyncThunk(
    "auth/registerUsr",
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post("auth/register/customer", data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
);

export const loadUser = createAsyncThunk(
    'auth/loadUser',
    async (_, {rejectWithValue}) => {
        try {
            const token = await asyncStorage.getItem("token");
            if (!token) return rejectWithValue("No token found");

            setupAxios(token);
            const response = await axios.get("/auth/user/info");
            return response.data.data;
        } catch (error) {
            asyncStorage.removeItem("token");
            return rejectWithValue(error.response?.data?.message || "Failed to load user");
        }
    }
);

const initialState = {
    id: null,
    isLoggedIn: false,
    error: null,
    status: "idle",
    user: null,
    registerData: null,
    registerAs: null,
    isInitialized: false,
};

const AuthSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setRegisterAs: (state, action) => {
            state.registerAs = action.payload;
        },
        register: (state, action) => {
            state.registerData = action.payload;
        },
        logout: (state) => {
            asyncStorage.removeItem("token");
            return {...initialState};
        },
        resetError: (state) => {
            state.error = null;
        },
        resetStatus: (state) => {
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeAuth.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload;
                state.isInitialized = true;
            })
            .addCase(initializeAuth.rejected, (state) => {
                state.isLoggedIn = false;
                state.isInitialized = true;
            })
            .addCase(login.fulfilled, (state) => {
                state.status = "logged in";
                state.isLoggedIn = true;
                state.error = null;
                state.registerData = null;
                state.registerAs = null;
            })
            .addCase(completingRegisterVendor.fulfilled, (state) => {
                return {
                    ...initialState,
                    status: "registered"
                };
            })
            .addCase(completingRegisterUser.fulfilled, (state) => {
                return {
                    ...initialState,
                    status: "registered"
                };
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                
                console.log("Customer ID", action.payload.detail.customerId)
                state.id = action.payload.detail.id || action.payload.detail.customerId;
                console.log("State ID", state.id)
                state.status = "success";
                state.isLoggedIn = true;
                state.user = action.payload;
                state.error = null;
                state.registerData = null;
                state.registerAs = null;
            })
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.status = "failed";
                    state.isLoggedIn = false;
                    state.user = null;
                    state.error = action.payload || "Something went wrong";
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.status = "loading";
                    state.error = null;
                }
            );
    },
});

export const {
    logout,
    resetError,
    register,
    resetStatus,
    setRegisterAs
} = AuthSlice.actions;

export default AuthSlice.reducer;