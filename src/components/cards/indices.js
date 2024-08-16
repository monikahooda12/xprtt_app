import { Image, Text, View } from "react-native";
import { COLORS, FONTS, ICONS } from "../../constants";
import { CommonStyles } from "../../styles/styles";
import { ArrowDownSvg } from "../../assets/icons/svg";

export const Indices = ({ data }) => {

    const { shortName, imgSource, regularMarketPrice, regularMarketChange, regularMarketChangePercent } = data;

    return (

        <View style={{ backgroundColor: COLORS.PRIMARY_LIGHTER, borderColor: COLORS.SECONDARY, borderWidth: 1, borderRadius: 10, alignItems: 'center', padding: 0, marginHorizontal: 5, flex: 1, justifyContent: 'space-between' }}>
            <View style={{ alignItems: 'center', padding: 20, paddingVertical: 10, }}>
                {/* <Image source={ICONS.INDIA_FLAG} style={{ width: 20, height: 20 }} /> */}
                <Text numberOfLines={1} style={{ color: COLORS.WHITE, fontFamily: FONTS.BOLD, textAlign: 'center', fontSize: 14 }}>
                    {shortName}
                </Text>
            </View>
            <View style={{
                alignItems: 'center', padding: 8, width: '100%', borderRadius: 5,
                backgroundColor: regularMarketChange >= 0 ? COLORS.GREEN_LIGHT : COLORS.RED_LIGHT
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, color: regularMarketChange >= 0 ? COLORS.GREEN : COLORS.RED }}>
                        {regularMarketPrice}
                    </Text>

                    <Text style={{ marginStart:5, fontSize: 12, color: regularMarketChangePercent >= 0 ? COLORS.GREEN : COLORS.RED }}>
                        (&nbsp;
                        <ArrowDownSvg size={10} color={regularMarketChange >= 0 ? COLORS.GREEN : COLORS.RED}
                            style={{ marginEnd: 3, transform: [{ rotate: `${regularMarketChange >= 0 ? 180 : 0}deg` }] }}
                        />
                        &nbsp;
                        {Math.abs(regularMarketChangePercent).toFixed(2)}%
                        )
                    </Text>
                </View>
            </View>

        </View>
    );

};