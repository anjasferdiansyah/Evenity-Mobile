import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {jwtDecode} from "jwt-decode";
import {setupAxios} from "../../config/axiosConfig";

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}, {rejectWithValue}) => {
        const response = await axios.post("auth/login", {email, password}).catch(e => e.response)
        // console.log(response.status)
        if (response.status !== 200) {
            return rejectWithValue("Invalid email or password");
        }
        // console.log(response.data)
        const {token} = response.data.data
        if (response.data.data) {
            asyncStorage.setItem("token", token);
            setupAxios(token);
            // const {customerId} = jwtDecode(token);
            // asyncStorage.setItem("customerId", customerId);
            // email = String(email).charAt(0).toUpperCase() + String(email).slice(1);
            // asyncStorage.setItem("email", email);
            return {email};
        } else {
            return rejectWithValue("Invalid email or password");
        }
    }
);

export const completingRegister = createAsyncThunk(
    'auth/register',
    async (data, {rejectWithValue, getState}) => {
        const registerData = getState().auth.registerData;
        // console.log(registerData)
        const response = await axios.post("auth/register/vendor", {...data, registerData}).catch(e => e.response)
        if (response.status !== 200) {
            return rejectWithValue(response.data.message);
        }
        return response.data;
    }
);

export const loadUser = createAsyncThunk(
    'auth/loadUser',
    async () => {
        const token = await asyncStorage.getItem("token");
        setupAxios(token);
        const customerId = await asyncStorage.getItem("customerId");
        const email = await asyncStorage.getItem("email");
        return {token, email, customerId, role: "ROLE_CUSTOMER"};
    }
)

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: null,
        error: null,
        status: "idle",
        user: null,
        registerData: null
    },
    reducers: {
        register: (state, action) => {
            state.registerData = action.payload
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.error = null;
            asyncStorage.removeItem("token");
            asyncStorage.removeItem("customerId");
            delete axios.defaults.headers.common["Authorization"];
        },
        resetError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.status = "success";
                state.isLoggedIn = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(completingRegister.fulfilled, (state) => {
                state.status = "success";
                state.isLoggedIn = false;
                state.user = null;
                state.error = null;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.status = "success";
                state.isLoggedIn = true;
                state.user = action.payload;
                state.error = null;
            })
            .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
                state.status = "failed";
                state.isLoggedIn = false;
                state.error = action?.payload ? action.payload : "Something went wrong";
            })
            .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
                state.status = "loading";
                state.error = null;
            })
    },
});

export const {logout, resetError, register} = AuthSlice.actions;
export default AuthSlice.reducer;