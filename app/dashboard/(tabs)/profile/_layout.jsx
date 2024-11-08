import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
    return (
        <Stack initialRouteName='index' screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="index"
            />
            <Stack.Screen
                name="edit"
                options={{
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="changePassword"
                options={{
                    presentation: 'modal',
                }}
            />
        </Stack>
    )
}