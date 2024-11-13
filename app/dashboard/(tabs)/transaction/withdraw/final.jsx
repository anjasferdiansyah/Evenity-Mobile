import {Alert, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import {router} from "expo-router";
import { useDispatch, useSelector } from 'react-redux';
import { getUserBalance, loadWithdrawHistory, makeWithdrawRequest } from '@/redux/slices/withdrawHistorySlice';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { withdrawSchema } from '@/helper/validator/schema';
import { ROUTES } from '@/constant/ROUTES';
import BottomPadding from '@/components/misc/BottomPadding';

export default function WithdrawScreen() {


    const { accountNumber, bankName, accountName, userBalance, withdrawHistory, statusWithdraw } = useSelector(state => state.withdrawHistory)

    console.log("withdrawHistory", withdrawHistory)
    console.log()

    const {user} = useSelector(state => state.auth)
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchWithdrawHistory();
    }, []);

    const fetchWithdrawHistory = useCallback(() => {
        dispatch(loadWithdrawHistory(user.detail.userId));
    }, [dispatch, user]);


    const onRefresh = useCallback(() => {

      setRefreshing(true);
      Promise.all([
          dispatch(getUserBalance({ id: user.detail.userId })),
          dispatch(loadWithdrawHistory(user.detail.userId))
      ]).then(() => {
        setRefreshing(false);
      }).catch(() => {
          setRefreshing(false);
      });
  }, [dispatch, user]);


    const dispatch = useDispatch()
    console.log("withdrawHistory", withdrawHistory)

    const formatNumberWithCommas = (number) => {
        if (!number) return '';
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }


    useEffect(() => {
        dispatch(getUserBalance({ id: user.detail.userId }))
    }, [])

    useEffect(() => {
      dispatch(loadWithdrawHistory(user.detail.userId))
    }, [dispatch])


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
      
        // Tambahkan alert konfirmasi
        Alert.alert(
          "Confirm Withdrawal", 
          `Are you sure you want to withdraw ${data.amount}?`,
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Confirm",
              onPress: async () => {

                try {
                  const result = dispatch(makeWithdrawRequest({ 
                    amount: parseFloat(data.amount), 
                    id: user.detail.userId 
                  }));

                  console.log(statusWithdraw)
      
                    Alert.alert(
                      "Success", 
                      "Withdraw request submitted successfully.",
                      [
                        {
                          text: "OK",
                          onPress: () => {
                            reset();
                            router.push(ROUTES.DASHBOARD.TRANSACTION.INDEX)
                          } // Reset form after user acknowledges success
                        }
                      ]
                    );
 
                  
                } catch (error) {
                  console.log(error);
                  Alert.alert("Error", "Failed to submit withdraw request.");
                }
              }
            }
          ]
        );
      };

    return (
        <ScrollView
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#2563EB']}
            />
          }
        className=" bg-white"
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <View className="w-full h-full pt-20 px-10">
                <TouchableOpacity onPress={() => router.back()}
                    className="p-2 bg-[#00F279] rounded-full self-start">
                    <AntDesignIcons name='arrowleft' size={20} color={'white'}/>
                </TouchableOpacity>
                <View className="mt-14">
                    <Text className="text-3xl font-outfitBold text-center">Withdraw</Text>
                    <View>
                        <Text className="text-xl font-outfitRegular text-center text-gray-500 mt-12">Your Balance</Text>
                        <Text className="text-3xl font-outfitBold text-center">{`Rp ${formatNumberWithCommas(userBalance)}`}</Text>
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
                    <View className="flex flex-col items-center justify-center mt-10 gap-5">
                        <TouchableOpacity
                            onPress={handleSubmit(onSubmit)}
                            className="flex flex-row items-center justify-center bg-[#00F279] py-5 px-8 rounded-full w-full">
                            <Text className="text-2xl font-outfitBold text-center text-white">Send</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex flex-row items-center justify-center bg-red-500 py-5 px-8  rounded-full w-full">
                            <Text className="text-2xl font-outfitBold text-center text-white">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <BottomPadding />
        </ScrollView>
    )
}
