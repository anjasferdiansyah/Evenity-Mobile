import { View, Text } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import { ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const MidtransSnapScreen = ({url}) => {


  return (
    <SafeAreaView className="flex-1">
     <WebView
        source={{
            uri : url
        }}
        startInLoadingState={true}
        renderLoading={() => (
            <ActivityIndicator   size="large"
            color="#0000ff"
            style={{ flex: 1, justifyContent: 'center' }}/>
        )}
     />
     </SafeAreaView>
  )
}

export default MidtransSnapScreen