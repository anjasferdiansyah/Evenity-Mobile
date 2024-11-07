import React from 'react'
import {Stack} from 'expo-router'

export default function _layout() {
    return (
        <Stack initialRouteName='index' screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="index"
            />
            <Stack.Screen
                name="detailInvoice"
                options={{
                    presentation: 'modal',
                }}
            />
        </Stack>
    )
}