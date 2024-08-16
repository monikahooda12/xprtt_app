import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CommonStyles } from '../../styles/styles';
import { ArrowSvg } from "../../assets/icons/svg";
import { COLORS, FONTS } from "../../constants";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export const PaymentMethod = (data) => {

    const { onPress, title, subTitle, icon: IconComponent, size } = data;

    return (
        <View style={{ paddingVertical: 8 }}>

            <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ ...CommonStyles.card, backgroundColor: COLORS.PRIMARY_LIGHT, flexDirection: 'row', alignItems: 'center' }}>

                <IconComponent size={size} color={COLORS.SECONDARY} />

                <View style={{ width: '80%', marginStart: responsiveWidth(4) }}>
                    <Text style={styles.text}>{title}</Text>
                    <Text style={styles.description}>{subTitle}</Text>
                </View>
                <ArrowSvg color={COLORS.SECONDARY} style={{ marginStart: 'auto', transform: [{ rotate: `${-90}deg` }] }} />

            </TouchableOpacity>
        </View>

    );

};

const styles = StyleSheet.create({
    text: {
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: responsiveFontSize(2),
        color: COLORS.WHITE
    },
    description: {
        marginTop: responsiveHeight(1),
        fontFamily: FONTS.MEDIUM,
        fontSize: responsiveFontSize(1.8),
        color: COLORS.DESCRIPTION
    },
})