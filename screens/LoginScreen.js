import {Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {validateUser} from "@/helper/validator/auth";
import {useDispatch, useSelector} from "react-redux";
import {login, resetError} from "@/redux/slices/authSlice";

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {isLoggedIn, error} = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn) {
            // dispatch(loadUser())
            // navigation.navigate('Welcome')
            alert("Login Successful")
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (error) {
            alert(error)
            dispatch(resetError())
        }
    }, [error, dispatch]);

    const handleLogin = () => {
        const {success, data, error} = validateUser({email, password})

        if (!success) {
            alert(error)
        } else {
            dispatch(login({email, password}))
        }
    }
    // const [hidePassword, setHidePassword] = useState(false);

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="w-full h-[70%] px-10 flex-1 justify-center">
                <Text className="text-5xl text-center my-16 font-outfitBold">
                    Login
                </Text>

                <View className="flex flex-col gap-4 w-full items-center">
                    <View className="flex flex-col gap-2 w-[90%]">
                        <Text className="font-outfitRegular">Email</Text>
                        <TextInput
                            value={email}
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                            placeholder="Enter your email address"
                            onChangeText={setEmail}
                        />
                    </View>
                    <View className="flex flex-col gap-2 w-[90%]">
                        <MaterialCommunityIcons
                            className="absolute right-4 top-[38px] "
                            name="eye"
                            color={"gray"}
                            size={20}
                            // onPress={() => setHidePassword(!hidePassword)}
                        />
                        <Text className="font-outfitRegular">Password</Text>
                        <TextInput
                            secureTextEntry={true}
                            autoCorrect={false}
                            value={password}
                            autoComplete="current-password"
                            autoCapitalize="none"
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                            placeholder="Enter your password"
                            maxLength={50}
                            onChangeText={setPassword}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => handleLogin()}
                    className="bg-[#00AA55] mx-auto w-[90%] mt-20 items-center justify-center px-8 py-3 rounded-full"
                >
                    <Text className="text-white text-xl font-outfitBold py-1.5">
                        Login
                    </Text>
                </TouchableOpacity>
                <Text className="text-center text-gray-500 text-xs mt-4 font-outfitRegular">
                    Don't have an account?{" "}
                    <Text
                        className="text-blue-500"
                        onPress={() => navigation.navigate("Register")}
                    >
                        Register
                    </Text>
                </Text>
            </View>
        </View>
    );
};

export default LoginScreen;
