import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MidtransSnapScreen from '@/components/MidtransSnapScreen'
import { useLocalSearchParams, useRoute } from 'expo-router'

const index = () => {

  const params = useLocalSearchParams();
   const { url } = params

  return (
  
  <MidtransSnapScreen url={url}/>

    
  )
}

export default index