import { StyleSheet, TouchableOpacity } from "react-native";
import { Modal, Text, TextInput, View } from "react-native";

export default function ModalRegister({
  userName,
  setUserName,
  phoneNumber,
  setPhoneNumber,
  address,
  setAddress,
  handleAccept,
  modalVisible,
}) {
  return (
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
          <View className="w-full p-10">
            <Text className="text-2xl font-outfitBold w-full">
              Completing Register
            </Text>
            <View className="flex flex-col gap-4 py-safe-or-12">
              <View className="flex flex-col gap-2">
                <Text className="font-outfitRegular text-gray-500">Name</Text>
                <TextInput
                  className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                  placeholder="Enter vendor name.."
                  onChangeText={setUserName}
                  value={userName}
                />
              </View>
              <View className="flex flex-col gap-2">
                <Text className="font-outfitRegular text-gray-500">
                  Phone Number
                </Text>
                <TextInput
                  onChangeText={setPhoneNumber}
                  value={phoneNumber}
                  className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                  placeholder="Enter phoneNumber number"
                />
              </View>
              <View className="flex flex-col gap-2">
                <Text className="font-outfitRegular text-gray-500">
                  Address Detail
                </Text>
                <TextInput
                  onChangeText={setAddress}
                  value={address}
                  className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                  placeholder="Enter product name"
                />
              </View>
              <TouchableOpacity
                onPress={() => handleAccept()}
                className="bg-[#00AA55] mx-auto w-[90%] mt-12 items-center justify-center px-8 py-3 rounded-full"
              >
                <Text className="text-white text-xl font-bold">Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

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
