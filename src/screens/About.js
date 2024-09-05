import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Menu } from '../components';
import { COLORS, FONTS, WEBSITE_PAGES } from '../constants'
import { ShareApp } from '../utils';
import { LogoSvg } from '../assets/icons/svg';
import DeviceInfo from 'react-native-device-info';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { CommonStyles } from '../styles/styles';

export const About = ({ navigation }) => {

    // const message = `Discover JMBFX – invest smartly and earn effortlessly! 📈💰
    // https://play.google.com/store/apps/details?id=${DeviceInfo.getBundleId()}`

    return (
        <View style={{flex:1, backgroundColor: COLORS.WHITE }}>

            {/* <LogoSvg width={'30%'} style={{ alignSelf: 'center' }} /> */}

            {/* <Text style={{ alignSelf: 'center', marginBottom: responsiveHeight(3), color: COLORS.WHITE, fontFamily: FONTS.BOLD }}>
                Version: {DeviceInfo.getVersion()}
            </Text> */}

            {/* <View style={CommonStyles.horizontalLine}/> */}

            <View style={{ paddingHorizontal: responsiveWidth(3.8), paddingTop: responsiveHeight(1), }}>
                {/* <Menu title="Privacy Policy" onPress={() => navigation.navigate("Webview", { url: WEBSITE_PAGES.PRIVACY_POLICY })} /> */}
                {/* <Menu title="Terms of Use" onPress={() => navigation.navigate("Webview", { url: WEBSITE_PAGES.TERMS_CONDITIONS })} /> */}

                <Menu title="Privacy Policy" onPress={() => navigation.navigate("Webview", { url: "https://dev.xprrt.com/privacy-policy/" })} />
                <Menu title="Terms of Use" onPress={() => navigation.navigate("Webview", { url: "https://dev.xprrt.com/terms-conditions/"})} />
                <Menu title="Share" onPress={()=>ShareApp(message)} />
            </View>

        </View>
    );
};