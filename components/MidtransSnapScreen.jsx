import {ActivityIndicator} from 'react-native'
import React from 'react'
import {WebView} from 'react-native-webview'
import {SafeAreaView} from 'react-native-safe-area-context'
import { router } from 'expo-router'

const MidtransSnapScreen = ({url}) => {

    const exampleUrl = 'https://example.com';


    const handleNavigationStateChange = (navState) => {
        if (navState.url.startWith(exampleUrl)) {
            router.push("/dashboard/index")
        }
    }

    return (
        <SafeAreaView className="flex-1">
            <WebView
                source={{
                    uri: url
                }}
                startInLoadingState={true}
                renderLoading={() => (
                    <ActivityIndicator size="large"
                        color="#0000ff"
                        style={{flex: 1, justifyContent: 'center'}}/>
                )}
                onNavigationStateChange={handleNavigationStateChange}
            />
        </SafeAreaView>
    )
}

export default MidtransSnapScreen