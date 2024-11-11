import {ActivityIndicator} from 'react-native'
import React from 'react'
import {WebView} from 'react-native-webview'
import {SafeAreaView} from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { ROUTES } from '@/constant/ROUTES'

const MidtransSnapScreen = ({url}) => {

    const regex = /example/;

    const parseQueryString = (queryString) => {
        const params = {};
        const pairs = queryString.split('&');
        for (let i = 0; i < pairs.length; i++) {
            const [key, value] = pairs[i].split('=');
            params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        }
        return params;
    };


    const handleNavigationStateChange = (navState) => {
        const queryString = navState.url.split('?')[1];
        console.log("queryString", queryString)
      
        if (queryString) {
            const params = parseQueryString(queryString);
            console.log("params", params)
            const statusCode = params.status_code;
            const transactionStatus = params.transaction_status;

            // Redirect jika status_code adalah '200' dan transaction_status adalah 'settlement'
            if (statusCode === '200' && transactionStatus === 'settlement') {
                router.replace(ROUTES.DASHBOARD.TRANSACTION.WITHDRAW.SPLASH_AFTER);
            } else {
                // Jika status_code bukan '200' atau transaction_status bukan 'settlement', redirect ke router lain
                router.replace(ROUTES.DASHBOARD.TRANSACTION.INDEX); // Ganti dengan route yang sesuai
            }
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