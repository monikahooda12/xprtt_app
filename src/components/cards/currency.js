import { Text, View } from "react-native";
import { COLORS, FONTS } from "../../constants";
import { CommonStyles } from "../../styles/styles";
import { ArrowDownSvg } from "../../assets/icons/svg";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";

export const Currency = ({ data, isLast }) => {
    const { shortName, symbol, typeDisp, regularMarketPrice, regularMarketChange, regularMarketChangePercent } = data;
    return (

        <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                        <Text style={{ color: COLORS.WHITE, fontFamily: FONTS.BOLD, fontSize: responsiveFontSize(2) }}>
                            {shortName}
                        </Text>
                        <Text style={{ fontSize: 16, color: COLORS.WHITE }}>
                            {Math.abs(regularMarketPrice).toFixed(2)}
                        </Text>

                    </View>

                    <View style={{ marginTop: responsiveHeight(0.5), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                        <Text style={{ fontFamily: FONTS.SEMI_BOLD, fontSize: responsiveFontSize(1.8), color: COLORS.DESCRIPTION }}>
                            {typeDisp}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ArrowDownSvg size={10} color={regularMarketChange >= 0 ? COLORS.GREEN : COLORS.RED}
                                style={{ marginEnd: 3, transform: [{ rotate: `${regularMarketChange >= 0 ? 180 : 0}deg` }] }}
                            />
                            <Text style={{ fontWeight: '600', fontSize: 12, color: regularMarketChangePercent >= 0 ? COLORS.GREEN : COLORS.RED }}>
                                {parseFloat(regularMarketChangePercent).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                    {!isLast &&
                        <View style={{ ...CommonStyles.horizontalLine }} />
                    }

                </View>

            </View>
        </View>

    );

};