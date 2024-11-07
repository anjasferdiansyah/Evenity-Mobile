import tailwind from "twrnc";
import {
  Modal,
  ScrollView,
  StyleSheet,
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
    updateRecommendedList,
    totalCost,
    selectedDetailCategories,
  } = useSelector((state) => state.makeEventSlice);

  useEffect(() => {
    console.log("listSelectedPas", listSelected);
  }, [listSelected]);
  const { id } = useSelector((state) => state.auth);

  const [modalDetailVisible, setModalDetailVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const handleVendorPress = (vendor) => {
    setSelectedVendor(vendor); // Set selected vendor data
    setModalDetailVisible(true); // Open modal
    // console.log("Selected vendor:", vendor);
    // console.log("Current makeEventData:", makeEventData);

    //ini
    const updatedVendorData = {
      productId: vendor.productId,
      newVendorData: {
        // add necessary vendor fields, like cost, qty, etc.
        qty: vendor.qty || 1,
        cost: vendor.cost || 0,
        notes: vendor.notes || "No specific notes",
        mainCategory: vendor.mainCategory,
      },
    };
    dispatch(updateRecommendedList(updatedVendorData));
    // ini
  };

  const handleRegenerateVendor = () => {
    console.log("id ", id);
    console.log("recommendedListTrx", recommendedList);
    console.log("listSelected", listSelected);
    console.log("makeEventData", makeEventData);
    console.log("selectedDetailCategories", selectedDetailCategories);
    const recommendedArray = Object.values(recommendedList);
    console.log("recommendedArray", recommendedArray);
    const previousProductIds = recommendedArray.map(
      (vendor) => vendor.productId
    );
    console.log("previousProductIds", previousProductIds);

    const newEventData = {
      ...makeEventRegist,
      customerId: id,
      categoryProduct: selectedDetailCategories,
      previousProduct: listSelected,
    };
    console.log("newEventData", newEventData);
    dispatch(regenerateEvent(newEventData));
  };

  const acceptMakeEvent = () => {
    console.log("recommendedListTrx2", recommendedList);

    const recommendedArray = Object.values(recommendedList);
    console.log("recommendedArray", recommendedArray);
    const newEventData = recommendedArray.map((vendor) => ({
      productId: vendor.productId || "defaultProductId",
      qty: vendor.qty || 1,
      unit: vendor.mainCategory === "CATERING" ? "PCS" : "DAY",
      notes: vendor.notes || "No specific notes",
      cost: vendor.cost || 0,
    }));

    console.log("newEventData to accept", newEventData);

    const eventDataCopy = { ...makeEventData };
    delete eventDataCopy.recommendedList;

    const eventData = {
      ...eventDataCopy,
      eventDetail: newEventData,
    };

    console.log("eventData body", eventData);

    dispatch(acceptAndMakeEvent(eventData));
    router.push(`/dashboard/(tabs)/transaction`);
  };

  useEffect(() => {
    console.log("makeEventData todays", makeEventData);
  }, [makeEventData]);

  return (
    <MakeEventLayout
      progress={100}
      nextRoute="transaction"
      handleRegenerateVendor={handleRegenerateVendor}
      handleAccept={acceptMakeEvent}
      nextInfor="Make Event"
      resetRecommendedList={resetRecommendedList}
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
            // <ListChooseVendor key={item.productId} item={item} radius="xl" />
            <TouchableOpacity
              key={item.productId}
              onPress={() => handleVendorPress(item)}
            >
              <ListChooseVendor item={item} radius="xl" />
            </TouchableOpacity>
          ))
        ) : (
          <Text>No recommended vendors available.</Text>
        )}
      </ScrollView>
      <View className="flex flex-row gap-4 w-full mt-12 items-center">
        <View
          className="flex flex-row gap-2 justify-center"
          style={[tailwind` p-4 rounded-full`]}
        >
          <Text className="font-outfitSemiBold text-xl">Total</Text>
          <Text
            className="font-outfitRegular text-xl"
            style={{ textAlign: "right", flex: 1 }}
          >
            {totalCost > 0
              ? totalCost
                  .toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                  .replace("IDR", "")
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

      {/* modal detail vendor */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDetailVisible}
        onRequestClose={() => {
          setModalDetailVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 25,
                right: 20,
                backgroundColor: "red",
                borderRadius: 50,
                padding: 7,
              }}
              onPress={() => setModalDetailVisible(!modalDetailVisible)}
            >
              <MaterialCommunityIcons name="close" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.modalText} className="text-3xl font-outfitBold">
              Detail Vendor
            </Text>
            <View className="h-[85%] w-[90%]">
              <ScrollView>
                <View className="py-4">
                  <Text className="text-xl font-outfitRegular text-gray-500">
                    Date Event
                  </Text>
                  <Text className="text-xl font-outfitSemiBold">
                    20 November - 21 November
                  </Text>
                </View>
                <View className="py-4">
                  <Text className="text-xl font-outfitRegular text-gray-500">
                    Days
                  </Text>
                  <Text className="text-xl font-outfitSemiBold">2</Text>
                </View>
                <View className="py-4">
                  <Text className="text-xl font-outfitRegular text-gray-500">
                    Quantity (pcs)
                  </Text>
                  <Text className="text-xl font-outfitSemiBold">2</Text>
                </View>
                <View className="py-4">
                  <Text className="text-lg font-outfitRegular text-gray-500">
                    Product Name
                  </Text>
                  <Text className="text-lg font-outfitSemiBold">Catering</Text>
                </View>
                <View className="py-4">
                  <Text className="text-lg font-outfitRegular text-gray-500">
                    Event Name
                  </Text>
                  <Text className="text-lg font-outfitSemiBold">Halloween</Text>
                </View>
                <View className="py-4">
                  <Text className="text-lg font-outfitRegular text-gray-500">
                    Address
                  </Text>
                  <Text className="text-lg font-outfitSemiBold">
                    Jalan Sekartaji 1 No 20 Malang, Jawa Timur
                  </Text>
                </View>
                <View className="py-4">
                  <Text className="text-lg font-outfitRegular text-gray-500">
                    Note
                  </Text>
                  <Text className="text-lg font-outfitSemiBold">
                    Harus Pedess Lurrr!
                  </Text>
                </View>
              </ScrollView>
            </View>
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
    width: "80%",
    height: "80%",
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
