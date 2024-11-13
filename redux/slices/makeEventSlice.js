import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

export const makeEvent = createAsyncThunk(
    "makeEvent/makeEvent",
    async (data, {rejectWithValue}) => {
        const token = await asyncStorage.getItem("token");
        console.log("data", data);
        const newData = {
            ...data,
            lockedProduct: [],
        };
        const response = await axios
            .post("/event/generate", newData, {
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
    async (data, {rejectWithValue}) => {
        const token = await asyncStorage.getItem("token");
        console.log("data regenerate", data);

        try {
            const response = await axios
                .post("/event/generate", data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            console.log("response regenerate", response.data.data);
            if (response.status !== 200) return rejectWithValue(response.data.message);

            // Cek apakah recommended list null atau kosong
            const recommendedList = response.data.data.recommendedList;
            if (recommendedList.length === 0 || recommendedList.some(item => item === null)) {
                console.log("No vendors found for regeneration");

                return rejectWithValue("No vendors found for regeneration");

            }
            return response.data.data;
        } catch (error) {
            rejectWithValue(error.response.data.message);
        }
    }
);

export const acceptAndMakeEvent = createAsyncThunk(
    "makeEvent/acceptAndMakeEvent",
    async (data, {rejectWithValue}) => {
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


export const checkVendorAvailability = createAsyncThunk(
    "makeEvent/checkVendorAvailability",
    async ({
        city,
        province
    }, {
        rejectWithValue
    }) => {
        const token = await asyncStorage.getItem("token");
        console.log("data", {
            city,
            province
        });

        try {
            const response = await axios.get(`/vendor/check?city=${city}&province=${province}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return true;
        } catch (error) {

            if (error.response) {

                if (error.response.status === 404) {
                    return rejectWithValue(false);
                }

                return rejectWithValue(error.response.data.message || "Terjadi kesalahan yang tidak terduga.");
            } else {
                console.error("Error without response", error);
                return rejectWithValue("Kesalahan jaringan atau server tidak dapat dijangkau.");
            }
        }
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
        tempRecommendedList: [],
        listSelected: [],
        selectedDetailCategories: null,
        totalCost: 0,
        statusCheck: null
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
            const {productId, newVendorData} = action.payload;
            state.recommendedList[productId] = {...newVendorData};
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

        resetMakeEventState: (state) => {
            state.makeEventRegist = null;
            state.makeEventData = null;
            state.recommendedList = {};
            state.listSelected = [];
            state.selectedDetailCategories = null;
            state.totalCost = 0;
        },
        resetTempRecommendedList: (state) => {
            state.tempRecommendedList = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(makeEvent.pending, (state) => {
                state.isLoading = true;
                state.status = "loading";
            })
            .addCase(makeEvent.fulfilled, (state, action) => {
                state.totalCost = 0;
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
            })
            .addCase(regenerateEvent.pending, (state) => {
                state.isLoading = true;
                state.status = "loading";
            })
            .addCase(regenerateEvent.fulfilled, (state, action) => {

                console.log("Action Payload Regenerate", action.payload);
                try {
                    state.totalCost = 0;
                    state.isLoading = false;
                    state.status = "succeeded";


                    // Tambahkan pengecekan null/undefined

                    if (action.payload.recommendedList.length < 1) {

                        console.log("Data recommendedList tidak ada");
                        return state;

                    }

                    // Update makeEventData dengan pengecekan
                    state.makeEventData = action.payload;


                    // Filter dan validasi vendor sebelum diproses
                    const validVendors = action.payload.recommendedList.filter(
                        (vendor) => vendor && vendor.productId
                    );


                    // Proses vendor yang valid
                    validVendors.forEach((vendor) => {
                        if (vendor && vendor.productId) {
                            state.recommendedList[vendor.productId] = vendor;
                            state.tempRecommendedList = state.recommendedList;
                        } else {
                            console.log("Vendor tidak valid:", vendor);
                        }

                    });


                    // Buat daftar product ID dengan pengecekan

                    const newProductIds = validVendors

                        .map((vendor) => vendor.productId)

                        .filter(Boolean); // Hapus null/undefined


                    // Update listSelected dengan menghindari duplikasi

                    state.listSelected = [
                        ...new Set([...state.listSelected, ...newProductIds])
                    ];


                    // Hitung total biaya dengan pengecekan tambahan

                    const totalCost = Object.values(state.recommendedList)
                        .reduce((total, vendor) => {

                            // Pastikan vendor dan cost valid

                            return total + (vendor && vendor.cost ? vendor.cost : 0);

                        }, 0);


                    state.totalCost = totalCost;


                    // Log untuk debugging
                    console.log("Updated recommendedList:", state.recommendedList);
                    console.log("Updated tempRecommendedList:", state.tempRecommendedList);
                    console.log("Updated makeEventData:", state.makeEventData);
                    console.log("Updated listSelected:", state.listSelected);
                    console.log("Total Cost:", state.totalCost);

                } catch (error) {

                    // Tangani error yang tidak terduga

                    console.error("Error in regenerateEvent fulfilled:", error);


                    // Reset state atau set error state

                    state.status = "failed";

                    state.isLoading = false;

                }
            })
            .addCase(checkVendorAvailability.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log("Action Payload", action.payload);
                state.statusCheck = true;
            })
            .addCase(checkVendorAvailability.rejected, (state, action) => {
                state.isLoading = false;
                console.log("Action Payload", action.payload);
                state.statusCheck = false;
            })
            .addCase(regenerateEvent.rejected, (state, action) => {
                state.isLoading = false;
                console.log("totalCost rejected", state.totalCost);
                console.log("recomendedlist rejected", state.recommendedList);
                console.log("tempRecommendedList rejected", state.tempRecommendedList);
                state.status = "regenerate_failed";
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
    resetMakeEventState,
    incrementRegenerationCount,
    resetRegenerationCount,
    resetTempRecommendedList
} = MakeEventSlice.actions;
export default MakeEventSlice.reducer;
