// MakeEventTransactionNote.js
import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {
    acceptAndMakeEvent,
    regenerateEvent,
    resetRecommendedList,
    updateRecommendedList,
} from "@/redux/slices/makeEventSlice";
import {router} from "expo-router";
import MakeEventLayout from "@/components/make-event/layout";
import tailwind from "twrnc";
import VendorList from "@/components/make-event/transaction/VendorList";
import TotalCost from "@/components/make-event/transaction/TotalCost";
import ConfirmPaymentModal from "@/components/make-event/transaction/ConfirmPaymentModal";
import VendorDetailModal from "@/components/make-event/transaction/VendorDetailModal";

const MakeEventTransactionNote = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDetailVisible, setModalDetailVisible] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [lockedVendor, setLockedVendor] = useState([]);
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
    const {id} = useSelector((state) => state.auth);

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

        const categoryToRemove = lockedVendor.map(vendor => vendor.categoryId);
        const categoryProduct = selectedDetailCategories.filter(category => !categoryToRemove.includes(category.categoryId));

        const newEventData = {
            ...makeEventRegist,
            customerId: id,
            categoryProduct,
            previousProduct: listSelected,
            lockedProduct: lockedVendor || [],
        };
        dispatch(resetRecommendedList());

        dispatch(regenerateEvent(newEventData));
        setLockedVendor([])
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

        const eventDataCopy = {...makeEventData};
        delete eventDataCopy.recommendedList;

        const eventData = {
            ...eventDataCopy,
            eventDetail: newEventData,
        };

        try {
            dispatch(acceptAndMakeEvent(eventData));
            if (makeEventData) {
                router.replace(`/dashboard/event`);
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
            <VendorList
                vendors={makeEventData?.recommendedList || []}
                onVendorPress={handleVendorPress}
                lockedVendors={lockedVendor} setLockedVendors={setLockedVendor}
            />
            <TotalCost totalCost={totalCost}/>
            <ConfirmPaymentModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onAccept={acceptMakeEvent}
            />
            <VendorDetailModal
                visible={modalDetailVisible}
                onClose={() => setModalDetailVisible(false)}
                vendor={selectedVendor}
            />
        </MakeEventLayout>
    );
};

export default MakeEventTransactionNote;