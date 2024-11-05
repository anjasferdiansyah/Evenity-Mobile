import {ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import RNPickerSelect from 'react-native-picker-select';
import {router} from "expo-router";
import { useDispatch, useSelector } from 'react-redux';
import { getBankAccount, getListBank } from '@/redux/slices/withdrawHistorySlice';
import { useForm, Controller } from 'react-hook-form';

export default function WithdrawNextScreen() {


    const dispatch = useDispatch();

    const {listBank, status, isValidBankAccount} = useSelector(state => state.withdrawHistory)

    const [isVerifying, setIsVerifying] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        dispatch(getListBank())
        
    }, [])

    const mapToLabelAndValue = (list) => {
        return list.map((item) => ({
            label: item.namaBank,
            value: item.kodeBank
        }))
    }

    const onSubmit = async (data) => {
        setIsVerifying(true);
        try {
            const resultAction = await dispatch(getBankAccount({
                bankCode: data.selectedBank,
                accountNumber: data.cardAccount
            }));
            if (getBankAccount.fulfilled.match(resultAction) && resultAction.payload.status === true) {
                Alert.alert("Success", "Bank account verified successfully.");
                router.push('./final');
            } else {
                Alert.alert("Error", "Failed to verify bank account. Please try again.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "An unexpected error occurred.");
        } finally {
            setIsVerifying(false);
        }
    };
    


    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="w-full h-full pt-20 px-10">
                <TouchableOpacity onPress={() => router.back()} className="p-2 bg-[#00F279] rounded-full self-start">
                    <AntDesignIcons name='arrowleft' size={20} color={'white'}/>
                </TouchableOpacity>
                <View className="mt-14">
                    <Text className="text-3xl font-outfitBold text-center">Withdraw</Text>
                    <View className="flex flex-col gap-2">
                        <Text className="text-xl font-outfitRegular text-gray-500 mt-12">Bank</Text>
                        {status === "loading" ? (
                                <ActivityIndicator size="small" color="#00F279" />
                            ) : (
                                <Controller
                                name="selectedBank"
                                control={control}
                                rules={{ required: "Bank selection is required" }}
                                render={({ field: { onChange, value } }) => (
                                    <View className="rounded-xl border-[0.5px] border-gray-400">
                                        <RNPickerSelect
                                            onValueChange={(value) => onChange(value)}
                                            items={mapToLabelAndValue(listBank)}
                                            placeholder={{ label: "Select your bank", value: null }}
                                            value={value}
                                        />
                                    </View>
                                )}
                            />
                        )}
                        {errors.selectedBank && <Text className="text-red-500">{errors.selectedBank.message}</Text>}

                    </View>
                    <View className="flex flex-col gap-2">
                        <Text className="text-xl font-outfitRegular text-gray-500 mt-12">Account Number</Text>
                        <Controller
                            name="cardAccount"
                            control={control}
                            rules={{
                                required: "Account number is required",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Account number must contain only numbers",
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className="py-2 px-4 rounded-xl border-[0.5px] border-gray-400"
                                    placeholder="Enter card number"
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType="number-pad"
                                />
                            )}
                        />
                        {errors.cardAccount && <Text className="text-red-500">{errors.cardAccount.message}</Text>}
                    </View>

                </View>
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    disabled={isVerifying}
                    className="bg-[#00F279] self-end w-[30%] mt-12 items-center px-8 py-3 rounded-full"
                >
                    {isVerifying ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text className="text-white text-xl font-bold">Next</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}
