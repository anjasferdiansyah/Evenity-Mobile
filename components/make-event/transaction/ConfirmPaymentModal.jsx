// ConfirmPaymentModal.js
import React from "react";
import {Modal, Text, TouchableOpacity, View} from "react-native";
import tailwind from "twrnc";

const ConfirmPaymentModal = ({visible, onClose, onAccept}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={tailwind`flex-1 justify-center items-center bg-black bg-opacity-50`}>
                <View style={tailwind`bg-white rounded-lg shadow-lg w-11/12 max-w-md p-5`}>
                    <Text style={tailwind`text-3xl font-outfitBold text-center mb-4`}>
                        Confirm Payment
                    </Text>
                    <TouchableOpacity
                        onPress={onAccept}
                        style={tailwind`mx-auto items-center justify-center py-3 rounded-full bg-[#19ff8c] w-52 mb-2`}
                    >
                        <Text style={tailwind`text-white text-xl font-outfitBold py-1.5`}>
                            Pay Now!
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onClose}
                        style={tailwind`mx-auto items-center justify-center py-3 rounded-full bg-[#00AA55] w-52`}
                    >
                        <Text style={tailwind`text-white text-xl font-outfitBold py-1.5`}>
                            Later
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmPaymentModal;