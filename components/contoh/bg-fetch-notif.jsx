import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure Notifications
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

// Background Task Name
const BACKGROUND_FETCH_TASK = 'BACKGROUND_STATUS_CHECK';

// Function to send notification
const sendStatusNotification = async (status) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Status Update 🔔",
            body: JSON.stringify(status),
            data: { status },
        },
        trigger: null, // Send immediately
    });
};

// Background Fetch Task
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    try {
        // Fetch status from API
        const response = await fetch('https://your-api-endpoint.com/status', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add any authentication headers
                // 'Authorization': `Bearer ${token}`
            }
        });

        const status = await response.json();

        // Check if status has changed
        const previousStatus = await AsyncStorage.getItem('lastStatus');

        if (previousStatus !== JSON.stringify(status)) {
            // Send notification if status is different
            await sendStatusNotification(status);

            // Store current status
            await AsyncStorage.setItem('lastStatus', JSON.stringify(status));
        }

        return BackgroundFetch.Result.NewData;
    } catch (error) {
        console.error('Background fetch error:', error);
        return BackgroundFetch.Result.Failed;
    }
});

const App = () => {
    const [expoPushToken, setExpoPushToken] = useState('');

    // Request Notification Permissions
    useEffect(() => {
        const configurePushNotifications = async () => {
            // Request permissions
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }

            // Get push token
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            setExpoPushToken(token);
        };

        configurePushNotifications();

        // Register Background Fetch
        const registerBackgroundFetch = async () => {
            try {
                await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
                    minimumInterval: 15 * 60, // 15 minutes
                    stopOnTerminate: false,
                    startOnBoot: true,
                });
            } catch (error) {
                console.log('Task Register Error:', error);
            }
        };

        registerBackgroundFetch();
    }, []);

    // Handle Received Notifications
    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            console.log('Notification Received:', notification);
        });

        const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('Notification Clicked:', response);
        });

        // Cleanup subscriptions
        return () => {
            subscription.remove();
            responseSubscription.remove();
        };
    }, []);

    return (
        // Your app components
    );
};

export default App;