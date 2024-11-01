import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useRouter, useRoute, router } from "expo-router";
import { ProgressBar } from "@/components/progress-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import tailwind from "twrnc";

const MakeEventLayout = ({ progress, children, nextRoute }) => {
  return (
    <View className="flex-1 justify-center bg-white">
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 40,
          right: 20,
          backgroundColor: "red",
          borderRadius: 50,
          padding: 10,
        }}
        onPress={() => router.back()}
      >
        <MaterialCommunityIcons name="close" size={24} color="white" />
      </TouchableOpacity>
      <View className="w-[90%] px-10 mb-10" style={[tailwind`mt-5`]}>
        <ProgressBar progress={progress} variant="success" />
      </View>
      <View className="px-10" style={[tailwind`mt-5 h-[50%]`]}>
        <ScrollView>{children}</ScrollView>
      </View>
      {router.name === "makeEvent-nameEvent" ? (
        <View className="w-full px-10 mt-10">
          <TouchableOpacity
            onPress={() => router.push(nextRoute)}
            className="bg-[#00AA55] mx-auto w-full mt-14 items-center justify-center py-3 rounded-full"
          >
            <Text className="text-white text-xl font-outfitBold py-1.5">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      ) : router.name === "makeEvent-transactionNote" ? (
        <View
          className="w-full px-10"
          style={[tailwind`my-3 flex flex-col gap-5`]}
        >
          <TouchableOpacity
            onPress={handleAccept}
            className="bg-[#00AA55] mx-auto mt-14 items-center justify-center py-3 rounded-full"
            style={[tailwind`w-full`]}
          >
            <Text className="text-white text-xl font-outfitBold py-1.5">
              Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("MakeEventTransactionNote")}
            className=" mx-auto items-center justify-center py-3 rounded-full"
            style={[tailwind`w-full bg-[#19ff8c]`]}
          >
            <Text className="text-white text-xl font-outfitBold py-1.5">
              Regenerate
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          className="w-full px-10 flex flex-row justify-between"
          style={[tailwind`mt-12`]}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="mx-auto w-[30%] mt-14 items-center justify-center rounded-full"
            style={[tailwind`bg-red-500 p-4`]}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.replace("/dashboard/make-event/address")}
            className="bg-[#00AA55] mx-auto w-[60%] mt-14 items-center justify-center py-3 rounded-full"
          >
            <Text className="text-white text-xl font-outfitBold py-1.5">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MakeEventLayout;
