import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '../constants';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { useState } from 'react';
import { useEffect } from 'react';
import constantimages from '../components/contantstheme/constantimages';

export const Maintenance = ({navigation, route }) => {
    const maintenanceMessage = route.params;

    const [tapCount, setTapCount] = useState(0);

    useEffect(() => {
        if (tapCount === 7) {
            navigation.replace('DashboardNavigator')
        }
    }, [tapCount]);

    const handleTap = () => {
        setTapCount((prevCount) => prevCount + 1);
    };
    return (

        <View style={styles.container}>
            <TouchableOpacity onPress={handleTap}>
                <View style={{width:'auto', height:30}}></View>
            </TouchableOpacity>
            <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                <AnimatedLottieView style={{ width: '80%' }}
                    source={constantimages.sliderimage}
                    autoPlay
                    loop
                />
            </View>
            <View style={{ flex: 0.3 }}>
                <Text style={styles.textStyle}> {maintenanceMessage} </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: responsiveWidth(3.8),
        flex: 1,
        backgroundColor: COLORS.PRIMARY,
    },
    textStyle: {
        textAlign: 'center',
        fontFamily: FONTS.BOLD,
        fontSize: responsiveFontSize(2.5),
        color: COLORS.DESCRIPTION,
    }
})