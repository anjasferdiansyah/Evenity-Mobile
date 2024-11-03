import {View} from "react-native";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {completingRegister, resetError, resetStatus,} from "@/redux/slices/authSlice";
import {router} from "expo-router";
import ModalRegister from "@/components/completing-register/modalRegister";

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
            router.push("/auth/login");
        }
    }, [status]);

    useEffect(() => {
        if (error) {
            dispatch(resetError());
            alert(error);
        }
    }, [error]);

    const handleAccept = () => {
        setModalVisible(false);
    };

    const handleRegister = () => {
        const newRegisterData = {
            ...registerData,
            name: userName,
            phoneNumber,
            address,
        };
        console.log(newRegisterData);
        dispatch(completingRegister(newRegisterData));
    };

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <ModalRegister
                userName={userName}
                phoneNumber={phoneNumber}
                address={address}
                setAddress={setAddress}
                setPhoneNumber={setPhoneNumber}
                setUserName={setUserName}
                handleAccept={handleAccept}
                modalVisible={true}
            />
        </View>
    );
};

export default CompletingRegisterUser;
