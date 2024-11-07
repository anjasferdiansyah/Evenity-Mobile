import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as ExpoSplash from "expo-splash-screen";
import { setupAxios } from "@/config/axiosConfig";

// import store from "@/redux/store";
import "../global.css";

export default function IndexLayout() {
    ExpoSplash.preventAutoHideAsync();
    setupAxios();

    const [fontsLoaded, error] = useFonts({
        "Outfit-Black": require("../assets/fonts/Outfit/static/Outfit-Black.ttf"),
        "Outfit-ExtraBold": require("../assets/fonts/Outfit/static/Outfit-ExtraBold.ttf"),
        "Outfit-Bold": require("../assets/fonts/Outfit/static/Outfit-Bold.ttf"),
        "Outfit-SemiBold": require("../assets/fonts/Outfit/static/Outfit-SemiBold.ttf"),
        "Outfit-Regular": require("../assets/fonts/Outfit/static/Outfit-Regular.ttf"),
        "Outfit-Light": require("../assets/fonts/Outfit/static/Outfit-Light.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
        if (fontsLoaded) ExpoSplash.hideAsync();
    }, [fontsLoaded, error]);

    return (
        <Provider store={store}>
            <Stack screenOptions={{ headerShown: false }} />
        </Provider>
    );
}
