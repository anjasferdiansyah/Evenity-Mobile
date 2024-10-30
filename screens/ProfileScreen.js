import { View, Text, Image } from 'react-native'
import React from 'react'
import MaterialComunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ProfileScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="w-full h-[70%] px-10 justify-center">
  
        <Image source={require('../assets/hero.png')} className="w-20 h-20 object-cover" />
        <Text className="text-6xl font-bold">Hi, <Text className="text-[#00AA55]">Joko!</Text></Text>
        <Text>Wed, 30 October 2024</Text>
     

        <View className="flex flex-col gap-4 flex-wrap items-center justify-center self-center my-20">
          <View className="flex flex-row gap-4 flex-wrap items-center justify-center">
          <View className="p-5 bg-[#78F3B5] rounded-lg">
            <MaterialComunityIcons
            name='cart' 
            size={30}/>
            <Text className="text-center text-white font-bold text-2xl text-wrap">New Product</Text>
          </View>
          <View className="p-5 bg-[#78F3B5] rounded-lg">
            <MaterialComunityIcons
            name='cart' 
            size={30}/>
            <Text className="text-center text-white font-bold text-2xl text-wrap">New Product</Text>
          </View>
          </View>
         
         <View className="flex flex-row gap-4 flex-wrap items-center justify-center">
         <View className="p-5 bg-[#78F3B5] rounded-lg">
            <MaterialComunityIcons
            name='cart' 
            size={30}/>
            <Text className="text-center text-white font-bold text-2xl text-wrap">New Product</Text>
          </View>
          <View className="p-5 bg-[#78F3B5] rounded-lg">
            <MaterialComunityIcons
            name='cart' 
            size={30}/>
            <Text className="text-center text-white font-bold text-2xl text-wrap">New Product</Text>
          </View>
         </View>
      
         
        </View>
      </View>

    </View>
  )
}

export default ProfileScreen