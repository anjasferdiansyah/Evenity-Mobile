import {Stack} from 'expo-router';

export default function TransactionLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index"/>
            <Stack.Screen
                name="detail"
                // options={{
                //     presentation: 'modal',
                // }}
            />
            <Stack.Screen
                name="withdraw/history"
                options={{
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="withdraw/index"
                options={{
                    presentation: 'modal',
                }}
            />
        </Stack>
    );
}
