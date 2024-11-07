import React from 'react'
import {Stack} from 'expo-router'

const Product = () => {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index"/>
            <Stack.Screen
                name="detail"
                options={{
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="newProduct"
            />
        </Stack>
    )
}

export default Product