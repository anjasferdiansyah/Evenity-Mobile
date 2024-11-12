import MakeEventLayout from "../../app/dashboard/make-event";
import tailwind from "twrnc";
import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import React, {useState} from "react";
import ListChooseVendor from "@/components/ListChooseVendor-user";

const MakeEventTransactionNote = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleAccept = () => {
        setModalVisible(true);
    };

    const handleConfirm = () => {
        setModalVisible(false);
        // navigation.navigate("Home");
    };

    const entertainmentItems = [
        {id: 1, name: "Joko Horeg", price: "10.000.000"},
        {id: 2, name: "Andi Mc", price: "15.000.000"},
        {id: 3, name: "Soni Catering enak sekali", price: "15.000.000"},
        {id: 4, name: "Gelora bung karno", price: "15.000.000"},
        {id: 5, name: "Gelora bung karno", price: "15.000.000"},
        {id: 6, name: "Gelora bung karno", price: "15.000.000"},
        {id: 7, name: "Gelora bung karno", price: "15.000.000"},
    ];

    return (
        <MakeEventLayout
            progress={100}
            nextRoute="./makeEvent-capacityEvent"
            handleAccept={handleAccept}
        >
            <View className="px-10" style={tailwind`my-2 mx-auto`}>
                <Text className="font-outfitSemiBold text-2xl" style={tailwind`mb-3`}>
                    Vendor Generated
                </Text>
            </View>

            <ScrollView style={tailwind`mt-2 `} className="vendor-choosen">
                {entertainmentItems.map((item) => (
                    <ListChooseVendor key={item.id} item={item} radius="xl"/>
                ))}
            </ScrollView>

            <View className="flex flex-row gap-4 w-full mt-12 px-10 items-center">
                <View
                    className="flex flex-row gap-2"
                    style={tailwind`w-[90%] p-4 rounded-full`}
                >
                    <Text className="font-outfitSemiBold text-xl">Total</Text>
                    <Text
                        className="font-outfitRegular text-xl"
                        style={{textAlign: "right", flex: 1, marginStart: 10}}
                    >
                        10.000.000
                    </Text>
                </View>
            </View>

            {/* <View
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
      </View> */}

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
                            style={tailwind`w-full bg-[#19ff8c] w-52 mb-2`}
                        >
                            <Text className="text-white text-xl font-outfitBold py-1.5">
                                Pay Now!
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            className=" mx-auto items-center justify-center py-3 rounded-full"
                            style={tailwind`w-full bg-[#00AA55] w-52 px-10`}
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
    button: {
        borderRadius: 20,
        elevation: 2,
        marginTop: 10,
        padding: 10,
    },
    buttonClose: {
        backgroundColor: "#00AA55",
    },
    centeredView: {
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        flex: 1,
        justifyContent: "center",
    },
    modalText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    modalView: {
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        elevation: 5,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default MakeEventTransactionNote;
