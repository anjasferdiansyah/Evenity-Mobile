import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect} from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import tailwind from 'twrnc'
import {router} from "expo-router";
import {useDispatch, useSelector} from 'react-redux';
import {loadWithdrawHistory} from '@/redux/slices/withdrawHistorySlice';
import moment from 'moment'


export default function WithdrawHistoryScreen() {


    const dispatch = useDispatch()
    const {withdrawHistory, status} = useSelector(state => state.withdrawHistory)

    useEffect(() => {
        dispatch(loadWithdrawHistory())
    }, [dispatch])


    const formatDate = (date) => {
        return moment(date).format('DD MMM YYYY')
    }

    const formatAmount = (amount) => {
        return `Rp ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-`;
    }


    return (
        <View className='flex-1 justify-center items-center bg-white'>
            <View className='w-full h-full pt-20 px-10'>
                <TouchableOpacity onPress={() => router.back()} className="p-2 bg-[#00F279] rounded-full self-start">
                    <AntDesignIcons name='arrowleft' size={20} color={'white'}/>
                </TouchableOpacity>
                <View className="mt-10">
                    <Text className="text-3xl font-outfitBold text-center mb-8">Withdraw History</Text>
                </View>
                <View className="h-[60%] w-full overflow-visible">
                    <FlatList
                        data={withdrawHistory}
                        renderItem={({item}) => {
                            if (item.amount > 0) return (
                                <View className="p-5 bg-[#00F279] rounded-2xl mb-4" style={tailwind`shadow-2xl`}>
                                    <Text
                                        className="text-xl font-outfitSemiBold text-white">{formatDate(item.date)}</Text>
                                    <Text
                                        className="text-3xl font-outfitBold text-white">{formatAmount(item.amount)}</Text>
                                    <Text className="text-xl font-outfitSemiBold text-white">{item.status}</Text>
                                    <Text className="text-xl font-outfitSemiBold text-white py-2">{item.account}</Text>
                                </View>
                            )
                        }}/>
                </View>
            </View>
        </View>
    )
}
