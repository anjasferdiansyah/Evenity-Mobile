import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { ProgressBar } from "../components/progress-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import tailwind from "twrnc";

const MakeEventTransactionNote = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleAccept = () => {
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    navigation.navigate("Home");
  };

  const entertainmentItems = [
    { id: 1, name: "Joko Horeg", price: "10.000.000" },
    { id: 2, name: "Andi Mc", price: "15.000.000" },
    { id: 3, name: "Soni Catering enak sekali", price: "15.000.000" },
    { id: 4, name: "Gelora bung karno", price: "15.000.000" },
    { id: 5, name: "Gelora bung karno", price: "15.000.000" },
    { id: 6, name: "Gelora bung karno", price: "15.000.000" },
    { id: 7, name: "Gelora bung karno", price: "15.000.000" },
  ];

  return (
    // <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 justify-center bg-white">
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 40,
            right: 20,
            backgroundColor: "red",
            borderRadius: 50,
            padding: 10,
          }}
        //   onPress={Home}
        >
          <MaterialCommunityIcons name="close" size={24} color="white" />
        </TouchableOpacity>

        <View className="px-10" style={[tailwind`my-2 mx-auto mt-25`]}>
          <Text
            className="font-outfitSemiBold text-2xl"
            style={[tailwind`mb-3`]}
          >
            Vendor Generated
          </Text>
        </View>

        <ScrollView style={[tailwind`mt-2 `]} className="vendor-choosen">
          {entertainmentItems.map((item) => (
            <View
              key={item.id}
              className="flex flex-row gap-4 w-full px-10 items-center "
              style={[tailwind`mt-2`]}
            >
              <View
                className="flex flex-row gap-2"
                style={[tailwind`w-[90%] bg-slate-200 p-4 rounded-xl`]}
              >
                <Text className="font-outfitSemiBold text-xl">
                  Entertaiment
                </Text>
                <Text
                  className="font-outfitRegular text-xl"
                  style={{ textAlign: "right", flex: 1 }}
                >
                  10.000.000
                </Text>
              </View>
              <TouchableOpacity>
                <Text>X</Text>
              </TouchableOpacity>
            </View>
          ))}
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

        <View
          className="w-full px-10"
          style={[tailwind`my-3 flex flex-col gap-5`]}
        >
          <TouchableOpacity
            onPress={handleAccept}
            className="bg-[#00AA55] mx-auto mt-14 items-center justify-center py-3 rounded-full"
            style={[tailwind`w-full`]}
          >
            <Text className="text-white text-xl font-outfitBold py-1.5">
              Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MakeEventTransactionNote")}
            className=" mx-auto items-center justify-center py-3 rounded-full"
            style={[tailwind`w-full bg-[#19ff8c]`]}
          >
            <Text className="text-white text-xl font-outfitBold py-1.5">
              Regenerate
            </Text>
          </TouchableOpacity>
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
              <Text style={styles.modalText} className="text-3xl font-outfitBold">Confirm Payment</Text>
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
      </View>
    // </ScrollView>
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
