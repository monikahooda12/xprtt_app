import { getAmount, getLocalData } from "../../utils";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import AnimatedLottieView from "lottie-react-native";
const { View, Text, StyleSheet } = require("react-native")
const { COLORS, FONTS, LOCAL_DB, LOTTIE } = require("../../constants")

export const TradeHeader = (data) => {

    const [symbol, setSymbol] = useState('')
    const [wallet, setWallet] = useState({
        investment: 0,
        interest: 0,
        balance: 0,
        dayProfit: 0
    });
    const { dayProfit, marketStatus } = data;

    useFocusEffect(
        React.useCallback(() => {
            const fetchWalletData = async () => {
                const walletData = await getLocalData(LOCAL_DB.USER);
                if (walletData) {
                    const investment = await getAmount(walletData.investment)
                    const interest = await getAmount(walletData.interest)
                    let balance = walletData.investment + walletData.interest;
                    balance = await getAmount(balance)
                    const profit = await getAmount(dayProfit)

                    setWallet({
                        investment: investment.amount,
                        interest: (interest.amount + profit.amount).toFixed(2),
                        balance: (balance.amount + profit.amount).toFixed(2),
                        dayProfit: profit.amount
                    });
                    setSymbol(investment.symbol)
                }
            }
            fetchWalletData();
        }, [dayProfit])
    )

    return (
        <View>
            <View style={{ flexDirection: 'row' }}>

                <View style={{flex: 1, justifyContent: 'center', marginTop:40}}>
                    <AnimatedLottieView
                        source={marketStatus ? LOTTIE.AI_ANIM : LOTTIE.AI_SLEP}
                        autoPlay
                        loop
                    />
                </View>
                <View style={{ flex: 1, paddingRight: responsiveWidth(3.8), justifyContent: 'flex-start', alignItems: 'flex-start', }}>

                    <Text style={{ marginTop: responsiveHeight(5), fontFamily: FONTS.BOLD, color: COLORS.WHITE, textAlign: 'left', fontSize: responsiveFontSize(2) }}>
                        {!wallet.investment ? 'Waiting for Investment' : 
                        (marketStatus ? 'AI is live and trading' : 'Market closed. AI on rest') }
                    </Text>
                    <View style={{ alignSelf: 'flex-start', marginTop: 8, marginBottom: 10, width: 20, height: 2, borderRadius: 10, backgroundColor: COLORS.SECONDARY }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ flex: 1, ...styles.label }}>Investment</Text>
                        <Text style={{ ...styles.amount }}>{symbol + wallet.investment}</Text>
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ flex: 1, ...styles.label }}>Monthly P/L</Text>
                        <Text style={{ ...styles.amount }}>{marketStatus ? symbol + wallet.interest : '---'}</Text>
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ flex: 1, ...styles.label }}>Day P/L</Text>
                        <Text style={{ ...styles.amount }}>{marketStatus ? symbol + wallet.dayProfit: '---'}</Text>
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ flex: 1, ...styles.label }}>Balance</Text>
                        <Text style={{ ...styles.amount }}>{marketStatus ? symbol + wallet.balance: '---'}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        marginTop: responsiveHeight(0.5),
        color: COLORS.DESCRIPTION,
        fontFamily: FONTS.MEDIUM,
        fontSize: responsiveFontSize(1.8)
    },
    amount: {
        marginTop: responsiveHeight(0.5),
        color: COLORS.SECONDARY,
        fontFamily: FONTS.MEDIUM,
        fontSize: responsiveFontSize(1.8)
    },
    verticalLine: {
        alignSelf: 'center',
        height: responsiveHeight(5),
        borderLeftColor: COLORS.DESCRIPTION,
        borderLeftWidth: 0.5,
    },
    horizontalLine: {
        width: '100%',
        marginVertical: 5,
        borderBottomColor: COLORS.DESCRIPTION,
        borderWidth: 0.5,
        opacity: 0.5
    },
})