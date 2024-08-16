import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';
import { PaymentMethod as PaymentMethodCard, ScreenLoading, screenLoading } from '../components';
import { BankSvg, UpiSvg } from '../assets/icons/svg';
import { COLORS, FONTS, LOCAL_DB } from '../constants';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { getLocalData } from '../utils';

export const PaymentMethod = ({ route, navigation }) => {

    const { finalAmount } = route.params;
    const [payment, setPayment] = useState({})

    useEffect(() => {
        screenLoading(true)
        const fun = async () => {
            const result = await getLocalData(LOCAL_DB.CONFIG)
            setPayment(result.PAYMENT)
            screenLoading(false)
        }
        fun()
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.PRIMARY }}>
            <ScreenLoading />

            <View style={{ paddingHorizontal: responsiveWidth(3.8) }}>

                <Text style={styles.title}>Select Payment Method</Text>
                <View style={{ ...styles.line, marginBottom: responsiveHeight(4) }} />

                {payment.BANK &&
                    <PaymentMethodCard
                        onPress={() => navigation.replace('PaymentDetails', { id: 'Bank', finalAmount })}
                        title="Bank Deposit"
                        subTitle={"Modes: IMPS/NEFT/RTGS\nProcessing Time: Upto 5 hours during 9 AM to 9 PM on bank working days"}
                        icon={BankSvg}
                    />
                }
                {payment?.UPI?.ID &&
                    <PaymentMethodCard
                        onPress={() => navigation.replace('PaymentDetails', { id: 'UPI', finalAmount })}
                        title="UPI Pay"
                        subTitle={"Processing Time: Upto 1 hour during 9 AM to 9 PM"}
                        icon={UpiSvg}
                    />
                }
                {Platform.OS=='android' && payment?.CRYPTO?.WALLET_ADDRESS &&
                    <PaymentMethodCard
                        onPress={() => navigation.replace('PaymentDetails', { id: 'Crypto', finalAmount })}
                        title="Crypto Transfer"
                        subTitle={"Processing Time: Instant"}
                        icon={UpiSvg}
                    />
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: FONTS.BOLD,
        color: COLORS.SECONDARY,
        textAlign: 'center',
        fontSize: responsiveFontSize(2)
    },
    line: {
        alignSelf: 'center',
        marginTop: responsiveHeight(1),
        width: 40,
        height: 4,
        borderRadius: 10,
        backgroundColor: COLORS.WHITE
    }
})