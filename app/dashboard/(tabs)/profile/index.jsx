import {Image, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "@/redux/slices/authSlice";
import {AntDesign, Entypo, FontAwesome, Fontisto} from "@expo/vector-icons";
import {router} from "expo-router";
import {fetchUserProfile} from "@/redux/slices/profileSlice";

export default function ProfileScreen() {
    const dispatch = useDispatch();


    const {user} = useSelector((state) => state.auth);
    const {userInfo} = useSelector((state) => state.profile)

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);


    const userDetail = userInfo?.detail;

    return (
        <View className="flex-1 relative items-center justify-center bg-white">
            <View className="w-full h-[85%]">
                {/* <View className="flex flex-row justify-between px-10">
                    <TouchableOpacity className="w-10 h-10 items-center justify-center bg-[#00AA55] rounded-full">
                        <MaterialCommunityIcons name='arrow-left' size={20} color={'white'}/>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-10 h-10 items-center justify-center bg-red-500 rounded-full"
                                      onPress={() => dispatch(logout())}>
                        <MaterialCommunityIcons color={'white'} name='exit-to-app' size={20}/>
                    </TouchableOpacity>
                </View> */}
                <View>
                    <Text className="text-3xl text-center font-outfitBold">Profile</Text>
                    <View
                        className="flex flex-row items-center justify-center gap-6 bg-gray-100 w-[90%] mx-auto rounded-xl mt-4 shadow-md blur-md">
                        <Image
                            className="rounded-full self-center"
                            source={{
                                uri: "https://i.pravatar.cc/300",
                                scale: 2,
                            }}
                            width={100}
                            height={100}
                        />
                        <View className="w-1/2 mt-12 pb-10 self-center items-center justify-around">
                            <Text className="text-3xl text-[#00AA55] font-outfitBold text-center">
                                {userDetail?.fullName || userDetail?.name}
                            </Text>
                            <Text className="text-gray-500 text-xl font-outfitRegular text-center capitalize">
                                {user?.role === "ROLE_VENDOR" ? "Vendor" : "Customer"}
                            </Text>
                        </View>

                    </View>
                </View>

                <View className="mt-4 mx-auto bg-gray-100 w-[90%] rounded-xl shadow-md">
                    <View className="px-14 py-4">
                        <View className="py-4 border-b border-white flex flex-row gap-4 items-center">
                            <Entypo name="location" size={24} className="w-10 text-center" color="black"/>
                            <View>
                                <Text className="text-lg text-gray-500 font-outfitBold">
                                    Location
                                </Text>
                                <Text className="text-xl w-[90%] font-outfitBold capitalize">
                                    {userDetail?.district}, {userDetail?.city},{" "}
                                    {userDetail?.province}
                                </Text>
                            </View>
                        </View>
                        <View className="py-4 border-b border-white flex flex-row gap-4 items-center">
                            <FontAwesome name="mobile-phone" className="w-10 text-center" size={24} color="black"/>
                            <View>
                                <Text className="text-lg text-gray-500 font-outfitBold">
                                    Phone Number
                                </Text>
                                <Text className="text-xl font-outfitBold">
                                    {userDetail?.phoneNumber}
                                </Text>
                            </View>

                        </View>
                        <View className="py-4 border-b border-white flex flex-row gap-4 items-center">
                            <MaterialCommunityIcons name="email" className="w-10 text-center" size={24} color="black"/>
                            <View>
                                <Text className="text-lg text-gray-500 font-outfitBold">
                                    Email
                                </Text>
                                <Text className="text-xl font-outfitBold">
                                    {userDetail?.email}
                                </Text>
                            </View>

                        </View>
                        {user?.role === "ROLE_VENDOR" && (
                            <View className="py-4 border-b border-white flex flex-row gap-4 items-center">
                                <Fontisto name="person" size={24} className="w-10 text-center" color="black"/>
                                <View>
                                    <Text className="text-lg text-gray-500 font-outfitBold">
                                        Owner
                                    </Text>
                                    <Text className="text-xl font-outfitBold">
                                        {userDetail?.owner}
                                    </Text>
                                </View>

                            </View>
                        )}
                        <View className="py-4 border-b border-white flex flex-row gap-4 items-center">
                            <Entypo name="address" size={24} className="w-10 text-center" color="black"/>
                            <View>
                                <Text className="text-lg text-gray-500 font-outfitBold">
                                    Address
                                </Text>
                                <Text className="text-xl font-outfitBold capitalize">
                                    {userDetail?.address}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="mt-10 mx-auto bg-gray-100 w-[90%] rounded-xl shadow-md ">
                    <View className="px-14">
                        <View className="py-4 border-b border-white ">
                            <TouchableOpacity className="flex flex-row gap-4 items-center"
                                              onPress={() => dispatch(logout())}>
                                <AntDesign name="logout" size={24} color="red"/>
                                <Text className="text-xl text-red-500 font-outfitBold">
                                    Logout
                                </Text>
                            </TouchableOpacity>


                        </View>
                        <View className="py-4 border-b border-white ">
                            <TouchableOpacity className="flex flex-row gap-4 items-center"
                                              onPress={() => router.push("/dashboard/profile/edit")}>
                                <FontAwesome name="gear" size={24} color="gray"/>
                                <Text className="text-xl text-gray-500 font-outfitBold">
                                    Edit Profile
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
