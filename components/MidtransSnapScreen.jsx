import { View, Text } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import { ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const MidtransSnapScreen = () => {
  return (
    <SafeAreaView className="flex-1">
     <WebView
        source={{
            uri : "https://app.sandbox.midtrans.com/snap/v4/redirection/3e20bb6d-2acb-4bc3-923a-f7e3ca215075"
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