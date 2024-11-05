import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {setupAxios} from "@/config/axiosConfig";

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}, {dispatch, rejectWithValue}) => {
        email = email.toLowerCase()
        const response = await axios.post("auth/login", {email, password}).catch(e => e.response)
        // console.log(response.status)
        if (response.status !== 200) return rejectWithValue("Invalid email or password");
        // console.log(response.data)
        if (response.data.data) {
            const {token} = response.data.data
            await asyncStorage.setItem("token", token);
            setupAxios(token)
            dispatch(loadUser())
        } else {
            return rejectWithValue("Invalid email or password");
        }
    }
);

export const completingRegister = createAsyncThunk(
    'auth/register',
    async (data, {rejectWithValue}) => {
        // const registerData = getState().auth.registerData;
        // console.log(registerData)
        const response = await axios.post("auth/register/vendor", {...data}).catch(e => e.response)
        // console.log(response)
        if (response.status !== 200) {
            return rejectWithValue(response.data.message);
        }
        return response.data;
    }
);

export const completingRegisterUser = createAsyncThunk(
    "auth/registerUsr",
    async (data, {rejectWithValue}) => {
        // const registerData = getState().auth.registerData;
        // console.log(registerData)
        const response = await axios
            .post("auth/register/customer", {...data})
            .catch((e) => e.response);
        // console.log(response);
        if (response.status !== 200) {
            return rejectWithValue("Invalid email or password");
        }
        return response.data;
    }
);

export const loadUser = createAsyncThunk(
    'auth/loadUser',
    async (_, {rejectWithValue}) => {
        const token = await asyncStorage.getItem("token");
        setupAxios(token);
        const response = await axios.get("/auth/user/info");

        if (response.status !== 200) return rejectWithValue("Not logged in");
        const {data} = response.data;
        console.log(data)
        return data;
    }
)

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        id: null,
        isLoggedIn: false,
        error: null,
        status: "idle",
        user: null,
        registerData: null,
        registerAs: null,
    },
    reducers: {
        setRegisterAs: (state, action) => {
            state.registerAs = action.payload
        },
        register: (state, action) => {
            state.registerData = action.payload
        },
        logout: (state) => {
            asyncStorage.removeItem("token");
            state.id = null;
            state.isLoggedIn = false;
            state.user = null;
            state.error = null;
            state.status = "idle";
            state.registerData = null;
            state.registerAs = null;
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
                state.error = null;
                state.registerData = null;
                state.registerAs = null;
            })
            .addCase(completingRegister.fulfilled, (state) => {
                state.id = null;
                state.status = "registered";
                state.isLoggedIn = false;
                state.user = null;
                state.error = null;
                state.registerData = null;
                state.registerAs = null;
            })
            .addCase(completingRegisterUser.fulfilled, (state) => {
                state.status = "registered";
                state.isLoggedIn = false;
                state.user = null;
                state.error = null;
                state.registerData = null;
                state.registerAs = null;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.id = action.payload.detail.id;
                state.status = "success";
                state.isLoggedIn = true;
                state.user = action.payload;
                state.error = null;
                state.registerData = null;
                state.registerAs = null;
            })
            .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
                state.status = "failed";
                state.isLoggedIn = false;
                state.user = null;
                state.error = action?.payload ? action.payload : "Something went wrong";
            })
            .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
                state.status = "loading";
            })
    },
});

export const {logout, resetError, register, resetStatus, setRegisterAs} = AuthSlice.actions;
export default AuthSlice.reducer;