import tailwind from "twrnc";
import {
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState, useEffect } from "react";
import ListChooseVendor from "@/components/ListChooseVendor-user";
import MakeEventLayout from "@/app/dashboard/make-event/layout";
import { useDispatch, useSelector } from "react-redux";
import {
    regenerateEvent,
    acceptAndMakeEvent,
    resetRecommendedList,
    updateRecommendedList,
} from "@/redux/slices/makeEventSlice";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MakeEventTransactionNote = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const {
        makeEventData,
        recommendedList,
        makeEventRegist,
        listSelected,
        totalCost,
        selectedDetailCategories,
        status,
    } = useSelector((state) => state.makeEventSlice);

    const { id } = useSelector((state) => state.auth);
    const [modalDetailVisible, setModalDetailVisible] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);

    const handleVendorPress = (vendor) => {
        setSelectedVendor(vendor);
        setModalDetailVisible(true);

        const updatedVendorData = {
            productId: vendor.productId,
            newVendorData: {
                qty: vendor.qty || 1,
                cost: vendor.cost || 0,
                notes: vendor.notes || "No specific notes",
                mainCategory: vendor.mainCategory,
            },
        };
        dispatch(updateRecommendedList(updatedVendorData));
    };

    const handleRegenerateVendor = () => {
        const newEventData = {
            ...makeEventRegist,
            customerId: id,
            categoryProduct: selectedDetailCategories,
            previousProduct: listSelected,
        };
        console.log("newEventData", newEventData);

        dispatch(resetRecommendedList());

        dispatch(regenerateEvent(newEventData));
    };

    const acceptMakeEvent = () => {
        const recommendedArray = Object.values(recommendedList);
        const newEventData = recommendedArray.map((vendor) => ({
            productId: vendor.productId,
            qty: vendor.qty || 1,
            unit: vendor.mainCategory === "CATERING" ? "PCS" : "DAY",
            notes: vendor.notes || "No specific notes",
            cost: vendor.cost || 0,
        }));

        const eventDataCopy = { ...makeEventData };
        delete eventDataCopy.recommendedList;

        const eventData = {
            ...eventDataCopy,
            eventDetail: newEventData,
        };

        try {
            dispatch(acceptAndMakeEvent(eventData));
            if (makeEventData) {
                router.replace(`/dashboard/transaction`);
            }
        } catch (error) {
            console.error("Error accepting make event:", error);
        }
    };

    useEffect(() => {
        if (status === "regenerate_failed") {
            alert("Failed to regenerate vendors. Please try again.");
        }
    }, [status]);

    return (
        <MakeEventLayout
            progress={100}
            nextRoute="transaction"
            handleRegenerateVendor={handleRegenerateVendor}
            handleAccept={acceptMakeEvent}
            nextInfor="Make Event"
            resetRecommendedList={resetRecommendedList}
        >
            <View style={tailwind`px-10 my-2 mx-auto`}>
                <Text className="font-outfitSemiBold text-2xl">
                    Vendor Generated
                </Text>
            </View>
            <ScrollView style={tailwind`mt-2`} className="vendor-choosen">
                {makeEventData?.recommendedList?.length > 0 ? (
                    makeEventData.recommendedList.map((item) => (
                        <TouchableOpacity
                            key={item.productId}
                            onPress={() => handleVendorPress(item)}
                        >
                            <ListChooseVendor item={item} radius="xl" />
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={tailwind`text-center text-gray-500`}>
                        No recommended vendors available.
                    </Text>
                )}
            </ScrollView>
            <View style={tailwind`flex flex-row gap-4 w-full mt-12 items-center mb-5`}>
                <View style={tailwind`flex flex-row gap-2 justify-center p-4 rounded-full bg-gray-100`}>
                    <Text className="font-outfitSemiBold text-xl">Total</Text>
                    <Text
                        className="font-outfitRegular text-xl"
                        style={{ textAlign: "right", flex: 1 }}
                    >
                        {typeof totalCost === 'number' && totalCost > 0
                            ? totalCost.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).replace("IDR", "")
                            : "Rp 0"}
                    </Text>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={tailwind`flex-1 justify-center items-center bg-black bg-opacity-50`}>
                    <View style={tailwind`bg-white rounded-lg shadow-lg w-11/12 max-w-md p-5`}>
                        <Text style={tailwind`text-3xl font-outfitBold text-center mb-4`}>
                            Confirm Payment
                        </Text>
                        <TouchableOpacity
                            onPress={acceptMakeEvent}
                            style={tailwind`mx-auto items-center justify-center py-3 rounded-full bg-[#19ff8c] w-52 mb-2`}
                        >
                            <Text style={tailwind`text-white text-xl font-outfitBold py-1.5`}>
                                Pay Now!
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            style={tailwind`mx-auto items-center justify-center py-3 rounded-full bg-[#00AA55] w-52`}
                        >
                            <Text style={tailwind`text-white text-xl font-outfitBold py-1.5`}>
                                Later
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal Detail Vendor */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalDetailVisible}
                onRequestClose={() => {
                    setModalDetailVisible(false);
                }}
            >
                <View style={tailwind`flex-1 justify-center items-center bg-black bg-opacity-50 py-10`}>
                    <View style={tailwind`bg-white rounded-lg shadow-lg w-11/12 max-w-md max-h-3/4`}>
                        <TouchableOpacity
                            style={tailwind`absolute top-3 right-3 p-2 bg-red-500 rounded-full z-20`}
                            onPress={() => setModalDetailVisible(false)}
                        >
                            <MaterialCommunityIcons name="close" size={20} color="white" />
                        </TouchableOpacity>
                        <Text className="text-3xl font-outfitBold text-center my-4">Detail Vendor</Text>
                        <ScrollView contentContainerStyle={tailwind`p-4`} style={tailwind`max-h-3/4`}>
                            {selectedVendor && Object.entries(selectedVendor).map(([key, value], index) => (
                                <View key={index} style={tailwind`bg-gray-100 p-4 rounded-lg mb-2`}>
                                    <Text className="font-outfitSemiBold text-lg text-gray-800">
                                        {key
                                            .replace(/([A-Z])/g, ' $1') // Menambahkan spasi sebelum huruf kapital
                                            .replace(/^./, (str) => str.toUpperCase()) // Mengubah huruf pertama menjadi kapital
                                        }
                                    </Text>
                                    <Text className="font-outfitRegular text-sm text-gray-600">
                                        {value}
                                    </Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </MakeEventLayout>
    );
};

export default MakeEventTransactionNote;