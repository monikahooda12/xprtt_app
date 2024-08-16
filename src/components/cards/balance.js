import { calculateInterestPercentage, getAmount, getLocalData } from "../../utils";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { ArrowUpSvg } from "../../assets/icons/svg";
const { View, Text, StyleSheet } = require("react-native")
const { COLORS, FONTS, LOCAL_DB } = require("../../constants")

export const Balance = (refresh) => {

    const [symbol, setSymbol] = useState('')
    const [wallet, setWallet] = useState({
        investment: 0,
        interest: 0,
        balance: 0
    });
    const [percentage, setPercentage] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
            fetchWalletData();
        }, [refresh])
    )

    const fetchWalletData = async () => {
        const walletData = await getLocalData(LOCAL_DB.USER);
        if (walletData) {
            const investment = await getAmount(walletData.investment)
            const interest = await getAmount(walletData.interest)
            let balance = walletData.investment + walletData.interest;
            balance = await getAmount(balance)

            setWallet({
                investment: investment.amount,
                interest: interest.amount,
                balance: balance.amount
            });
            setSymbol(investment.symbol)

            const percentage = calculateInterestPercentage(investment.amount, interest.amount)
            setPercentage(percentage)
        }
    }

    return (
        <View>

            <View style={{ ...styles.container, marginTop:responsiveHeight(2), marginBottom: responsiveHeight(5) }}>
                <Text style={{ ...styles.amount, fontSize: responsiveFontSize(5) }}> {symbol + wallet.balance} </Text>
                <Text style={styles.label}> Account Balance </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: responsiveWidth(3), marginBottom: responsiveHeight(2) }}>

                <View style={styles.container}>
                    <Text style={styles.amount}> {symbol + wallet.investment} </Text>
                    <Text style={styles.label}> Invested </Text>
                </View>

                <View style={styles.verticalLine} />

                <View style={styles.container}>
                    <Text style={styles.amount}> {symbol + wallet.interest} </Text>
                    <Text style={styles.label}> Profit </Text>
                </View>

                <View style={styles.verticalLine} />

                <View style={styles.container}>
                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                        <ArrowUpSvg size={responsiveWidth(4)} color={COLORS.SECONDARY} />
                        <Text>&nbsp;&nbsp;</Text>
                        <Text style={styles.amount}> {percentage}% </Text>
                    </View>
                    <Text style={styles.label}> Return </Text>
                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    label: {
        marginTop: responsiveHeight(0.5),
        color: COLORS.DESCRIPTION,
        fontFamily: FONTS.MEDIUM,
        fontSize: responsiveFontSize(1.8)
    },
    amount: {
        color: COLORS.SECONDARY,
        fontFamily: FONTS.BOLD,
        fontSize: responsiveFontSize(2),
    },
    verticalLine: {
        alignSelf: 'center',
        height: responsiveHeight(5),
        borderLeftColor: COLORS.DESCRIPTION,
        borderLeftWidth: 0.5,
    }
})