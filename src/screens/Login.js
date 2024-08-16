import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import { Button, hideLoader, showLoader } from '../components';
import { API, COLORS, FONTS } from '../constants';
import { httpRequest } from '../api/http';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { WhatsAppSvg } from '../assets/icons/svg';

export const Login = ({ navigation }) => {

    const [mobile, setMobile] = useState(0);
    const phoneInput = useRef(0);

    const callAPI = async () => {

        showLoader();

        const params = {
            mobile: mobile,
            type: 'user',
            country_code: phoneInput.current?.getCallingCode()
        };

        try {
            await httpRequest({ method: "POST", url: API.LOGIN, params });
            hideLoader();
            navigation.replace('Otp', params);
        } catch (error) {
            hideLoader();
            console.log("object",error)
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Sign in to Continue</Text>
            <Text style={styles.subTitle}>
                We will send you One Time Password (OTP) on this WhatsApp Mobile Number {<WhatsAppSvg size={responsiveWidth(4)} />}
            </Text>
            <PhoneInput
                value={mobile}
                onChangeText={(text) => setMobile(text)}
                placeholder='WhatsApp Number'
                ref={phoneInput}
                containerStyle={styles.phoneContainer}
                textContainerStyle={styles.textInput}
                defaultCode="IN"
                layout='second'
                codeTextStyle={{color:COLORS.DESCRIPTION}}
                withDarkTheme={true}
                countryPickerButtonStyle={{width: 'auto', paddingHorizontal: 10, borderRightWidth: 1, borderEndColor: COLORS.PRIMARY_LIGHTER }}
                textInputProps={{cursorColor:COLORS.SECONDARY, placeholderTextColor: COLORS.DESCRIPTION, fontFamily: FONTS.SEMI_BOLD }}
                textInputStyle={{color: COLORS.BLACK }}
            />

            <Button style={{ marginTop: responsiveHeight(5) }} onPress={callAPI} name="Login" />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: responsiveWidth(3.8),
        backgroundColor: COLORS.PRIMARY,
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

    phoneContainer: {
        backgroundColor:COLORS.PRIMARY_LIGHT,
        borderColor: COLORS.PRIMARY_LIGHTER,
        borderWidth: responsiveWidth(0.3),
        alignSelf: 'center',
        marginTop: responsiveHeight(5),
        height: 50,
        width: '100%'
    },
    textInput: {
        fontFamily:FONTS.SEMI_BOLD,
        color: COLORS.DESCRIPTION,
        backgroundColor: 'transparent',
        paddingVertical: 0,
    },
});