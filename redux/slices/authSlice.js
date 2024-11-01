import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {setupAxios} from "../../config/axiosConfig";
import {jwtDecode} from "jwt-decode";

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}, {rejectWithValue}) => {
        email = email.toLowerCase()
        const response = await axios.post("auth/login", {email, password}).catch(e => e.response)
        // console.log(response.status)
        if (response.status !== 200) return rejectWithValue("Invalid email or password");
        // console.log(response.data)
        const {token} = response.data.data
        if (response.data.data) {
            asyncStorage.setItem("token", token);
            setupAxios(token);
            const {role, sub: userId} = jwtDecode(token);
            asyncStorage.setItem("userId", userId);
            asyncStorage.setItem("email", email);
            asyncStorage.setItem("role", role);
            return {userId, email, role};
        } else {
            return rejectWithValue("Invalid email or password");
        }
    }
);

export const completingRegister = createAsyncThunk(
    'auth/register',
    async (data, {rejectWithValue, getState}) => {
        // const registerData = getState().auth.registerData;
        // console.log(registerData)
        const response = await axios.post("auth/register/vendor", {...data}).catch(e => e.response)
        console.log(response)
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
        const userId = await asyncStorage.getItem("userId");
        const email = await asyncStorage.getItem("email");
        const role = await asyncStorage.getItem("role");
        return {email, userId, role};
    }
)

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
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
            asyncStorage.removeItem("token");
            asyncStorage.removeItem("userId");
            asyncStorage.removeItem("email");
            asyncStorage.removeItem("role");
            state.isLoggedIn = false;
            state.user = null;
            state.error = null;
            delete axios.defaults.headers.common["Authorization"];
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
            .addCase(login.fulfilled, (state, action) => {
                state.status = "logged in";
                state.isLoggedIn = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(completingRegister.fulfilled, (state) => {
                state.status = "registered";
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

export const {logout, resetError, register, resetStatus} = AuthSlice.actions;
export default AuthSlice.reducer;