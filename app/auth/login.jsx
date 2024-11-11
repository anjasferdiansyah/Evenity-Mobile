import React, { useEffect, useState } from "react";
import { 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    ScrollView, 
    Dimensions 
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { validateUser } from "@/helper/validator/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, resetError } from "@/redux/slices/authSlice";
import { router } from "expo-router";
import { ROUTES } from "@/constant/ROUTES";
import Animated, { 
    FadeInDown, 
    FadeInUp, 
    FadeIn, 
    FadeOut 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { fetchUserProfile } from "@/redux/slices/profileSlice";



const { width } = Dimensions.get('window');

const LoadingSpinner = () => {
    return (
        <View className="flex items-center justify-center">
            <View 
                className="w-16 h-16 rounded-full"
                style={{
                    borderWidth: 3,
                    borderColor: 'rgba(16, 185, 129, 0.2)',
                    borderTopColor: '#4A90E2',
                    borderRightColor: '#4A90E2',
                    transform: [{ rotate: '45deg' }],
                    animation: 'spin 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite'
                }}
            />
        </View>
    );
};

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    const dispatch = useDispatch();
    const { isLoggedIn, error, status } = useSelector((state) => state.auth);
    const { userInfo } = useSelector((state) => state.profile);
    console.log("userInfo", userInfo);

    useEffect(() => {
        if (isLoggedIn) {
            router.replace(ROUTES.DASHBOARD.INDEX);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(resetError());
        }
    }, [error, dispatch]);

    const handleLogin = () => {
        const { success, data, error } = validateUser({ email, password });

        if (!success) {
            alert(error);
        } else {
            dispatch(login(data));
            dispatch(fetchUserProfile())
        }
    };

    if (status === "loading") {
        return (
            <LinearGradient 
                colors={['#F0F4F8', '#E6F1FF']} 
                className="flex-1 justify-center items-center"
            >
                <Animated.View 
                    entering={FadeIn} 
                    exiting={FadeOut}
                    className="items-center"
                >
                    <LoadingSpinner />
                    <Animated.View entering={FadeInUp.delay(200)} className="mt-4">
                        <Text className="text-lg text-gray-600 font-outfitRegular">
                            Authenticating securely...
                        </Text>
                    </Animated.View>
                </Animated.View>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient 
            colors={['#F0FFF4', '#D4F0E1']} 
            className="flex-1"
        >
            <TouchableOpacity 
                onPress={() => router.push(ROUTES.AUTH.INDEX)}
                className="mr-4 p-2 rounded-full bg-[#f3f4f6a2] absolute top-10 left-4"
            >
                <AntDesignIcons name='arrowleft' size={20} color={'#374151'}/>
            </TouchableOpacity>
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }} 
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View className="w-full h-full px-6 flex-1 justify-center">
                    <Animated.View entering={FadeInUp} className="mb-12 items-center">
                        <Text className="text-5xl font-outfitBold text-gray-800">
                            Login
                        </Text>
                        <Text className="text-gray-500 mt-2 text-center font-outfitLight">
                            Your Event, Simplified with Us
                        </Text>
                    </Animated.View>

                    <View className="bg-white/80 rounded-2xl shadow-md p-6">
                        <Animated.View entering={FadeInDown.delay(200)} className="mb-4">
                            <Text className="text-gray-600 mb-2 font-outfitRegular">Email Address</Text>
                            <View className="border border-gray-200 rounded-lg">
                                <TextInput
                                    value={email}
                                    className="py-3 px-4 text-base text-gray-700 font-outfitRegular"
                                    placeholder="Enter your email"
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(400)} className="mb-4 relative">
                            <Text className="text-gray-600 mb-2 font-outfitRegular">Password</Text>
                            <View className="border border-gray-200 rounded-lg">
                                <TextInput
                                    secureTextEntry={hidePassword}
                                    value={password}
                                    className="py-3 px-4 text-base text-gray-700 pr-12 font-outfitRegular"
                                    placeholder="Enter your password"
                                    maxLength={50}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity 
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                                    onPress={() => setHidePassword(!hidePassword)}
                                >
                                    <MaterialCommunityIcons
                                        name={hidePassword ? "eye-off" : "eye"}
                                        color="#000"
                                        size={24}   
                                    />
                                </TouchableOpacity>
                            </View>
                        </Animated.View>

                        {/* <TouchableOpacity className="self-end mb-4">
                            <Text className="text-[#10B981] font-outfitRegular">
                                Forgot Password?
                            </Text>
                        </TouchableOpacity> */}

                        <Animated.View entering={FadeInDown.delay(600)}>
                            <TouchableOpacity
                                onPress={handleLogin}
                                className="bg-[#10B981] items-center justify-center py-4 rounded-lg shadow-md"
                            >
                                <Text className="text-white text-lg font-outfitBold tracking-wider">
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>

                    <View className="flex-row justify-center mt-6">
                        <Text className="text-gray-600 font-outfitRegular">
                            Don't have an account?{" "}
                        </Text>
                        <TouchableOpacity 
                            onPress={() => router.replace(ROUTES.AUTH.REGISTER)}
                        >
                            <Text className="text-[#10B981] font-outfitBold">
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}