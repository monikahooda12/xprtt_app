import React, { } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { Button } from '../components';
import { COLORS, FONTS, LOTTIE } from '../constants';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const ThankYou = ({ route, navigation }) => {

    const { response } = route.params;

    return (
        <View style={styles.container}>

            <View style={{ flex: 0.4, alignSelf: 'center', width: '70%' }}>
                <AnimatedLottieView
                    source={LOTTIE.THANKS}
                    autoPlay
                    loop
                    speed={0.7}
                />
            </View>
            <View style={{ flex: 0.3, justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Text style={{ color: COLORS.SECONDARY, fontSize: responsiveFontSize(5), fontFamily: FONTS.BOLD }}>
                    ₹{response.data.amount}
                </Text>
                <Text style={{ ...styles.text }}> Request Received! </Text>
                <Text style={{ ...styles.description }}> {response.message} </Text>

            </View>
            <View style={{ flex: 0.3, justifyContent: 'center' }}>
                <Button onPress={() => navigation.replace('Transactions')} name="View Transactions" />
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.replace('DashboardNavigator')}>
                    <Text style={{ color: COLORS.SECONDARY, textAlign: 'center', fontFamily: FONTS.BOLD, marginTop: responsiveHeight(3) }}>
                        Back to Dasboard
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.PRIMARY,
        paddingHorizontal: responsiveWidth(3.8)
    },
    text: {
        marginTop: responsiveHeight(1),
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: responsiveFontSize(2),
        color: COLORS.WHITE
    },
    description: {
        fontFamily: FONTS.MEDIUM,
        fontSize: responsiveFontSize(1.8),
        color: COLORS.DESCRIPTION,
        textAlign: 'center'
    },
});