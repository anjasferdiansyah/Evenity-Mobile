import tailwind from "twrnc";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import ListChooseVendor from "@/components/ListChooseVendor-user";
import MakeEventLayout from "@/app/dashboard/make-event/layout";
import { useDispatch, useSelector } from "react-redux";
import {
  regenerateEvent,
  acceptAndMakeEvent,
} from "@/redux/slices/makeEventSlice";
import { router } from "expo-router";

const MakeEventTransactionNote = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { makeEventData, recommendedList, makeEventRegist, listSelected } =
    useSelector((state) => state.makeEventSlice);

  useEffect(() => {
    console.log("listSelectedPas", listSelected);
  }, [listSelected]);


  const handleRegenerateVendor = () => {
    console.log("recommendedListTrx", recommendedList);
    const recommendedArray = Object.values(recommendedList);
    const previousProductIds = recommendedArray.map(
      (vendor) => vendor.vendorId
    );

    const newEventData = {
      ...makeEventRegist,
      customerId: "05e2c49d-ee52-4d35-9ab8-6d8564f328bd",
      categoryProduct: listSelected,
      previousProduct: previousProductIds,
    };
    console.log("newEventData", newEventData);
    dispatch(regenerateEvent(newEventData));
  };


 const acceptMakeEvent = () => {
  //  if (!recommendedList || Object.keys(recommendedList).length === 0) {
  //    console.warn("recommendedList belum tersedia.");
  //    return;
  //  }

   console.log("recommendedListTrx2", recommendedList);

   const recommendedArray = Object.values(recommendedList);
   const newEventData = recommendedArray.map((vendor) => ({
     productId: vendor.productId || "defaultProductId",
     qty: vendor.qty || 1,
     unit: vendor.unit || "PCS",
     notes: vendor.notes || "No specific notes",
     cost: vendor.cost || 0,
   }));

   console.log("newEventData to accept", newEventData);

   // Salin `makeEventData` lalu hapus `recommendedList`
   const eventDataCopy = { ...makeEventData };
   delete eventDataCopy.recommendedList;

   // Tambahkan eventDetail ke dalam salinan `makeEventData`
   const eventData = {
     ...eventDataCopy,
     eventDetail: newEventData,
   };

   dispatch(acceptAndMakeEvent(eventData));
   router.push(`/dashboard/(tabs)/transaction`);
 };



  return (
    <MakeEventLayout
      progress={100}
      nextRoute="transaction"
      handleRegenerateVendor={handleRegenerateVendor}
      handleAccept={acceptMakeEvent}
      nextInfor="Make Event"
    >
      <View className="px-10" style={[tailwind`my-2 mx-auto`]}>
        <Text className="font-outfitSemiBold text-2xl" style={[tailwind`mb-3`]}>
          Vendor Generated
        </Text>
      </View>

      <ScrollView style={[tailwind`mt-2 `]} className="vendor-choosen">
        {makeEventData &&
        makeEventData.recommendedList &&
        makeEventData.recommendedList.length > 0 ? (
          makeEventData.recommendedList.map((item) => (
            <ListChooseVendor key={item.productId} item={item} radius="xl" />
            // <ListVendor key={item.productId} item={item} radius="xl" />
          ))
        ) : (
          <Text>No recommended vendors available.</Text>
        )}
      </ScrollView>

      <View className="flex flex-row gap-4 w-full mt-12 px-10 items-center">
        <View
          className="flex flex-row gap-2"
          style={[tailwind`w-[90%] p-4 rounded-full`]}
        >
          <Text className="font-outfitSemiBold text-xl">Total</Text>
          <Text
            className="font-outfitRegular text-xl"
            style={{ textAlign: "right", flex: 1, marginStart: 10 }}
          >
            10.000.000
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText} className="text-3xl font-outfitBold">
              Confirm Payment
            </Text>
            <TouchableOpacity
              // onPress={handleAccept}
              className=" mx-auto items-center justify-center  py-3 rounded-full"
              style={[tailwind`w-full bg-[#19ff8c] w-52 mb-2`]}
            >
              <Text className="text-white text-xl font-outfitBold py-1.5">
                Pay Now!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              className=" mx-auto items-center justify-center py-3 rounded-full"
              style={[tailwind`w-full bg-[#00AA55] w-52 px-10`]}
            >
              <Text className="text-white text-xl font-outfitBold py-1.5">
                Later
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </MakeEventLayout>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: "#00AA55",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MakeEventTransactionNote;
