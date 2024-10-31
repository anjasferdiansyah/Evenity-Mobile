import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import hero from "../assets/hero.png";
import { StackActions } from "@react-navigation/native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View className="flex-1 items-center justify-center bg-white h-full">
      <Image className="w-72 h-72 object-cover" source={hero} resizeMode="contain"/>
      <Text className="text-3xl font-outfitBold mb-10 w-[250px] text-center">
        Make Your Event Easy With us
      </Text>
      <TouchableOpacity className="bg-[#00AA55] px-8 py-2 rounded-full">
        <Text
          className="text-white text-xl font-outfitBold"
          onPress={() => navigation.dispatch(StackActions.replace("Auth"))}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
