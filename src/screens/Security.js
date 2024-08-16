import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Menu, Dialog, showLoader, hideLoader } from '../components';
import { API, COLORS, LOCAL_DB } from '../constants'
import { deleteAllLocalData, deleteLocalData } from '../utils';
import { DeactivateSvg, LockSvg, LogoutSvg, LogoutSvg1 } from '../assets/icons/svg';
import { CommonStyles } from '../styles/styles';
import { httpRequest } from '../api/http';
import { responsiveWidth } from 'react-native-responsive-dimensions';

export const Security = ({ navigation }) => {

    const [dialogVisible, setDialogVisible] = useState(false);
    const [buttonText, setbuttonText] = useState();
    const [dailogMessage, setDailogMessage] = useState();
    const [key, setKey] = useState();

    const openDialog = (key, message, btnText) => {
        setKey(key);
        setDailogMessage(message);
        setbuttonText(btnText);
        setDialogVisible(true);
    }

    const logout = async () => {
        showLoader()

        const params = key==3 ? { deactivate: true } : {};

        try {
            await httpRequest({ method: "PUT", url: API.LOGOUT, params, alert: true });
            await deleteAllLocalData()
            hideLoader()
            navigation.reset({
                index: 0,
                routes: [{ name: 'Splash' }]
            })

        } catch (error) {
            hideLoader()
        }
    }

    const handleClick = () => {
        switch (key) {
            case 1:
                logout()
                break;
            case 2:
                console.log('All Device Logout');
                break;
            case 3:
                logout()
                break;

        }
        setDialogVisible(false)
    };

    return (
        <ScrollView style={{ backgroundColor: COLORS.PRIMARY }}>
            <View style={{ paddingHorizontal: responsiveWidth(3.8), marginTop: 8 }}>

                <Menu
                    onPress={() => navigation.navigate('ActivateSecurity')}
                    title="Lock Screen Security"
                    subTitle='Access the app securely by using the PIN/ Password/ Fingerprint/ Touch Id or Face unlock used on your mobile phone.'
                    icon={LockSvg}
                />
                <View style={{ ...CommonStyles.line, marginTop: 10, marginBottom: 10 }} />
                {/* <Menu
                    onPress={() => openDialog(1, "Do you really want to Logout?", "Logout")}
                    title="Logout"
                    icon={LogoutSvg}
                /> */}
                {/* <Menu
                    onPress={() => openDialog(2, "Do you really want to Logout from all devices?", "Logout")}
                    title="Logout All Devices"
                    icon={LogoutSvg1}
                /> */}

                <Menu
                    onPress={() => openDialog(3, "Do you really want to Deactivate your account?", "Deactivate")}
                    title="Deactivate Account"
                    icon={DeactivateSvg}
                    iconColor={COLORS.RED}
                    textColor={COLORS.RED}
                />

                <Dialog
                    visible={dialogVisible}
                    onYes={handleClick}
                    onClose={() => setDialogVisible(false)}
                    message={dailogMessage}
                    positiveButton={buttonText}
                />
            </View>

        </ScrollView>
    );
};