import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { COLORS, FONTS, LOCAL_DB, LOTTIE } from '../constants';
import AnimatedLottieView from 'lottie-react-native';
import { getLocalData, isBiometricsAvailable, storeLocalData, unlockPhone } from '../utils';
import { CommonStyles } from "../styles/styles";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


export const ActivateSecurity = ({ navigation }) => {

    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        const checkBiometrics = async () => {
            const status = await isBiometricsAvailable();
            setIsAvailable(status);
            const isLockScreen = await getLocalData(LOCAL_DB.LOCK_SCREEN);
            setIsSwitchOn(isLockScreen)
        }
        checkBiometrics();

    }, [])


    const checkBiometricsCredential = async () => {
        try {
            const biometricStatus = await unlockPhone();
            if (biometricStatus) {
                setIsSwitchOn(!isSwitchOn)
                await storeLocalData(LOCAL_DB.LOCK_SCREEN, !isSwitchOn);
            } else {
                setIsSwitchOn(isSwitchOn)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        checkBiometricsCredential();
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.PRIMARY, paddingHorizontal: responsiveWidth(3.8) }}>

            <Text style={styles.title}>Manage Lock Screen Security</Text>
            <View style={{ ...styles.line, marginBottom: responsiveHeight(4) }} />

            <AnimatedLottieView
                style={{ position: 'relative', width: '50%', alignSelf: 'center' }}
                source={LOTTIE.SECURITY}
                autoPlay
                loop
            />

             <Text style={styles.text}>
                 {isAvailable
                     ? 'Secure your app by using your existing phone lock as an additional layer of protection.'
                     : 'Set a phone lock to add an additional layer of security to your account. Activating ' +
                     'security shield ensures no one, except you, can access your app\n\n' +

                     'Set Screen Lock and come back here to activate Security sheild'

                 }
             </Text>

             {isAvailable &&
                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: responsiveHeight(2) }}>
                     <View style={{ width: '85%' }}>
                         <Text style={{ ...styles.description}}>
                             Activate lock screen security to ensure no one, except you, can access your app
                         </Text>
                     </View>
                     <View style={{ marginStart: 'auto' }}>
                         <Switch
                            trackColor={{ false: COLORS.DESCRIPTION, true: COLORS.SECONDARY }}
                            thumbColor={COLORS.WHITE}
                            value={isSwitchOn} onValueChange={handleSwitch} />
                    </View>

                </View>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: FONTS.BOLD,
        color: COLORS.SECONDARY,
        textAlign: 'center',
        fontSize: responsiveFontSize(2)
    },
    line: {
        alignSelf: 'center',
        marginTop: responsiveHeight(1),
        width: 40,
        height: 4,
        borderRadius: 10,
        backgroundColor: COLORS.WHITE
    },
    text: {
        marginTop: responsiveHeight(2),
        color: COLORS.WHITE,
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: responsiveFontSize(2)
    },
    description: {
        marginTop: responsiveHeight(2),
        color: COLORS.DESCRIPTION,
        fontFamily: FONTS.SEMI_BOLD
    },
    circle: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 0.4,
        color: COLORS.BLACK
    }
});