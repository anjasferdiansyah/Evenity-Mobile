import {Image, ScrollView, Text, TouchableOpacity, View, Dimensions} from "react-native";
import React, {useEffect} from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "@/redux/slices/authSlice";
import {AntDesign, Entypo, FontAwesome, Fontisto, MaterialIcons} from "@expo/vector-icons";
import {router} from "expo-router";
import {fetchUserProfile} from "@/redux/slices/profileSlice";
import {SafeAreaView} from "react-native-safe-area-context";
import BottomPadding from "@/components/misc/BottomPadding";
import {ROUTES} from "@/constant/ROUTES";
import {ROLE} from "@/constant/USER";
import Animated, {
    useAnimatedStyle, 
    useSharedValue, 
    withSpring,
    FadeInDown,
    interpolate
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

export default function ProfileScreen() {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const {userInfo} = useSelector((state) => state.profile)

    // Animasi scaling
    const scale = useSharedValue(1);

    const animatedProfileStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: withSpring(scale.value) }
            ],
            opacity: interpolate(scale.value, [0.8, 1], [0.8, 1])
        };
    });

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    const userDetail = userInfo?.detail;

    const ProfileSection = ({icon, title, value}) => (
        <Animated.View 
            entering={FadeInDown}
            className="flex-row items-center py-4 border-b border-gray-200/30"
        >
            <View className="w-12 items-center justify-center mr-4">
                {icon}
            </View>
            <View>
                <Text className="text-sm text-gray-500 font-outfitRegular">
                    {title}
                </Text>
                <Text className="text-lg font-outfitSemiBold text-gray-800">
                    {value}
                    
                </Text>
            </View>
        </Animated.View>
    );

    const ProfileActionButton = ({icon, title, onPress, textColor = "text-white"}) => (
        <TouchableOpacity 
            onPress={onPress}
            className="flex-row items-center py-4 border-b border-gray-200/30"
        >
            <View className="w-12 items-center justify-center mr-4">
                {icon}
            </View>
            <Text className={`text-lg font-outfitSemiBold text-gray-800`}>
                {title}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-[#F5F5F5]">
            {/* Background Overlay */}
            <View 
                className="absolute top-0 left-0 right-0 h-[35%] bg-[#00AA55]"
                style={{
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                }}
            />

            <SafeAreaView className="flex-1">
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 50}}
                >
                    {/* Profile Header */}
                    <Animated.View 
                        style={animatedProfileStyle}
                        className="items-center mt-8 mb-6 px-6"
                    >
                        <TouchableOpacity 
                            onPressIn={() => scale.value = 0.9}
                            onPressOut={() => scale.value = 1}
                        >
                            <View className="w-36 h-36 rounded-full border-4 border-white shadow-2xl">
                                <Image
                                    className="w-full h-full rounded-full"
                                    source={{
                                        uri: "https://i.pravatar.cc/300",
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                        <Text className="text-3xl font-outfitBold text-white mt-4">
                            {userDetail?.fullName || userDetail?.name}
                        </Text>
                        <Text className="text-base font-outfitRegular text-white/80 capitalize">
                            {user?.role === ROLE.VENDOR ? "Vendor" : "Customer"}
                        </Text>
                    </Animated.View>

                    {/* Profile Details */}
                    <View className="px-6">
                        <Animated.View 
                            entering={FadeInDown.delay(200)}
                            className="bg-white rounded-3xl shadow-md p-6"
                        >
                            <ProfileSection 
                                icon={<Entypo name="location" size={24} color="#00AA55"/>}
                                title="Location"
                                value={`${userDetail?.district}, ${userDetail?.city}, ${userDetail?.province}`}
                            />
                            <ProfileSection 
                                icon={<MaterialIcons name="contact-phone" size={24} color="#00AA55"/>}
                                title="Phone Number"
                                value={userDetail?.phoneNumber}
                            />
                            <ProfileSection 
                                icon={<MaterialCommunityIcons name="email" size={24} color="#00AA55"/>}
                                title="Email"
                                value={userDetail?.email}
                            />
                            {user?.role === ROLE.VENDOR && (
                                <ProfileSection 
                                    icon={<Fontisto name="person" size={24} color="#00AA55"/>}
                                    title="Owner"
                                    value={userDetail?.owner}
                                />
                            )}
                            <ProfileSection 
                                icon={<Entypo name="address" size={24} color="#00AA55"/>}
                                title="Address"
                                value={userDetail?.address}
                            />
                        </Animated.View>
                    </View>

                    {/* Profile Actions */}
                    <View className="px-6 mt-6 mb-20">
                        <Animated.View 
                            entering={FadeInDown.delay(400)}
                            className="bg-white rounded-3xl shadow-md p-6"
                        >
                            <ProfileActionButton 
                                icon={<FontAwesome name="gear" size={24} color="#00AA55"/>}
                                title="Edit Profile"
                                onPress={() => router.push(ROUTES.DASHBOARD.PROFILE.EDIT)}
                            />
                            <ProfileActionButton 
                                icon={<MaterialCommunityIcons name="form-textbox-password" size={24} color="#00AA55"/>}
                                title="Change Password"
                                onPress={() => router.push(ROUTES.DASHBOARD.PROFILE.CHANGE_PASSWORD)}
                            />
                            <ProfileActionButton 
                                icon={<AntDesign name="logout" size={24} color="red"/>}
                                title="Logout"
                                onPress={() => dispatch(logout())}
                                textColor="text-red-500"
                            />
                        </Animated.View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}