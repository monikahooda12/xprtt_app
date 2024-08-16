import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, ICONS } from "../../constants";
import { DepositSvg } from "../../assets/icons/svg";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";

export const Option = (data) => {


    const { icon: IconComponent, size, title, onPress } = data;

    return (

        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <IconComponent size={size} color={COLORS.WHITE} />
            <Text style={{ color: COLORS.DESCRIPTION, marginTop: responsiveHeight(1.2), fontFamily: FONTS.MEDIUM, fontSize: responsiveFontSize(1.8), }}>
                {title}
            </Text>
        </TouchableOpacity>

    );

};