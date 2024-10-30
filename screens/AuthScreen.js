import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import hero from '../assets/hero.png'

const AuthScreen = ({navigation}) => {
  return (
    <View className="pt-10 flex-1 items-center justify-center bg-white">
      <View className="px-10 mt-4">
        <Image source={hero} />
        <View className="flex flex-col gap-2">
        <TouchableOpacity onPress={() => navigation.replace('Login')} className="bg-[#00AA55] mx-auto w-[80%] items-center justify-center px-8 py-3 rounded-full">
          <Text className="text-white text-xl font-bold" >
            Login!
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row gap-2 items-center justify-center overflow-hidden">
          <View className="h-[1px] w-1/4 bg-gray-300"></View>
        <View>
          <Text className="text-center text-gray-500 text-xs">Don't have an account?</Text>
        </View>
        <View className="h-[1px] w-1/4 bg-gray-300"></View>
        </View>
      
        <TouchableOpacity className="bg-[#00F279] mx-auto w-[80%] items-center justify-center px-8 py-3 rounded-full">
          <Text className="text-white text-xl font-bold" onPress={() => navigation.navigate('Register')}>
            Register
          </Text>
        </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default AuthScreen