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

export const Invite = ({ navigation }) => {

    const [referCode, setReferCode] = useState();

    useEffect(() => {
        const getReferCode = async () => {
            const { referral_code } = await getLocalData(LOCAL_DB.USER)
            setReferCode(referral_code)
        }
        getReferCode();
    }, [])

    const copyToClipboard = (text) => {
        Clipboard.setString(text);
        successToast('Code Copied!')
    };

    const message = `Check out JMBFX App! It's awesome and they have a "Refer and Earn" offer. Sign up using my code ${referCode} and we both earn rewards!

- Download App Now: https://play.google.com/store/apps/details?id=${DeviceInfo.getBundleId()}.
- Sign up using my referral code: ${referCode}.
- Start using the app and exploring its awesome features.
    
And that's it! Let's earn together. 🚀`

    return (
        <View style={{ flex: 1, backgroundColor:COLORS.PRIMARY }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.PRIMARY }}>

                <View style={{ paddingHorizontal: responsiveWidth(3.8), }}>
                    <Text style={{ fontFamily: FONTS.BOLD, color: COLORS.SECONDARY, textAlign: 'center', fontSize: responsiveFontSize(4) }}>
                        Share & Earn
                    </Text>
                    <View style={{ alignSelf: 'center', marginTop: 10, width: 50, height: 5, borderRadius: 10, backgroundColor: COLORS.WHITE }} />
                    <Text style={{ fontFamily: FONTS.REGULAR, color: COLORS.DESCRIPTION, marginTop: responsiveHeight(1.3), textAlign: 'center', fontSize: responsiveFontSize(2.5) }}>Empower Your Network, Multiply Your Earnings!</Text>

                    <View style={{ width: '70%', alignSelf: 'center', opacity: 0.8 }}>
                        <AnimatedLottieView
                            style={{ position: 'relative' }}
                            source={LOTTIE.REFERRAL}
                            autoPlay
                            loop
                        />
                    </View>

                    <Text style={{ paddingVertical: responsiveHeight(2), color: COLORS.DESCRIPTION, textAlign: 'center', fontFamily: FONTS.MEDIUM, fontSize: responsiveFontSize(2) }}>
                        Share the code and ask your friends to enter it during signup. Earn when your friend invests.
                    </Text>

                    <View style={{marginBottom: responsiveHeight(2), flexDirection: 'row', justifyContent: 'center' }}>

                        <TouchableOpacity activeOpacity={0.7} onPress={() => copyToClipboard(referCode)}
                            style={{ backgroundColor: COLORS.PRIMARY_LIGHT, borderColor: COLORS.WHITE, justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', borderWidth: 1, borderStyle: 'dashed', paddingHorizontal: 20, paddingVertical: 12 }}>
                            <Text style={{ color: COLORS.YELLOW, fontFamily: FONTS.MEDIUM, fontSize: 18 }}>{referCode}</Text>
                            <CopySvg color={COLORS.SECONDARY} style={{ marginStart: 10, alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <Button
                            name='Refer'
                            onPress={() => ShareApp(message)}
                            style={{ marginVertical: 20, borderRadius: 2, marginStart: -2 }}
                            backgroundColor={COLORS.SECONDARY}
                            textColor={COLORS.BLACK} />
                    </View>
                </View>

                <View style={{ backgroundColor: COLORS.PRIMARY_LIGHT }}>

                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('MyReferral')}
                            activeOpacity={0.7} style={{ ...CommonStyles.card, width: '45%' }}>
                            <Text style={{ fontFamily: FONTS.REGULAR, fontSize: 13, color: COLORS.BLACK, alignSelf: 'center', textAlign: 'center' }}>Total Referrals</Text>
                            <Text style={{ ...styles.text, marginTop: 10, color: COLORS.PRIMARY }}>0</Text>
                        </TouchableOpacity>
                        <View style={{ ...CommonStyles.card, width: '45%' }}>
                            <Text style={{ fontFamily: FONTS.REGULAR, fontSize: 13, color: COLORS.BLACK, alignSelf: 'center', textAlign: 'center' }}>Commission Earned</Text>
                            <Text style={{ ...styles.text, marginTop: 10, color: COLORS.PRIMARY }}>0</Text>
                        </View>
                    </View> */}

                    <Text style={{ marginTop: responsiveHeight(3), fontFamily: FONTS.BOLD, color: COLORS.SECONDARY, textAlign: 'center', fontSize: responsiveFontSize(2.5) }}>
                        How does it works?
                    </Text>
                    <View style={{ alignSelf: 'center', marginTop: 10, width: 50, height: 5, borderRadius: 10, backgroundColor: 'white' }} />

                    <View style={{ flex: 1, paddingHorizontal: responsiveWidth(3.8), paddingVertical: responsiveHeight(3), flexDirection: 'row' }}>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.circle}>01</Text>
                            <View style={{ ...CommonStyles.verticalLine, alignSelf: 'center' }}></View>
                            <Text style={styles.circle}>02</Text>
                            <View style={{ ...CommonStyles.verticalLine, alignSelf: 'center' }}></View>
                            <Text style={styles.circle}>03</Text>
                        </View>
                        <View style={{ flex: 1, marginStart: 20 }}>
                            <Text style={styles.text1}>
                                Invite your friends using your Referral Code mentioned above
                            </Text>
                            <Text style={{ ...styles.text1, marginTop: 31 }}>
                                Your friends need to enter the referral code when registering to the App
                            </Text>
                            <Text style={{ ...styles.text1, marginTop: 31 }}>
                                You will get paid when your friends get return on their investment
                            </Text>
                        </View>
                    </View>

                </View>

            </ScrollView>

            <Button
                display='bottom'
                textColor={COLORS.BLACK}
                backgroundColor={COLORS.SECONDARY}
                name='Invite Friends'
                onPress={() => ShareApp(message)}
                style={{ borderRadius: 0 }} />
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