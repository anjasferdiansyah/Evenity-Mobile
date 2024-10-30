import { View, Text, Image } from 'react-native'
import React from 'react'


const HomeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="w-full h-[70%] px-10">
  
        <Image source={require('../assets/hero.png')} className="w-20 h-20 object-cover rounded-full absolute -top-8 right-12" />
        <Text className="text-6xl mt-20 font-bold">Hi, <Text className="text-[#00AA55]">Joko!</Text></Text>
        <Text>Wed, 30 October 2024</Text>
      </View>

    </View>
  )
}

export default HomeScreen