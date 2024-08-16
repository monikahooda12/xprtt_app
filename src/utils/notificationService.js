import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native'
import { getLocalData, storeLocalData } from './common';
import { LOCAL_DB } from '../constants';

export async function RequestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    enabled ? getFcmToken() : null
}

const getFcmToken = async () => {
    let fcmToken = await getLocalData(LOCAL_DB.FCM_TOKEN)
    if (!fcmToken) {
        try {
            fcmToken = await messaging().getToken();
            fcmToken ? await storeLocalData(LOCAL_DB.FCM_TOKEN, fcmToken) : null;
            console.log(fcmToken)
        } catch (error) {
            console.log('FCM Token',error);
        }
    }
}

export const DisplayNotification = async (data) => {
    //Required permissio for IOS
    Platform.OS == 'ios' ? await notifee.requestPermission() : null

    //Create a channel (requird for Android)
    const channelId = await notifee.createChannel({
        id: '100',
        name: 'Default',
        sound: 'default',
        importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
        title: data.notification.title,
        body: data.notification.body,
        android: {
            smallIcon: 'notification_icon',
            channelId,
            importance: AndroidImportance.HIGH
        },
    });
}

export const NotificationListener = async () => {
    
    //Foreground Notification
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        DisplayNotification(remoteMessage)
    });

    //Background Notification
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(remoteMessage)
        // setTimeout(() => {
        //     NavigationService.navigate(remoteMessage.data.screen)
        // }, 1000)
    });

    //Quit State Notification
    messaging().getInitialNotification().then(remoteMessage => {
        if (remoteMessage) {
            console.log(remoteMessage)
        }
    });

    return unsubscribe;
}