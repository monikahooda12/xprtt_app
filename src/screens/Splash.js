import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Linking, BackHandler, AppState, Image, Platform } from 'react-native';
import { DEVICE_TYPE, API, COLORS, LOCAL_DB, ICONS } from '../constants';
import { getLocalData, storeLocalData, unlockPhone } from '../utils';
import { httpRequest } from '../api/http';
import AnimatedLottieView from 'lottie-react-native';
import { ForceUpdate, Unlock } from '../components';
import DeviceInfo from 'react-native-device-info';
import { LogoSvg } from '../assets/icons/svg';

export const Splash = ({ navigation }) => {


    const [dialogVisible, setDialogVisible] = useState(false);
    const appState = useRef(AppState.currentState);

    useEffect(() => {

        checkBiometricsCredential();

        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                checkBiometricsCredential();
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const checkBiometricsCredential = async () => {
        const isLockScreen = await getLocalData(LOCAL_DB.LOCK_SCREEN);
        if (isLockScreen) {
            setDialogVisible(false)
            try {
                const biometricStatus = await unlockPhone();
                if (biometricStatus) {
                    loadData();
                } else {
                    openDialog();
                }
            } catch (error) {
                loadData();
                console.log(error)
            }
        } else {
            loadData();
        }
    }

    const openDialog = () => {
        setDialogVisible(true);
    }

    const closeApp = () => {
        setDialogVisible(false)
        BackHandler.exitApp();
    }

    const loadData = async () => {

        const token = await getLocalData(LOCAL_DB.TOKEN);
        if (token) {

            const { name } = await getLocalData(LOCAL_DB.USER)
            if (!name) {
                navigation.replace('Welcome')
                return
            }

            const device_id = await DeviceInfo.getUniqueId();
            const fcmToken = await getLocalData(LOCAL_DB.FCM_TOKEN)
            console.log(fcmToken)

            const params = {
                device_id: device_id,
                device_type: DEVICE_TYPE,
                push_token: fcmToken,
            };

            try {
                const response = await httpRequest({ method: "GET", url: API.GET_PROFILE });
                await storeLocalData(LOCAL_DB.USER, response.data)

                const result = await httpRequest({ method: "POST", url: API.FOREGROUND_BACKGROUND, params });
                await storeLocalData(LOCAL_DB.CONFIG, result.data)

                const maintenanceOngoing = result.data.MAINTENANCE.ONGOING.SHOW;
                const maintenanceMessage = result.data.MAINTENANCE.ONGOING.ALERT

                // const deviceVersion = DeviceInfo.getVersion()
                const deviceVersion = 2.0

                if (maintenanceOngoing) {
                    navigation.replace('Maintenance', maintenanceMessage)
                    return
                }

                if (Platform.OS == 'android') {

                    const latestVersion = result.data.APP_FORCE_UPDATE.ANDROID.LATEST_VERSION;
                    const minVersion = result.data.APP_FORCE_UPDATE.ANDROID.MIN_VERSION;

                    if (deviceVersion < latestVersion) {

                        let cancelable = false;
                        deviceVersion >= minVersion ? cancelable = true : false

                        ForceUpdate(cancelable, (buttonText) => {
                            if (buttonText == 'Update') {
                                Linking.openURL(`https://play.google.com/store/apps/details?id=${DeviceInfo.getBundleId()}`);
                            } else if (buttonText == 'No Thanks') {
                                navigation.replace('DashboardNavigator')
                            }
                        });
                        return
                    }
                }
                if (Platform.OS == 'ios') {

                    const latestVersion = result.data.APP_FORCE_UPDATE.IOS.LATEST_VERSION;
                    const minVersion = result.data.APP_FORCE_UPDATE.IOS.MIN_VERSION;

                    if (deviceVersion < latestVersion) {

                        let cancelable = false;
                        deviceVersion >= minVersion ? cancelable = true : false

                        ForceUpdate(cancelable, (buttonText) => {
                            if (buttonText == 'Update') {
                                Linking.openURL('itms-apps://apps.apple.com/us/app/jmbfx/id6471821906');
                            } else if (buttonText == 'No Thanks') {
                                navigation.replace('DashboardNavigator')
                            }
                        });
                        return
                    }
                }
                navigation.replace('DashboardNavigator')
            } catch (error) {

            }
        } else {
            navigation.replace("Onboarding");
        }
    }

    return (
        <View style={styles.container}>

            <Unlock
                visible={dialogVisible}
                onYes={() => checkBiometricsCredential()}
                onClose={closeApp}
            />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require("../assets/icons/logoxprrt.png")} />
                {/* <LogoSvg /> */}
            </View>

            <View style={{ flex: 0.2, justifyContent: 'flex-start' }}>
                <AnimatedLottieView style={{ width: '20%', alignSelf: 'center' }}
                    source={require('../assets/lottie/loader1.json')}
                    autoPlay
                    loop

                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.PRIMARY,
    },
});