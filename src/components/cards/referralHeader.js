import { calculateInterestPercentage, getAmount, getLocalData } from "../../utils";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { ArrowUpSvg } from "../../assets/icons/svg";
import { CommonStyles } from "../../styles/styles";
const { View, Text, StyleSheet } = require("react-native")
const { COLORS, FONTS, LOCAL_DB } = require("../../constants")

export const ReferralHeader = (counts) => {
    const { Level_1, Level_2, Level_3 } = counts.counts;

    const [symbol, setSymbol] = useState('')
    const [wallet, setWallet] = useState({
        investment: 0,
        interest: 0,
        commission: 0,
        balance: 0
    });
    const [percentage, setPercentage] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
            const fetchWalletData = async () => {
                const walletData = await getLocalData(LOCAL_DB.USER);
                if (walletData) {
                    const investment = await getAmount(walletData.investment)
                    const interest = await getAmount(walletData.interest)
                    const commission = await getAmount(walletData.commission)
                    let balance = walletData.investment + walletData.interest;
                    balance = await getAmount(balance)

                    setWallet({
                        investment: investment.amount,
                        interest: interest.amount,
                        commission: commission.amount,
                        balance: balance.amount
                    });
                    setSymbol(investment.symbol)

                    const percentage = calculateInterestPercentage(investment.amount, interest.amount)
                    setPercentage(percentage)
                }
            }
            fetchWalletData();
        }, [])
    )

    return (
        <View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={{ ...styles.container, paddingVertical: responsiveHeight(2) }}>
                    <Text style={{ ...styles.amount, fontSize: responsiveFontSize(4) }}> {Level_1 + Level_2 + Level_3} </Text>
                    <Text style={styles.label}> Total Referrals </Text>
                </View>
                <View style={styles.verticalLine} />

                <View style={{ ...styles.container, paddingVertical: responsiveHeight(2) }}>
                    <Text style={{ ...styles.amount, fontSize: responsiveFontSize(4) }}> {symbol+wallet.commission} </Text>
                    <Text style={styles.label}> Current Commission </Text>
                </View>
            </View>

            <View style={CommonStyles.horizontalLine} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: responsiveWidth(3), marginVertical: responsiveHeight(0.5) }}>

                <View style={styles.container}>
                    <Text style={styles.amount}> {Level_1} </Text>
                    <Text style={styles.label}> Level 1 </Text>
                </View>

                <View style={styles.verticalLine} />

                <View style={styles.container}>
                    <Text style={styles.amount}> {Level_2} </Text>
                    <Text style={styles.label}> Level 2 </Text>
                </View>

                <View style={styles.verticalLine} />

                <View style={styles.container}>
                    <Text style={styles.amount}> {Level_3} </Text>
                    <Text style={styles.label}> Level 3 </Text>
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