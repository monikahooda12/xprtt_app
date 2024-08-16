import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { DEVICE_TYPE, API, COLORS, FONTS, LOCAL_DB } from '../constants';
import { Button, hideLoader, showLoader } from '../components';
import { getDeviceId, getLocalData, storeLocalData } from '../utils';
import { httpRequest } from '../api/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { EditSvg } from '../assets/icons/svg';

export const Otp = ({ route, navigation }) => {
    const [data, setData] = useState({})
    const [isResend, setResend] = useState(false);
    const [counter, setCounter] = useState(60);
    const [currentChance, setCurrentChance] = useState(0);

    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const [otp, setOtp] = useState('');

    const resendChances = [
        { chance: 1, duration: 120 },
        { chance: 2, duration: 180 },
    ];

    useEffect(() => {
        setData(route.params)
    }, [])

    useEffect(() => {
        let interval;

        if (!isResend) {
            interval = setInterval(() => {
                setCounter((prevCount) => {
                    if (prevCount > 0) {
                        return prevCount - 1;
                    } else {
                        clearInterval(interval);
                        setResend(true);
                        return 0;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(interval);

    }, [counter])

    const handleInputChange = (index, text) => {
        const otpArray = [...otp];
        otpArray[index] = text;
        setOtp(otpArray.join(''));
    };

    const handleResendOTP = async () => {

        showLoader()

        try {
            await httpRequest({ method: "POST", url: API.LOGIN, params: data, alert: true });
            hideLoader();
        } catch (error) {
            hideLoader();
        }

        setResend(false);
        if (resendChances.length > currentChance) {
            const { duration } = resendChances[currentChance];
            setCounter(duration);
            setCurrentChance(currentChance + 1)
        }
    };

    const callAPI = async () => {

        showLoader();

        const device_id = await DeviceInfo.getUniqueId();
        const fcmToken = await getLocalData(LOCAL_DB.FCM_TOKEN)

        const params = {
            mobile: data.mobile,
            otp: otp,
            device_id: device_id,
            device_type: Platform.OS == 'android' ? 2 : 3,
            push_token: fcmToken,
        };

        try {
            const response = await httpRequest({ method: "POST", url: API.VERIFY, params });
            await storeLocalData(LOCAL_DB.TOKEN, response.data.token)
            await storeLocalData(LOCAL_DB.USER, response.data.user)
            const name = response.data.user.name;

            const result = await httpRequest({ method: "POST", url: API.FOREGROUND_BACKGROUND });
            await storeLocalData(LOCAL_DB.CONFIG, result.data)
            hideLoader();
            name ? navigation.replace('DashboardNavigator') : navigation.replace('Referral');
        } catch (error) {
            hideLoader();
        }

    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>WhatsApp OTP Verification</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.subTitle}>
                    Enter the One Time Password (OTP) sent on Your WhatsApp Number - {data.mobile}
                    {'\u00A0'}
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.replace('Login')}>
                        <EditSvg color={COLORS.SECONDARY} size={16} />
                    </TouchableOpacity>
                </Text>

            </View>

            <View style={styles.otpContainer}>
                <View style={styles.otpBox}>
                    <TextInput
                        style={styles.otpText}
                        keyboardType='number-pad'
                        maxLength={1}
                        ref={firstInput}
                        onChangeText={text => {
                            handleInputChange(0, text)
                            text && secondInput.current.focus();
                        }} />
                </View>
                <View style={styles.otpBox}>
                    <TextInput
                        style={styles.otpText}
                        keyboardType='number-pad'
                        maxLength={1}
                        ref={secondInput}
                        onChangeText={text => {
                            handleInputChange(1, text)
                            text ? thirdInput.current.focus() : firstInput.current.focus();
                        }} />

                </View>
                <View style={styles.otpBox}>
                    <TextInput
                        style={styles.otpText}
                        keyboardType='number-pad'
                        maxLength={1}
                        ref={thirdInput}
                        onChangeText={text => {
                            handleInputChange(2, text)
                            text ? fourthInput.current.focus() : secondInput.current.focus();
                        }} />
                </View>
                <View style={styles.otpBox}>
                    <TextInput style={styles.otpText}
                        keyboardType='number-pad'
                        maxLength={1}
                        ref={fourthInput}
                        onChangeText={text => {
                            handleInputChange(3, text)
                            !text && thirdInput.current.focus();
                        }} />
                </View>
            </View>

            <Button style={{ marginTop: responsiveHeight(5) }} onPress={callAPI} name="Verify OTP" />

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: responsiveHeight(3) }}>

                <Text style={styles.resend}>Didn't receive OTP?
                </Text>
                <TouchableOpacity onPress={handleResendOTP} disabled={!isResend}>
                    <Text style={{ color: isResend ? COLORS.SECONDARY : COLORS.DESCRIPTION }}>
                        {' RESEND OTP'}
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={{ ...styles.resend, marginTop: 10 }}>
                {!isResend && `In ${counter} Seconds`}
            </Text>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: COLORS.PRIMARY,
        paddingHorizontal: responsiveWidth(3.8),
    },
    title: {
        marginTop: responsiveHeight(5),
        fontFamily: FONTS.BOLD,
        fontSize: responsiveFontSize(3),
        color: COLORS.SECONDARY,
    },
    subTitle: {
        marginTop: responsiveHeight(2),
        fontFamily: FONTS.REGULAR,
        fontSize: responsiveFontSize(2),
        color: COLORS.DESCRIPTION,
    },
    otpContainer: {
        marginTop: responsiveHeight(5),
        marginHorizontal: responsiveWidth(3.8),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    otpBox: {
        borderRadius: 10,
        minWidth:50,
        borderColor: COLORS.SECONDARY,
        borderWidth: 1.5,
    },
    otpText: {
        fontSize: responsiveFontSize(3),
        color: COLORS.BLACK,
        textAlign: 'center',
        paddingHorizontal: responsiveWidth(4.2),
        paddingVertical: responsiveHeight(1.2),
    },
    resend: {
        fontFamily: FONTS.MEDIUM,
        color: COLORS.BLACK,
        alignSelf: 'center',
    },

});