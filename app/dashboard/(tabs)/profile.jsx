import {Image, Text, TouchableOpacity, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "@/redux/slices/authSlice";
import axios from 'axios';

export default function ProfileScreen() {
    
    const dispatch = useDispatch()

    const [userInfo, setUserInfo] = useState({})

    const {id, user} = useSelector(state => state.auth)
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userRole = user?.role;
                const endpoint = userRole === 'ROLE_VENDOR' ? `/vendor/${id}` : `/customer/${id}`;
                const response = await axios.get(endpoint);
                setUserInfo(response.data.data);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        if (id && user) {
            fetchUserInfo();
        }
    }, [id, user]);

    console.log(userInfo)


    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="w-full h-[80%]">
                <View className="flex flex-row justify-between px-10">
                    <TouchableOpacity className="w-10 h-10 items-center justify-center bg-[#00AA55] rounded-full">
                        <MaterialCommunityIcons name='arrow-left' size={20} color={'white'}/>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-10 h-10 items-center justify-center bg-red-500 rounded-full"
                                      onPress={() => dispatch(logout())}>
                        <MaterialCommunityIcons color={'white'} name='exit-to-app' size={20}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text className="text-5xl text-center font-outfitBold">
                        Profile
                        </Text>
                        <Image
                            className="mt-3 rounded-full self-center"
                            source={{
                                uri : "https://i.pravatar.cc/300",
                                scale : 2
                            }}
                            width={100}
                            height={100}
                            />
                </View>
                <View className="mt-12 border-b border-gray-300 pb-20 self-center">
                    <Text className="text-5xl text-[#00AA55] font-outfitBold text-center">
                        {user?.role === 'ROLE_VENDOR' ? userInfo?.name : userInfo?.fullName}
                    </Text>
                    <Text className="text-gray-500 text-xl font-outfitRegular text-center capitalize">
                        {user?.role === 'ROLE_VENDOR' ? userInfo?.mainCategory : 'Customer'}
                    </Text>
                </View>
                <View className="mt-10 w-full mx-auto bg-[#78F3B5] rounded-[80px]">
                    <View className="px-14 py-12 h-full">
                        <View className="py-4 border-b border-white">
                        <Text className="text-xl text-gray-500 font-outfitBold">Location</Text>
                    <Text className="text-3xl font-outfitBold capitalize">
                        {userInfo?.district}, {userInfo?.city}, {userInfo?.province}
                    </Text>
                        </View>
                        <View className="py-4 border-b border-white">
                        <Text className="text-xl text-gray-500 font-outfitBold">Phone Number</Text>
                    <Text className="text-3xl font-outfitBold">
                        {userInfo?.phoneNumber}
                    </Text>
                        </View>
                        <View className="py-4 border-b border-white">
                        <Text className="text-xl text-gray-500 font-outfitBold">Email</Text>
                    <Text className="text-3xl font-outfitBold">
                        {userInfo?.email}
                    </Text>
                        </View>
                    </View>
                
                </View>
            </View>
        </View>
    )
}
