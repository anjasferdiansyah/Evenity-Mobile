import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming} from 'react-native-reanimated';
// import { useNavigation } from '@react-navigation/native';
import {ROUTES} from '@/constant/ROUTES';
import {router} from 'expo-router';

const PaymentSuccessScreen = () => {

    // Animasi rotasi lingkaran
    const rotation = useSharedValue(0);

    // Animasi opacity checkmark
    const checkOpacity = useSharedValue(0);

    // Animasi scale checkmark
    const checkScale = useSharedValue(0);

    useEffect(() => {
        // Animasi rotasi lingkaran - dipercepat
        rotation.value = withSequence(
            withTiming(360, {
                duration: 1500, // Dipercepat
                easing: Easing.linear
            })
        );

        // Tampilkan checkmark lebih cepat
        const checkmarkTimer = setTimeout(() => {
            checkOpacity.value = withTiming(1, {duration: 300}); // Lebih cepat
            checkScale.value = withTiming(1, {
                duration: 300, // Lebih cepat
                easing: Easing.bounce
            });
        }, 1000); // Lebih cepat

        // Redirect setelah animasi selesai
        const redirectTimer = setTimeout(() => {
            // CATATAN PENTING: 
            // Ganti 'NextScreen' dengan nama route yang sesuai di navigation stack Anda
            router.replace(ROUTES.DASHBOARD.TRANSACTION.INDEX);
        }, 2500); // Dipercepat

        return () => {
            clearTimeout(checkmarkTimer);
            clearTimeout(redirectTimer);
        };
    }, [checkOpacity, checkScale, rotation]); // Tambahkan dependency navigation

    // Style animasi rotasi lingkaran
    const animatedCircleStyle = useAnimatedStyle(() => {
        return {
            transform: [{rotate: `${rotation.value}deg`}],
            borderTopColor: 'transparent',
            borderRightColor: '#00AA55',
            borderBottomColor: '#00AA55',
            borderLeftColor: '#00AA55',
        };
    });

    // Style animasi checkmark
    const animatedCheckStyle = useAnimatedStyle(() => {
        return {
            opacity: checkOpacity.value,
            transform: [{scale: checkScale.value}]
        };
    });

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white'
            }}
        >
            <View style={{position: 'relative', width: 200, height: 200}}>
                {/* Lingkaran animasi */}
                <Animated.View
                    style={[
                        {
                            width: 200,
                            height: 200,
                            borderWidth: 8,
                            borderRadius: 100,
                            borderColor: '#00AA55',
                            position: 'absolute'
                        },
                        animatedCircleStyle
                    ]}
                />

                {/* Checkmark */}
                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        },
                        animatedCheckStyle
                    ]}
                >
                    <Text style={{
                        fontSize: 80,
                        color: '#00AA55'
                    }}>
                        ✓
                    </Text>
                </Animated.View>
            </View>
        </View>
    );
};

export default PaymentSuccessScreen;