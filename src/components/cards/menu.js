import { View, Text, TouchableOpacity } from "react-native";
import { ArrowSvg } from "../../assets/icons/svg";
import { COLORS, FONTS } from "../../constants";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export const Menu = (data) => {

    const { onPress, title, subTitle, icon: IconComponent, iconColor, textColor } = data;

    return (

        <View style={{ marginVertical: responsiveHeight(1.8) }}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}
                style={{ flexDirection: 'row', alignItems: 'center' }}>

                {IconComponent &&
                    <IconComponent style={{ marginEnd: responsiveWidth(3), alignSelf: 'center' }} color={iconColor ? iconColor : COLORS.SECONDARY} />
                }

                <View style={{ flex: 1, paddingEnd: responsiveWidth(1) }}>
                {/* <Text style={{ includeFontPadding: false, fontFamily: FONTS.SEMI_BOLD, fontSize: responsiveFontSize(2), color: textColor ? textColor : COLORS.WHITE }}> */}
                    <Text style={{ includeFontPadding: false, fontFamily: FONTS.SEMI_BOLD, fontSize: responsiveFontSize(2), color: textColor ? textColor : COLORS.BLACK }}>
                        {title}
                    </Text>

                    {subTitle &&
                        <Text style={{ marginTop: responsiveHeight(0.5), includeFontPadding: false, fontFamily: FONTS.MEDIUM, fontSize: responsiveFontSize(1.6), color: textColor ? textColor : COLORS.DESCRIPTION }}>
                            {subTitle}
                        </Text>
                    }
                </View>
                <ArrowSvg color={COLORS.SECONDARY} style={{ marginStart: 'auto', transform: [{ rotate: `${-90}deg` }] }} />

            </TouchableOpacity>
        </View>

    );

};