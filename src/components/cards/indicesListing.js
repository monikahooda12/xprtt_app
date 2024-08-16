import { Image, Text, View } from "react-native";
import { COLORS, FONTS, ICONS } from "../../constants";
import { CommonStyles } from "../../styles/styles";

export const IndicesListing = ({ data }) => {

    const { shortName, symbol, imgSource, regularMarketPrice, regularMarketChange, regularMarketChangePercent } = data;

    return (

        <View style={{ ...CommonStyles.card, flexDirection: 'row', alignItems: 'center', padding: 0, marginVertical: 5, flex: 1, }}>

            {imgSource &&
                <Image source={imgSource} style={{ marginStart: 10, width: 20, height: 20 }} />
            }

            <View style={{ paddingVertical: 15, marginStart: 10 }}>

                <Text style={{ ...CommonStyles.title }}>
                    {shortName}
                </Text>
                <Text style={{ fontFamily: FONTS.SEMI_BOLD, fontSize: 10, color: 'gray' }}>
                    {symbol}
                </Text>
            </View>


            <View style={{
                marginStart: 'auto',
                justifyContent: 'space-evenly',
                height: '100%', width: '30%',
                alignItems: 'center', padding: 8, borderRadius: 5,
                backgroundColor: regularMarketChangePercent >= 0 ? COLORS.GREEN_LIGHT : COLORS.RED_LIGHT
            }}>
                <Text style={{ fontWeight: '600', fontSize: 16, color: 'black' }}>
                    {regularMarketPrice}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: '600', fontSize: 12, color: regularMarketChangePercent >= 0 ? COLORS.GREEN : COLORS.RED }}>
                        {regularMarketChange > 0 && '+'}
                        {
                            regularMarketChange.toFixed(2) +
                            ' (' + Math.abs(regularMarketChangePercent).toFixed(2) + '%)'
                        }
                    </Text>
                </View>
            </View>

        </View>
    );

};