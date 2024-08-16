import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, LOCAL_DB, LOTTIE } from '../constants';
import AnimatedLottieView from 'lottie-react-native';
import { CopySvg } from '../assets/icons/svg';
import { Button, successToast } from '../components';
import { CommonStyles } from '../styles/styles';
import { ShareApp, getLocalData } from '../utils';
import Clipboard from '@react-native-clipboard/clipboard';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import DeviceInfo from 'react-native-device-info';

export const KycStatus = ({ navigation }) => {

    const [authUser, setAuthUser] = useState({});
    const [btnText, setBtnText] = useState('');
    const [heading, setHeading] = useState('');
    const [caption, setCaption] = useState('');
    const [emoji, setEmoji] = useState('');
    const [color, setColor] = useState('');
    const [screen, setScreen] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const authUser = await getLocalData(LOCAL_DB.USER);
            // authUser.kyc_status = null
            switch (authUser?.kyc_status) {
                case 'SUBMITTED':
                    setBtnText('View KYC Documents');
                    setHeading('KYC Under Process');
                    setCaption('Your KYC documents have been submitted and are currently under review.');
                    setEmoji('⌛️');
                    setColor(COLORS.YELLOW)
                    setScreen('Verification')
                    break;
                case 'REJECTED':
                    setBtnText('Resubmit KYC Documents');
                    setHeading('KYC Rejected');
                    setCaption('Unfortunately, your KYC documents were rejected. Please review and resubmit.');
                    setEmoji('❌');
                    setColor(COLORS.RED)
                    setScreen('Verification')
                    break;
                case 'APPROVED':
                    setBtnText('Explore Services');
                    setHeading('KYC Approved');
                    setCaption('Congratulations! Your KYC documents have been approved. You can now enjoy full access to our services.');
                    setEmoji('✅');
                    setColor(COLORS.SECONDARY)
                    setScreen('Dashboard')
                    break;
                default:
                    setBtnText('Submit KYC Details');
                    setHeading('KYC Pending');
                    setCaption('Complete the KYC process to enjoy full access to our services.');
                    setEmoji('🔒');
                    setColor(COLORS.WHITE)
                    setScreen('Verification')
                    break;
            }
            setAuthUser(authUser);
        };
        fetchData();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.PRIMARY, paddingHorizontal: responsiveWidth(3.8) }}>

                <Text style={{ fontFamily: FONTS.BOLD, color: COLORS.SECONDARY, textAlign: 'center', fontSize: responsiveFontSize(8) }}>
                    {emoji}
                </Text>
                <Text style={{ fontFamily: FONTS.BOLD, color, textAlign: 'center', fontSize: responsiveFontSize(4) }}>
                    {heading}
                </Text>
                <View style={{ alignSelf: 'center', marginTop: 10, width: 50, height: 5, borderRadius: 10, backgroundColor: COLORS.WHITE }} />
                <Text style={{ fontFamily: FONTS.REGULAR, color: COLORS.DESCRIPTION, marginTop: responsiveHeight(5), textAlign: 'center', fontSize: responsiveFontSize(2.5) }}>
                    {caption}
                </Text>

            {btnText &&
                <Button style={{ marginTop: responsiveHeight(10) }} onPress={()=> navigation.navigate(screen)} name={btnText} />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: COLORS.WHITE,
        textAlign: 'center',
        fontFamily: FONTS.BOLD,
        fontSize: 30
    },
    text1: {
        color: COLORS.DESCRIPTION,
        fontFamily: FONTS.MEDIUM,
        fontSize: responsiveFontSize(1.8)
    },
    circle: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 0.4,
        borderColor: COLORS.DESCRIPTION,
        color: COLORS.DESCRIPTION,
        fontSize: responsiveFontSize(1.8)
    }
});