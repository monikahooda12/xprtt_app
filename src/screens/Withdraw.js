import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Button, ScreenLoading, TextInput, errorToast, hideLoader, screenLoading, showLoader } from "../components";
import { API, COLORS, FONTS, LOCAL_DB } from "../constants";
import { httpRequest } from "../api/http";
import { useEffect } from "react";
import { getAmount, getLocalData } from "../utils";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import React from "react";
import { CommonStyles } from "../styles/styles";
import { TickSvg } from "../assets/icons/svg";

export const Withdraw = ({ navigation }) => {

    const [data, setData] = useState({});
    const [withdrawPercentage, setWithdrawPercentage] = useState(0);
    const [withdrawMinMonth, setWithdrawMinMonth] = useState(0);
    const [investmentINR, setInvestmentINR] = useState(0);
    const [symbol, setSymbol] = useState('')

    const [wallet, setWallet] = useState({
        investment: 0,
        interest: 0,
        commission: 0,
        balance: 0
    });

    useEffect(() => {
        screenLoading(true)
        fetchWalletData();
    }, [])

    const fetchWalletData = async () => {
        
        const walletData = await getLocalData(LOCAL_DB.USER);
        if (walletData) {
            setInvestmentINR(walletData.investment)
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
        }

        const result = await getLocalData(LOCAL_DB.CONFIG);
        if (result.INVESTMENT?.WITHDRAWAL_PERCENTAGE) {
            setWithdrawPercentage(result.INVESTMENT?.WITHDRAWAL_PERCENTAGE)
            setWithdrawMinMonth(result.INVESTMENT?.WITHDRAWAL_MIN_MONTH)
            screenLoading(false)
        }
    }

    const items = [
        { id: 1, name: `Investment: Maximum Withdrawl Amount is ₹${investmentINR} (${symbol + wallet.investment})` },
        { id: 2, name: "Profit on Investment: Monthly amount will be automatically credited to your bank account" },
        { id: 3, name: "Referral Commission: Monthly amount will be automatically credited to your bank account" },
    ];

    const handleInputChange = (key, value) => {
        setData(prevData => ({ ...prevData, [key]: value }));
    };

    const callAPI = async () => {
        switch (true) {
            case !data.amount:
                errorToast('Amount field cannot be blank!');
                return
            case !data.reason:
                errorToast('Reason field cannot be blank!');
                return
        }

        showLoader()

        const params = {
            amount: data.amount,
            currency: 'INR',
            type: 'WITHDRAWAL',
            metadata: {},
        };

        try {
            const response = await httpRequest({ method: "POST", url: API.TRANSACTIONS, params });
            hideLoader()
            navigation.replace('ThankYou', { response });
        } catch (error) {
            hideLoader()
        }
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: responsiveWidth(1.5), backgroundColor: COLORS.PRIMARY }}>
            <ScreenLoading />
            <ScrollView keyboardShouldPersistTaps='handled'>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: responsiveWidth(2), marginTop: responsiveHeight(2) }}>
                    <Text style={{ ...styles.title }}>
                        Invested Amount
                    </Text>
                    <Text style={{ ...styles.title, color: COLORS.SECONDARY, }}>
                        ₹{investmentINR} ({symbol + wallet.investment})
                    </Text>
                </View>


                <TextInput keyboardType='numeric' label='Enter Amount INR' onChangeText={text => handleInputChange('amount', text)} />
                <TextInput label='Reason' onChangeText={text => handleInputChange('reason', text)} />

                <Text style={{ ...styles.title, color: COLORS.DESCRIPTION, paddingHorizontal: responsiveWidth(2), marginBottom: responsiveHeight(2) }}>
                    If you withdraw your invested amount in less than {withdrawMinMonth || '3'} Months, {withdrawPercentage}% will be deducted
                </Text>

                <View style={{ ...CommonStyles.card, marginHorizontal: 5, marginBottom: 10, paddingHorizontal: 10 }}>

                    {items.map(item => (
                        <View key={item.id} style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
                            <TickSvg color={COLORS.SECONDARY} />
                            <Text style={{ color: COLORS.DESCRIPTION, marginStart: 10, width:'95%' }}>{item.name}</Text>
                        </View>
                    ))}
                </View>

                <Button
                    containerStyle={{ paddingHorizontal: responsiveWidth(10), marginTop: 20, marginBottom: 10 }}
                    name='Submit Request'
                    onPress={callAPI} />

            </ScrollView>
        </View>
    );

};

const styles = StyleSheet.create({

    title: {
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: responsiveFontSize(2),
        color: COLORS.WHITE,
    },
});