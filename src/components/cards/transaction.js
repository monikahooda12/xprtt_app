import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants";
import { UTCtoIST, capitalize, getAmount } from "../../utils";
import { ArrowRDownSvg, InvestSvg, PlusSvg } from "../../assets/icons/svg";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export const Transaction = ({ data }) => {

    const { type, amount, createdAt, status, exchange_rate } = data;
    let title, icon;
    const [value, setValue] = useState(0);
    const [symbol, setSymbol] = useState('');

    useEffect(() => {
        const fun = async () => {
            const value = await getAmount(amount, exchange_rate)
            setValue(value.amount)
            setSymbol(value.symbol)
        }
        fun();
    }, [])

    switch (type) {
        case 'INTEREST':
            title = 'Daily Profit added to Wallet'
            icon = <PlusSvg color={COLORS.GREEN} />;
            break
        case 'DEPOSIT':
            title = 'Money Invested'
            icon = <InvestSvg color={COLORS.GREEN} />;
            break
        case 'WITHDRAWAL':
            title = 'Money received in Bank'
            icon = <ArrowRDownSvg color={COLORS.RED} />;
            break
        case 'COMMISSION':
            title = 'Commission added to Wallet'
            icon = <PlusSvg color={COLORS.GREEN} />;
            break
    }

    const date = UTCtoIST(createdAt, "MMMM D, HH:MM");

    return (
        <View style={styles.container}>

            <View style={{ backgroundColor: COLORS.WHITE, borderRadius: 100, padding: 10 }}>
                {icon}
            </View>
            <View style={{ marginStart: responsiveWidth(3), flex: 1, justifyContent: 'space-between' }}>

                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.amountText}>{symbol + ' ' + value}</Text>
                </View>

                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={{
                        fontFamily: FONTS.BOLD,
                        fontSize: responsiveFontSize(1.5),
                        color: status == 'COMPLETED' ? COLORS.SECONDARY : COLORS.DESCRIPTION
                    }}>
                        {capitalize(status.toLowerCase())}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: responsiveHeight(1.5),
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    titleText: {
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: responsiveFontSize(2),
        color: COLORS.WHITE
    },
    amountText: {
        textAlign: 'right',
        fontSize: responsiveFontSize(1.6),
        color: COLORS.WHITE
    },
    date: {
        fontSize: responsiveFontSize(1.6),
        fontFamily: FONTS.MEDIUM,
        color: COLORS.DESCRIPTION
    }
})