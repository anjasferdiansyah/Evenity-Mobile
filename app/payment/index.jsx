import React from 'react'
import MidtransSnapScreen from '@/components/MidtransSnapScreen'
import {useLocalSearchParams} from 'expo-router'

export default function PaymentScreen() {

    const params = useLocalSearchParams();
    const {url} = params

    return (

        <MidtransSnapScreen url={url}/>


    )
}