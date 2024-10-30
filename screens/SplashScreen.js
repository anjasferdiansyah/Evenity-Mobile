import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import logo from '../assets/evenity.png'
import { StackActions } from '@react-navigation/native'

const SplashScreen = ({navigation}) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.dispatch(StackActions.replace('Welcome'))
        }, 3000)
    }, [])


  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image source={logo} />
    </View>
  )
}

export default SplashScreen