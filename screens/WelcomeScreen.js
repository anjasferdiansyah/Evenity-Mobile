import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import hero from '../assets/hero.png'
import { StackActions } from '@react-navigation/native'

const WelcomeScreen = ({navigation}) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
        <Image className="w-100 h-100" source={hero} />
        <Text className="text-3xl font-outfitBold mb-10 w-[200px] text-center" >Make Your Event Easy With us</Text>
        <TouchableOpacity onPress={() => navigation.dispatch(StackActions.replace('Auth'))} className="bg-[#00AA55] px-8 py-2 rounded-full">
          <Text className="text-white text-xl font-outfitBold" >
            Next
          </Text>
        </TouchableOpacity>
    </View>
  )
}

export default WelcomeScreen