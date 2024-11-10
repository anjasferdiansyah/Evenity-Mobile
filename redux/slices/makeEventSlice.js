import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

export const makeEvent = createAsyncThunk(
    "makeEvent/makeEvent",
    async (data, { rejectWithValue }) => {
        const token = await asyncStorage.getItem("token");
        console.log("data", data);
        const response = await axios
            .post("/event/generate", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .catch((e) => e.response);
        console.log("response makeEvent", response);
        if (response.status !== 200) return rejectWithValue(response.data.message);
        return response.data.data;
    }
);

export const regenerateEvent = createAsyncThunk(
    "makeEvent/regenerateEvent",
    async (data, { rejectWithValue }) => {
        const token = await asyncStorage.getItem("token");
        console.log("data regenerate", data);
        const response = await axios
            .post("/event/generate", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .catch((e) => e.response);
        console.log("response regenerate", response);
        if (response.status !== 200) return rejectWithValue(response.data.message);

        return response.data.data;
    }
);

export const acceptAndMakeEvent = createAsyncThunk(
    "makeEvent/acceptAndMakeEvent",
    async (data, { rejectWithValue }) => {
    // console.log("HITTTT!");
        const token = await asyncStorage.getItem("token");
        console.log("data", data);
        const response = await axios
            .post("/event", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .catch((e) => e.response);
        // console.log("Hitt22");
        console.log("response", response.data.data);
        if (response.status !== 200) return rejectWithValue(response.data.message);
        return response.data.data;
    }
);

const MakeEventSlice = createSlice({
    name: "makeEvent",
    initialState: {
        isLoading: false,
        status: "idle",
        makeEventRegist: null,
        makeEventData: null,
        recommendedList: {},
        listSelected: [],
        selectedDetailCategories: null,
        totalCost: 0,
    },
    reducers: {
        registMakeEvent: (state, action) => {

          

            state.makeEventRegist = {
                ...state.makeEventRegist,
                ...action.payload,
            };
            console.log("make event Regist", state.makeEventRegist);
        },
        resetRegistMakeEvent: (state) => {
            state.makeEventRegist = null;
        },
        addListSelected: (state, action) => {
            // state.listSelected.push(action.payload); // Add new item to listSelected array
            // console.log("listSelected", state.listSelected);

            state.listSelected = [...state.listSelected, action.payload];
        },
        updateRecommendedList: (state, action) => {
            // Misalnya, kita ingin update recommendedList berdasarkan vendorId
            const { productId, newVendorData } = action.payload;
            state.recommendedList[productId] = { ...newVendorData };
        },
        removeListSelected: (state, action) => {
            console.log("action.payload", action.payload);
            console.log("listSelected before", state.listSelected);
            state.listSelected = state.listSelected.filter(
                (item) => item !== action.payload
            );
            console.log("listSelected after", state.listSelected);
        },
        addDetailCategories: (state, action) => {
            // state.selectedDetailCategories.push(action.payload);
            state.selectedDetailCategories = action.payload;
            console.log("selectedDetailCategories", state.selectedDetailCategories);
        },

        resetRecommendedList: (state) => {
            state.recommendedList = {};
            console.log("ke hit reset")
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(makeEvent.pending, (state) => {
                state.isLoading = true;
                state.status = "loading";
            })
            .addCase(makeEvent.fulfilled, (state, action) => {
                state.totalCost = 0;
                console.log("Action Payload", state);
                state.isLoading = false;
                state.status = "succeeded";
                state.makeEventData = action.payload;
                // if (action.payload.categoryProduct) {
                //   state.listSelected = action.payload.categoryProduct;
                // }
                if (action.payload.recommendedList) {
                    action.payload.recommendedList.forEach((vendor) => {
                        state.recommendedList[vendor.vendorId] = vendor; // Use vendorId as key
                    });
                }

                if (action.payload.recommendedList) {
                    state.listSelected = action.payload.recommendedList.map(
                        (vendor) => vendor.productId
                    );
                }

                const totalCost = Object.values(state.recommendedList)
                    .map((vendor) => vendor.cost || 0)
                    .reduce((a, b) => a + b, 0);

                state.totalCost = totalCost;

                console.log("totalCost", state.totalCost);
                console.log("recommendedList", state.recommendedList);
                console.log("listSelected", state.listSelected);
            })
            .addCase(makeEvent.rejected, (state, action) => {
                state.isLoading = false;
                state.status = "failed";
                console.log("error fetching");
            })
            .addCase(regenerateEvent.pending, (state) => {
                state.isLoading = true;
                state.status = "loading";
            })
            .addCase(regenerateEvent.fulfilled, (state, action) => {
                state.totalCost = 0;
                console.log("Before recommendedList:", state.recommendedList);
                console.log("Before makeEventData:", state.makeEventData);
                console.log("Action Payload", action.payload);
                state.isLoading = false;
                state.status = "succeeded";
                state.makeEventData = action.payload;
                state.makeEventData.recommendedList.forEach((vendor) => {
                    state.recommendedList[vendor.productId] = vendor;
                });

                const newProductIds = state.makeEventData.recommendedList.map(
                    (vendor) => vendor.productId
                );
                state.listSelected = [...state.listSelected, ...newProductIds];

                const totalCost = Object.values(state.recommendedList)
                    .map((vendor) => vendor.cost || 0)
                    .reduce((a, b) => a + b, 0);

                state.totalCost = totalCost;

                console.log("Updated recommendedList:", state.recommendedList);
                console.log("Updated makeEventData:", state.makeEventData);
            })
            .addCase(regenerateEvent.rejected, (state, action) => {
                state.isLoading = false;
                state.status = "failed";
                console.log("error fetching");
            })
            .addCase(acceptAndMakeEvent.pending, (state) => {
                state.isLoading = true;
                state.status = "loading";
            })
            .addCase(acceptAndMakeEvent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = "succeeded";
                state.makeEventData = action.payload;

                console.log("Accepted event data:", state.makeEventData);
                // make all state back to default
                state.makeEventRegist = null;
                state.selectedDetailCategories = [];
                state.makeEventData = null;
                state.recommendedList = {};
                state.listSelected = [];
                state.totalCost = 0;
                state.selectedDetailCategories = [];
                console.log("after clear", state);
            })
            .addCase(acceptAndMakeEvent.rejected, (state, action) => {
                state.isLoading = false;
                state.status = "failed";
                console.log("error fetching");
            });
    },
});

export const {
    registMakeEvent,
    resetRegistMakeEvent,
    addListSelected,
    updateRecommendedList,
    resetRecommendedList,
    removeListSelected,
    addDetailCategories,
} = MakeEventSlice.actions;
export default MakeEventSlice.reducer;
