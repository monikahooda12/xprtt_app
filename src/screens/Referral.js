import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, TextInput, errorToast, hideLoader, showLoader } from '../components';
import { API, COLORS, FONTS, appName } from '../constants'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { httpRequest } from '../api/http';

export const Referral = ({ navigation }) => {

    const [code, setCode] = useState();

    const callAPI = async () => {

        if (!code) return errorToast('Referral Code is required');

        showLoader();

        const params = {
            referral_code: code,
        };

        try {
            const response = await httpRequest({ method: "POST", url: API.REFERRAL, params, alert: true });
            hideLoader();
            navigation.replace('Welcome', { isUpdate: false })
        } catch (error) {
            hideLoader();
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Have a referral code?</Text>
            <Text style={styles.subtitle}>
                If you received an invite to {appName}, enter the referral code.
            </Text>

            <TextInput autoCapitalize='characters' label='Enter Referral Code' style={styles.input} onChangeText={text => setCode(text)} />

            <Button style={{ marginTop: responsiveHeight(5) }} onPress={callAPI} name="Apply" />

            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.replace('Welcome', { isUpdate: false })}>
                <Text style={{ color: COLORS.SECONDARY, textAlign: 'center', fontFamily: FONTS.BOLD, marginTop: responsiveHeight(3) }}>
                    I don't have referral code
                </Text>
            </TouchableOpacity>
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
        color: COLORS.SECONDARY,
        fontFamily: FONTS.BOLD,
        fontSize: responsiveFontSize(3),
        marginTop: responsiveHeight(5),
    },
    subtitle: {
        color: COLORS.DESCRIPTION,
        fontFamily: FONTS.REGULAR,
        fontSize: responsiveFontSize(2),
        marginTop: responsiveHeight(2),
    },
    input: {
        marginTop: responsiveHeight(5),
    },
})