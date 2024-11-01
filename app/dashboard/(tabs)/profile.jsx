import {Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {useDispatch} from "react-redux";
import {logout} from "@/redux/slices/authSlice";

const ProfileScreen = () => {
    const dispatch = useDispatch()
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="w-full h-[70%] px-10">
                <View className="flex flex-row justify-between">
                    <TouchableOpacity className="w-10 h-10 items-center justify-center bg-[#00AA55] rounded-full">
                        <MaterialCommunityIcons name='arrow-left' size={20} color={'white'}/>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-10 h-10 items-center justify-center bg-red-500 rounded-full"
                                      onPress={() => dispatch(logout())}>
                        <MaterialCommunityIcons color={'white'} name='exit-to-app' size={20}/>
                    </TouchableOpacity>
                </View>
                <View className="mt-20 border-b border-gray-300 pb-20">
                    <Text className="text-5xl text-[#00AA55] font-outfitBold">
                        Soni Decorations
                    </Text>
                    <Text className="text-gray-500 text-xl font-outfitRegular">
                        Art & Decoration
                    </Text>
                </View>
                <View className="mt-10">
                    <Text className="text-3xl text-gray-500 font-outfitBold">
                        Joko Sucipto
                    </Text>
                    <Text className="text-gray-500 font-outfitRegular text-xl">
                        08123123123
                    </Text>
                    <Text className="text-gray-500 font-outfitRegular text-xl">
                        Malang
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default ProfileScreen