import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const historyEventCustomer = createAsyncThunk(
    "historyEvent/loadHistoryEvent",
    async (id, {rejectWithValue}) => {
        // const id_check = "811d7a37-f598-4895-83b5-4809c635574b";
        const response = await axios
            .get(`event/customer/${id}`)
            .catch((e) => e.response);

        // console.log("response", response);
        if (response.status !== 200) return rejectWithValue(response.data.message);
        return response.data.data;
    }
);

export const fetchEventDetail = createAsyncThunk(
    "historyEvent/fetchEventDetail",
    async (id, {rejectWithValue}) => {
        const response = await axios
            .get(`event/${id}`)
            .catch((e) => e.response);
        console.log("fetchEventDetail", response);
        if (response.status !== 200) return rejectWithValue(response.data.message);
        return response.data.data;
    }
);

export const regenerateEvent = createAsyncThunk(
    "historyEvent/regenerateEvent",
    async (id, {rejectWithValue, dispatch}) => {
        const response = await axios
            .put(`event/${id}/regenerate`)
            .catch((e) => e.response);
        console.log("regenerateEvent", response)
        if (response.status !== 200) return rejectWithValue(response.data.message);
        dispatch(fetchEventDetail(id));
        return response.data.data;
    }
);

const historyEventSlice = createSlice({
    name: "historyEvent",
    initialState: {
        isLoading: false,
        historyEvent: [],
        selectedHistoryEvent: null,
        status: "idle",
        error: null,
    },
    reducers: {
        setSelectedHistoryEvent: (state, action) => {
            state.selectedHistoryEvent = action.payload;
        },
        resetHistoryEvent: (state) => {
            state.historyEvent = [];
            state.selectedHistoryEvent = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(historyEventCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.historyEvent = action.payload;
                state.status = "success";
            })
            .addCase(fetchEventDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedHistoryEvent = action.payload;
                state.status = "success";
            })
            .addCase(historyEventCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.status = "failed";
            })
            .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
                state.isLoading = true;
                state.status = "loading";
            });
    },
});

export const {setSelectedHistoryEvent, resetHistoryEvent} = historyEventSlice.actions;
export default historyEventSlice.reducer;
