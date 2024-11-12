// VendorDetailModal.js
import React from "react";
import {Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import tailwind from "twrnc";

const VendorDetailModal = ({visible, onClose, vendor}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={tailwind`flex-1 justify-center items-center bg-black bg-opacity-50 py-10`}>
                <View style={tailwind`bg-white rounded-lg shadow-lg w-11/12 max-w-md max-h-3/4`}>
                    <TouchableOpacity
                        style={tailwind`absolute top-3 right-3 p-2 bg-red-500 rounded-full z-20`}
                        onPress={onClose}
                    >
                        <MaterialCommunityIcons name="close" size={20} color="white"/>
                    </TouchableOpacity>
                    <Text className="text-3xl font-outfitBold text-center my-4">Detail Vendor</Text>
                    <ScrollView contentContainerStyle={tailwind`p-4`} style={tailwind`max-h-3/4`}>
                        {vendor && Object.entries(vendor).map(([key, value], index) => (
                            <View key={index} style={tailwind`bg-gray-100 p-4 rounded-lg mb-2`}>
                                <Text className="font-outfitSemiBold text-lg text-gray-800">
                                    {key
                                        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                                        .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
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
    );
};

export default VendorDetailModal;