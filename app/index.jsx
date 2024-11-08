import {Image, View} from 'react-native'
import React, {useEffect} from 'react'
import logo from '@/assets/evenity.png'
import {router} from "expo-router";
import {initializeAuth} from "@/redux/slices/authSlice";
import {useDispatch} from "react-redux";
import {ROUTES} from "@/constant/ROUTES";

export default function SplashScreen() {
    // setupAxios()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    useEffect(() => {
        setTimeout(() => {
            router.replace(ROUTES.WELCOME)
        }, 3000)
    }, [])


    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Image source={logo}/>
        </View>
    )
}