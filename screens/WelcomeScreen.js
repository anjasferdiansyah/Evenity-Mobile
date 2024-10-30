import { View, Text, Image } from 'react-native'
import React from 'react'
import hero from '../assets/hero.png'

const WelcomeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
        <Image source={hero} />
        <Text className="font-system text-3xl">Make Your Event Easy Withus</Text>
    </View>
  )
}

export default WelcomeScreen