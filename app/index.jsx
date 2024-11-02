import {Image, View} from 'react-native'
import React, {useEffect} from 'react'
import logo from '@/assets/evenity.png'
import {router} from "expo-router";
import {setupAxios} from "@/config/axiosConfig";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {loadUser} from "@/redux/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";

const SplashScreen = () => {

    const dispatch = useDispatch()
    const {isLoggedIn} = useSelector(state => state.auth)
    useEffect(() => {
        setupAxios()
        setTimeout(() => {
            if (isLoggedIn) {
                router.replace("/dashboard")
            } else {
                router.replace("/welcome")
            }
        }, 3000)
    }, [])


    useEffect(() => {
        const getToken = async () => {
            const token = await asyncStorage.getItem("token")
            if (token) {
                dispatch(loadUser())
            }
        }
        getToken()
    }, []);

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Image source={logo}/>
        </View>
    )
}

export default SplashScreen