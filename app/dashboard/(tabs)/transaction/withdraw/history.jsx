import {FlatList, Text, TouchableOpacity, View, SafeAreaView} from 'react-native'
import React, {useEffect} from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
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

    const renderWithdrawItem = ({item}) => {
        if (item.amount > 0) return (
            <View 
                className="bg-white rounded-2xl mb-4 p-5 shadow-md"
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2
                }}
            >
                <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-base font-semibold text-[#666]">
                        {formatDate(item.date)}
                    </Text>
                    <Text 
                        className={`
                            px-3 py-1 rounded-full text-xs 
                            ${item.status === 'Success' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }
                        `}
                    >
                        {item.status}
                    </Text>
                </View>
                <Text className="text-2xl font-bold text-[#333] mb-2">
                    {formatAmount(item.amount)}
                </Text>
                <Text className="text-base text-[#666]">
                    {item.account}
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-[#F5F7FA]">
            <View className="flex-1 px-6 pt-6">
                {/* Header */}
                <View className="flex-row items-center mb-8 mt-10">
                    <TouchableOpacity 
                        onPress={() => router.back()} 
                        className="mr-4 p-2 rounded-full bg-[#F0F0F0]"
                    >
                        <AntDesignIcons name='arrowleft' size={20} color={'#333'}/>
                    </TouchableOpacity>
                    <Text className="text-2xl font-outfitBold text-[#333]">
                        Withdraw History
                    </Text>
                </View>

                {/* History List */}
                <FlatList
                    data={withdrawHistory}
                    renderItem={renderWithdrawItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 20}}
                />
            </View>
        </SafeAreaView>
    )
}