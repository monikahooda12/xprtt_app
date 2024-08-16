import { PermissionsAndroid, Platform } from "react-native";

export const androidCameraPermission = () => new Promise(async (resolve, reject) => {

    try {
        if (Platform.OS === 'android') {
            const permission = [PermissionsAndroid.PERMISSIONS.CAMERA];

            if (Platform.Version > 22 && Platform.Version < 33) {
                permission.push(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                );
            } else if (Platform.Version >= 33) {
                permission.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
            }

            const granted = await PermissionsAndroid.requestMultiple(permission);

            if (
                granted['android.permission.CAMERA'] !== 'granted' ||
                (Platform.Version > 22 && Platform.Version < 33 &&
                    (granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== 'granted' ||
                        granted['android.permission.READ_EXTERNAL_STORAGE'] !== 'granted')) ||
                (Platform.Version >= 33 &&
                    granted['android.permission.READ_MEDIA_IMAGES'] !== 'granted')
            ) {
                return resolve(false);
            }
            return resolve(true);
            
        }
    } catch (error) {
        return resolve(false);
        
    }
});

export const androidNotificationPermission = () => new Promise(async (resolve, reject) => {

    try {
        //Need to test above android version 32. throwing a error of Notification permission null
        if (Platform.OS === 'android' && Platform.Version > 32) {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
            if (granted['android.permission.POST_NOTIFICATIONS'] !== 'granted') {
                return resolve(false);
            }
            return resolve(true);
        }
    } catch (error) {
        return resolve(false);
    }

});