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
    async ({email, password}, {rejectWithValue}) => {
        try {
            email = email.toLowerCase();
            const response = await axios.post("auth/login", {email, password});

            if (response.data?.data) {
                const {token} = response.data.data;
                await asyncStorage.setItem("token", token);
                setupAxios(token);
                // dispatch(loadUser());
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
        clearUser: (state) => {
            state.user = null
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
            .addCase(initializeAuth.pending, (state) => {
                state.status = "loading";
            })
            .addCase(initializeAuth.fulfilled, (state, action) => {
                state.isInitialized = true;
                state.status = "idle";
            })
            .addCase(initializeAuth.rejected, (state) => {
                state.isInitialized = true;
                state.status = "idle";
            })
            .addCase(login.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled, (state) => {
                state.status = "logged in";
                state.isLoggedIn = true;
                state.error = null;
                state.registerData = null;
                state.registerAs = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.isLoggedIn = false;
                state.error = action.payload || "Login failed";
            })
            .addCase(completingRegisterVendor.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(completingRegisterVendor.fulfilled, (state) => {
                state.status = "registered";
                state.error = null;
                state.registerData = null;
                state.registerAs = null;
                state.isInitialized = true;
            })
            .addCase(completingRegisterVendor.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Vendor registration failed";
            })
            .addCase(completingRegisterUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(completingRegisterUser.fulfilled, (state) => {
                state.status = "registered";
                state.error = null;
                state.registerData = null;
                state.registerAs = null;
                state.isInitialized = true;
            })
            .addCase(completingRegisterUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "User registration failed";
            })
            .addCase(loadUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.id = action.payload.detail.id || action.payload.detail.customerId;
                state.status = "success";
                state.isLoggedIn = true;
                state.user = action.payload;
                state.error = null;
                state.registerData = null;
                state.registerAs = null;
            })
            .addCase(loadUser.rejected, (state, action) => {
                asyncStorage.removeItem("token");
                state.status = "failed";
                state.isLoggedIn = false;
                state.user = null;
                state.id = null;
                state.error = action.payload || "Failed to load user";
            });
    },
});

export const {
    logout,
    resetError,
    register,
    resetStatus,
    setRegisterAs,
    clearUser
} = AuthSlice.actions;

export default AuthSlice.reducer;