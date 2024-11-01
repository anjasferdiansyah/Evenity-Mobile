import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen
                name="detail"
                options={{
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="history"
                options={{
                    presentation: 'modal',
                }}
            />
        </Stack>
    );
}
