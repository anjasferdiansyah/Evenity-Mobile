import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, { useEffect } from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import {router} from "expo-router";
import { useDispatch, useSelector } from 'react-redux';
import { getUserBalance, makeWithdrawRequest } from '@/redux/slices/withdrawHistorySlice';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { withdrawSchema } from '@/helper/validator/schema';

export default function WithdrawScreen() {


    const { accountNumber, bankName, accountName, userBalance, withdrawHistory } = useSelector(state => state.withdrawHistory)

    const {user} = useSelector(state => state.auth)

    const dispatch = useDispatch()
    console.log("withdrawHistory", withdrawHistory)



    useEffect(() => {
        dispatch(getUserBalance({ id: user.detail.userId }))
    }, [])


    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(withdrawSchema(userBalance)),
        defaultValues: {
          amount: '',
        },
      });

    const onSubmit = async (data) => {

        const hasPending = withdrawHistory.some(item => item.approvalStatus === 'PENDING');

        if (hasPending) {
          Alert.alert("Pending Withdraw Request", "You have a pending withdraw request. Please wait for it to be processed.");
          return;
        }


        try {
          const result = dispatch(makeWithdrawRequest({ amount: parseFloat(data.amount), id: user.detail.userId }));
          if (makeWithdrawRequest.fulfilled.match(result)) {
            Alert.alert("Success", "Withdraw request submitted successfully.");
          }
          reset(); // Reset the form after successful submission
        } catch (error) {
          console.log(error);
        }
      };


    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="w-full h-full pt-20 px-10">
                <TouchableOpacity onPress={() => router.back()}
                    className="p-2 bg-[#00F279] rounded-full self-start">
                    <AntDesignIcons name='arrowleft' size={20} color={'white'}/>
                </TouchableOpacity>
                <View className="mt-14">
                    <Text className="text-3xl font-outfitBold text-center">Withdraw</Text>
                    <View>
                        <Text className="text-xl font-outfitRegular text-center text-gray-500 mt-12">Your Balance</Text>
                        <Text className="text-3xl font-outfitBold text-center">{userBalance}</Text>
                    </View>
                    <Text className="text-xl font-outfitRegular text-center text-gray-500 mt-12">{accountName}</Text>
                    <Text className="text-xl font-outfitBold text-center">{bankName} - {accountNumber}</Text>
                    <View className="flex flex-row items-center justify-center border-b-[0.5px]  border-gray-400 px-8">
                        <Text className="text-5xl font-outfitBold text-center text-gray-500  mt-12">Rp.</Text>
                        <Controller
                            control={control}
                            name="amount"
                            render={({ field : { onChange, value: amount }}) => (
                                <TextInput keyboardType='numeric' value={amount} onChangeText={onChange} className="py-2 px-4 rounded-xl text-5xl font-outfitRegular w-[80%] mt-12 "/>
                            )}
                            />
                    </View>
                    {errors.amount && <Text className="text-red-500 text-center">{errors.amount.message}</Text>}
                    <View className="flex flex-row items-center justify-center gap-8">
                        <TouchableOpacity
                            onPress={handleSubmit(onSubmit)}
                            className="flex flex-row items-center justify-center bg-[#00F279] py-3 px-8 rounded-full mt-20">
                            <Text className="text-xl font-outfitBold text-center text-white">Send</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex flex-row items-center justify-center bg-red-500 py-3 px-8  rounded-full mt-20">
                            <Text className="text-xl font-outfitBold text-center text-white">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
