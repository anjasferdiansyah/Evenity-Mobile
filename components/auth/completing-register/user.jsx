import {Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {completingRegisterUser, resetError, resetStatus,} from "@/redux/slices/authSlice";
import {router} from "expo-router";
import {ROUTES} from "@/constant/ROUTES";

const CompletingRegisterUser = () => {
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const {registerData, status, error} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (status === "registered") {
            dispatch(resetStatus());
            alert("Registered successfully, please login");
            router.push(ROUTES.AUTH.LOGIN);
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (error) {
            dispatch(resetError());
            alert(error);
        }
    }, [dispatch, error]);

    const handleRegister = () => {
        const newRegisterData = {
            ...registerData,
            fullName: userName,
            phoneNumber,
            address,
        };
        console.log(newRegisterData);
        dispatch(completingRegisterUser(newRegisterData));
    };

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="w-full p-10">
                <Text className="text-2xl font-outfitBold w-full">
                    Completing Register
                </Text>
                <View className="flex flex-col gap-4 py-safe-or-12">
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Name</Text>
                        <TextInput
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder="Enter name.."
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
                            placeholder="Enter phone number"
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
                            placeholder="Enter address detail"
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => handleRegister()}
                        className="bg-[#00AA55] mx-auto w-[90%] mt-12 items-center justify-center px-8 py-3 rounded-full"
                    >
                        <Text className="text-white text-xl font-bold">Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CompletingRegisterUser;
