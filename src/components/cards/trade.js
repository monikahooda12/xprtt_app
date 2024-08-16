import React, { useState } from "react";
import { Text, View, Animated } from "react-native";
import { COLORS, FONTS } from "../../constants";
import { ArrowDownSvg } from "../../assets/icons/svg";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { CommonStyles } from "../../styles/styles";
import { getAmount } from "../../utils";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect } from "react";

export const Trade = (props) => {
    const { data, marketStatus } = props;
    const { currency, price, interest, interestAmt, allocatedAmt } = data;
    const [allocated, setAllocated] = useState(0);
    const [change, setChange] = useState(0);
    const fadeAnim = new Animated.Value(1);

    useFocusEffect(
        React.useCallback(() => {
            const fun = async () => {
                const result = await getAmount(allocatedAmt);
                const result1 = await getAmount(interestAmt);
                setAllocated(result)
                setChange(result1)
            }
            fun()
        }, [data])
    )

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim])

    return (
        <View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.50 }}>
                    <Text style={{ color: COLORS.WHITE, fontFamily: FONTS.BOLD, fontSize: responsiveFontSize(2) }}>
                        {currency}
                    </Text>
                    <Text style={{ fontFamily: FONTS.SEMI_BOLD, fontSize: responsiveFontSize(1.8), color: COLORS.DESCRIPTION }}>
                        {price}
                    </Text>

                </View>
                <Text style={{ flex: 0.25, textAlign: 'right', fontSize: responsiveFontSize(2), color: COLORS.WHITE }}>
                    {allocated.symbol + allocated.amount}
                </Text>
                <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'flex-end', }}>

                    {marketStatus
                        ?
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <ArrowDownSvg size={10} color={interest >= 0 ? COLORS.GREEN : COLORS.RED}
                                    style={{ marginEnd: 3, transform: [{ rotate: `${interest >= 0 ? 180 : 0}deg` }] }}
                                />
                                <Text style={{ fontWeight: '600', fontSize: 12, color: interest >= 0 ? COLORS.GREEN : COLORS.RED }}>
                                    {change.symbol + change.amount}
                                </Text>
                            </View>

                            <Animated.Text
                                style={{
                                    opacity: fadeAnim,
                                    fontSize: 12,
                                    color: interest >= 0 ? COLORS.RED : COLORS.GREEN,
                                    alignSelf: 'flex-end'
                                }}
                            >
                                {interest >= 0 ? 'SELL' : 'BUY'}
                            </Animated.Text>


                        </View>
                        :
                        <Text style={{ fontWeight: '600', fontSize: 12, color: COLORS.DESCRIPTION }}>
                            ---
                        </Text>
                    }

                </View>
            </View>

            <View style={CommonStyles.horizontalLine} />
        </View>

    );

};