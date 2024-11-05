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
import { registMakeEvent, makeEvent } from "@/redux/slices/makeEventSlice";

const MakeEventTransactionNote = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { makeEventData } = useSelector((state) => state.makeEventSlice);

  const handleAccept = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    console.log("makeEventData", makeEventData);
  }, [makeEventData]);

  const handleRegenerateVendor = () => {
    // console.log("listSelectedVendor", listSelectedVendor);
    const newEventData = {
      // ...makeEventData,
      // customerId: "05e2c49d-ee52-4d35-9ab8-6d8564f328bd",
      // categoryProduct: listSelectedVendor,
      // previousProduct: [],
      name: "Flower Fest 2025",
      description:
        "A festival in Malang city where every florist or farmer in Malang region gather and show of their work in flower arrangement and intricate gardening skill",
      startDate: "2025-01-02",
      endDate: "2025-01-05",
      startTime: "07:00:00",
      endTime: "18:00:00",
      province: "JAWA TIMUR",
      city: "KOTA MALANG",
      district: "Lowokwaru",
      address: "Malang city, Klojen district",
      theme: "Flower festival",
      participant: 100,
      customerId: "05e2c49d-ee52-4d35-9ab8-6d8564f328bd",
      categoryProduct: [
        {
          categoryId: "f666d1e6-6f36-4ea4-8533-84a2a79a7d7b",
          minCost: 9000,
          maxCost: 50000000,
        },
      ],
      previousProduct: ["edf13a67-53d3-4b2b-8146-e84f8e4b8412"],
    };
    console.log("newEventData", newEventData);
    dispatch(makeEvent(newEventData));
  };

  // const handleConfirm = () => {
  //   setModalVisible(false);
  //   navigation.navigate("Home");
  // };

  // const entertainmentItems = [
  //   { id: 1, name: "Joko Horeg", price: "10.000.000" },
  //   { id: 2, name: "Andi Mc", price: "15.000.000" },
  //   { id: 3, name: "Soni Catering enak sekali", price: "15.000.000" },
  //   { id: 4, name: "Gelora bung karno", price: "15.000.000" },
  //   { id: 5, name: "Gelora bung karno", price: "15.000.000" },
  //   { id: 6, name: "Gelora bung karno", price: "15.000.000" },
  //   { id: 7, name: "Gelora bung karno", price: "15.000.000" },
  // ];

  return (
    <MakeEventLayout
      progress={100}
      nextRoute="transaction"
      handleAccept={handleRegenerateVendor}

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
              onPress={handleAccept}
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
