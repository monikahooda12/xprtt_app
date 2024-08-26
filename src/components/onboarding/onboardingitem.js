import React from "react";
import { Image, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { COLORS, FONTS } from "../../constants";
import AnimatedLottieView from "lottie-react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import constantimages from "../contantstheme/constantimages";
import { Responsive } from "../../theme/Layout";

export const OnboardingItem = ({ item }) => {

    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>

            <View style={{ flex: 1, justifyContent: 'center', width:'90%',alignItems:"center",paddingTop:Responsive.height(50)}}>
                {/* <AnimatedLottieView
                    style={{alignSelf:'center'}}
                    source={item.image}
                    autoPlay
                    loop /> */}
                    <Image source={item.image} style={{width:300,height:300}}/>
            </View>

            <View style={{ flex: 1, width, justifyContent: "center" }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: responsiveFontSize(4),
        fontFamily: FONTS.EXTRA_BOLD,
        color: COLORS.SECONDARY,
        marginHorizontal:responsiveWidth(3.8),
        
    },
    description: {
        marginTop:responsiveHeight(2),
        fontFamily: FONTS.MEDIUM,
        color: COLORS.DESCRIPTION,
        fontSize: responsiveFontSize(2),
        marginHorizontal:responsiveWidth(3.8),
    },
});