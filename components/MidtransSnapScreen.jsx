import {ActivityIndicator} from 'react-native'
import React from 'react'
import {WebView} from 'react-native-webview'
import {SafeAreaView} from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { ROUTES } from '@/constant/ROUTES'

const MidtransSnapScreen = ({url}) => {

    const regex = /example/;


    const handleNavigationStateChange = (navState) => {
        if (regex.test(navState.url)){
            router.replace(ROUTES.DASHBOARD.INDEX)
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