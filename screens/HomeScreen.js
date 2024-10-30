import { View, Text, Image } from "react-native";
import React from "react";
import MaterialComunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="w-full px-10 justify-center">
        <View className="flex flex-row gap-4 justify-between px-5">
          <View>
            <Text className="text-6xl font-outfitBold">
              Hi, <Text className="text-[#00AA55]">Joko!</Text>
            </Text>
            <Text className="text-gray-500 font-outfitRegular">
              Wed, 30 October 2024
            </Text>
          </View>
          <Image
            source={require("../assets/hero.png")}
            className="w-20 h-20 object-cover relative -top-24"
          />
        </View>

        <View className="flex flex-col gap-4 items-center justify-between self-center my-20 px-5">
          <View className="flex flex-row gap-4 items-center justify-between w-full">
            <View className="w-1/2 p-5 h-[190px] bg-[#78F3B5] rounded-xl flex flex-col justify-between">
              <View className="p-4 bg-white rounded-full max-w-[60px]">
                <MaterialComunityIcons name="cart" size={30} />
              </View>

              <View>
                <Text className="text-white font-outfitBold text-2xl text-wrap">
                  Make
                </Text>
                <Text className="text-white font-outfitBold text-4xl text-wrap">
                  Event
                </Text>
              </View>
            </View>
            <View className="w-1/2 p-5 h-[190px] bg-[#00F279] rounded-xl flex flex-col justify-between">
            <View className="p-4 bg-white rounded-full max-w-[60px]">
                <MaterialComunityIcons name="cart" size={30} />
              </View>

              <View>
                <Text className="text-white font-outfitBold text-2xl text-wrap">
                  See
                </Text>
                <Text className="text-white font-outfitBold text-4xl text-wrap">
                  History
                </Text>
              </View>
            </View>
          </View>
          <View className="flex flex-row gap-4 items-center justify-between w-full">
            <View className="w-1/2 p-5 h-[190px]  bg-[#00F279] rounded-xl flex flex-col justify-between">
            <View className="p-4 bg-white rounded-full max-w-[60px]">
                <MaterialComunityIcons name="cart" size={30} />
              </View>

              <View>
                <Text className="text-white font-outfitBold text-2xl text-wrap">
                  See
                </Text>
                <Text className="text-white font-outfitBold text-4xl text-wrap">
                  Order
                </Text>
              </View>
            </View>
            <View className="w-1/2 p-5 h-[190px] bg-[#78F3B5]  rounded-xl flex flex-col justify-between">
            <View className="p-4 bg-white rounded-full max-w-[60px]">
                <MaterialComunityIcons name="cart" size={30} />
              </View>

              <View>
                <Text className="text-white font-outfitBold text-2xl text-wrap">
                  See
                </Text>
                <Text className="text-white font-outfitBold text-4xl text-wrap">
                  Profile
                </Text>
              </View>
            </View>
          </View>
       
       
   
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
