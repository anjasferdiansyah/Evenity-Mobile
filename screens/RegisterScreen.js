import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import MaterialComunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const RegisterScreen = ({ navigation }) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="w-full h-[70%] px-10">
        <Text className="text-5xl font-bold text-center my-24">Register</Text>

        <View className="flex flex-col gap-4">
          <View className="flex flex-col gap-2">
            <Text>Email</Text>
            <TextInput
              className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs"
              placeholder="Enter your email.."
            />
          </View>

          <View className="flex flex-col gap-2">
            <Text>Username</Text>
            <TextInput
              className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs"
              placeholder="Enter your username.."
            />
          </View>
          <View className="flex flex-col gap-2">
            <Text>Password</Text>
            <MaterialComunityIcons
              className="absolute right-4 top-[38px] "
              name="eye"
              color={"gray"}
              size={20}
            />
            <TextInput
              className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs"
              placeholder="Enter your password.."
            />
          </View>
        </View>
        <TouchableOpacity className="bg-[#00AA55] mx-auto w-[90%] mt-20 items-center justify-center px-8 py-3 rounded-full">
          <Text className="text-white text-xl font-bold">Register</Text>
        </TouchableOpacity>
        <Text className="text-center text-gray-500 text-xs mt-4">
          Have an account?{" "}
          <Text
            className="text-blue-500"
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;
