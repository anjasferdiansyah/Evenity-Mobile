import {ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View, SafeAreaView} from 'react-native'
import React, {useEffect, useState} from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import RNPickerSelect from 'react-native-picker-select';
import {router} from "expo-router";
import {useDispatch, useSelector} from 'react-redux';
import {getBankAccount, getListBank} from '@/redux/slices/withdrawHistorySlice';
import {Controller, useForm} from 'react-hook-form';

export default function WithdrawNextScreen() {
    const dispatch = useDispatch();
    const {listBank, status} = useSelector(state => state.withdrawHistory)
    const [isVerifying, setIsVerifying] = useState(false);
    const {control, handleSubmit, formState: {errors}} = useForm();

    useEffect(() => {
        dispatch(getListBank())
    }, [dispatch])

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
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 px-6 pt-6">
                {/* Header */}
                <View className="flex-row items-center mb-8 mt-10">
                    <TouchableOpacity 
                        onPress={() => router.back()} 
                        className="mr-4 p-2 rounded-full bg-[#F0F0F0]"
                    >
                        <AntDesignIcons name='arrowleft' size={20} color={'#333'}/>
                    </TouchableOpacity>
                    <Text className="text-2xl font-outfitBold text-[#333]">Withdraw</Text>
                </View>

                {/* Form Container */}
                <View className="space-y-6">
                    {/* Bank Selection */}
                    <View>
                        <Text className="text-base font-outfitBold text-[#666] mb-2">Bank</Text>
                        {status === "loading" ? (
                            <ActivityIndicator size="small" color="#00F279"/>
                        ) : (
                            <Controller
                                name="selectedBank"
                                control={control}
                                rules={{required: "Bank selection is required"}}
                                render={({field: {onChange, value}}) => (
                                    <View className="bg-[#F5F5F5] rounded-xl">
                                        <RNPickerSelect
                                            onValueChange={(value) => onChange(value)}
                                            items={mapToLabelAndValue(listBank)}
                                            placeholder={{label: "Select your bank", value: null}}
                                            value={value}
                                            style={{
                                                inputAndroid: {
                                                    color: '#333',
                                                    paddingHorizontal: 12,
                                                    paddingVertical: 14,
                                                },
                                                inputIOS: {
                                                    color: '#333',
                                                    paddingHorizontal: 12,
                                                    paddingVertical: 14,
                                                }
                                            }}
                                        />
                                    </View>
                                )}
                            />
                        )}
                        {errors.selectedBank && (
                            <Text className="text-red-500 mt-2 text-sm">
                                {errors.selectedBank.message}
                            </Text>
                        )}
                    </View>

                    {/* Account Number */}
                    <View>
                        <Text className="text-base font-outfitBold text-[#666] mb-2 mt-2">
                            Account Number
                        </Text>
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
                            render={({field: {onChange, value}}) => (
                                <TextInput
                                    className="bg-[#F5F5F5] py-4 px-4 rounded-xl text-[#333]"
                                    placeholder="Enter account number"
                                    placeholderTextColor="#999"
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType="number-pad"
                                />
                            )}
                        />
                        {errors.cardAccount && (
                            <Text className="text-red-500 mt-2 text-sm">
                                {errors.cardAccount.message}
                            </Text>
                        )}
                    </View>

                    {/* Continue Button */}
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        disabled={isVerifying}
                        className={`
                            mt-6 py-4 rounded-xl 
                            ${isVerifying ? 'bg-gray-300' : 'bg-[#00F279]'}
                        `}
                    >
                        {isVerifying ? (
                            <ActivityIndicator size="small" color="white"/>
                        ) : (
                            <Text className="text-center text-white text-lg font-outfitBold">
                                Next
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}