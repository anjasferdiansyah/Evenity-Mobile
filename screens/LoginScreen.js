import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import MaterialComunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const LoginScreen = ({ navigation }) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="w-full h-[70%] px-10 flex-1 justify-center">
        <Text className="text-5xl text-center my-16 font-outfitBold">
          Login
        </Text>

        <View className="flex flex-col gap-4 w-full items-center">
          <View className="flex flex-col gap-2 w-[90%]">
            <Text className="font-outfitRegular">Username</Text>
            <TextInput
              className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
              placeholder="Enter your username"
            />
          </View>
          <View className="flex flex-col gap-2 w-[90%]">
            <MaterialComunityIcons
              className="absolute right-4 top-[38px] "
              name="eye"
              color={"gray"}
              size={20}
            />
            <Text className="font-outfitRegular">Password</Text>
            <TextInput
              className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
              placeholder="Enter your password"
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
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
