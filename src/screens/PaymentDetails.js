import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, SelectList, Button, errorToast, showLoader, hideLoader, successToast } from '../components';
import { API, COLORS, FONTS, LOCAL_DB } from '../constants'
import { CommonStyles } from '../styles/styles';
import { httpRequest } from '../api/http';
import DateTimePicker from '@react-native-community/datetimepicker';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { getLocalData } from '../utils';
import Clipboard from '@react-native-clipboard/clipboard';
import { CopySvg } from '../assets/icons/svg';

export const PaymentDetails = ({ route, navigation }) => {

    const { id, finalAmount } = route.params;
    const [data, setData] = useState({ amount: finalAmount });
    const [date, setDate] = useState();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [payment, setPayment] = useState({})
    const paymentType = [
        { key: '1', value: 'IMPS' },
        { key: '2', value: 'NEFT' },
        { key: '3', value: 'RTGS' },
        { key: '4', value: 'UPI' },
        { key: '5', value: 'Crypto Transfer' },
    ];

    useEffect(() => {
        const fun = async () => {
            const result = await getLocalData(LOCAL_DB.CONFIG)
            setPayment(result.PAYMENT)
        }
        fun()
    }, [])

    const copyToClipboard = (text) => {
        Clipboard.setString(text);
        successToast('Text Copied!')
    };

    const encodedUpiId = encodeURIComponent(payment.UPI?.ID);
    const encodedRecipientName = encodeURIComponent(payment.UPI?.NAME);
    const encodedAmount = encodeURIComponent(data.amount);

    const openUPIApp = () => {
        const upiLink = 'upi://pay?pa='+payment.UPI?.ID+'&pn=Suyash%20Vashishtha&mc=0000&mode=02&purpose=00'
        // const upiLink = 'upi://pay?pa='+payment.UPI?.ID+
        // '&pn=Vishal&cu=INR&am=' + encodedAmount;
            console.log(upiLink)
        Linking.openURL(upiLink);
    };

    const onChange = (event, selectedDate) => {
        setShowDatePicker(false);
        setDate(selectedDate);
        handleInputChange('transaction_date', selectedDate)
    };

    const handleInputChange = (key, value) => {
        setData(prevData => ({ ...prevData, [key]: value }));
    };

    const callAPI = async () => {

        switch (true) {
            case !data.type:
                errorToast('Please Select Payment Type');
                return
            case !data.amount:
                errorToast('Amount field cannot be blank!');
                return
            case !data.utr:
                errorToast('UTR field cannot be blank!');
                return
            case !data.transaction_date:
                errorToast('Transaction date field cannot be blank!');
                return
        }

        showLoader()

        const params = {
            amount: data.amount,
            currency: 'INR',
            type: 'DEPOSIT',
            metadata: {
                UTR: data.utr,
                type: data.type,
                transaction_date: data.transaction_date,
                remarks: data.remarks
            },
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
        <View style={{ flex: 1, }}>

            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.PRIMARY }}>
                <View style={{ paddingHorizontal: responsiveWidth(3.8) }}>

                    <Text style={styles.title}>Make Payment</Text>
                    <View style={{ ...styles.line, marginBottom: responsiveHeight(4) }} />

                    {id == 'Bank' ? (
                        <View style={{ ...CommonStyles.card }}>
                            <Text style={styles.description}>Beneficiary Name</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.text}>{payment.BANK?.NAME}</Text>
                                <TouchableOpacity style={{ marginStart: 'auto' }} activeOpacity={0.7} onPress={() => copyToClipboard(payment.BANK?.NAME)}>
                                    <CopySvg size={16} color={COLORS.SECONDARY} style={{ marginStart: 10, alignSelf: 'center' }} />
                                </TouchableOpacity>
                            </View>

                            <Text style={{ ...styles.description, marginTop: responsiveHeight(1) }}>Bank Name</Text>
                            <Text style={styles.text}>{payment.BANK?.BRANCH}</Text>

                            <Text style={{ ...styles.description, marginTop: responsiveHeight(1) }}>Account Number</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.text}>{payment.BANK?.ACCOUNT_NUMBER}</Text>
                                <TouchableOpacity style={{ marginStart: 'auto' }} activeOpacity={0.7} onPress={() => copyToClipboard(payment.BANK?.ACCOUNT_NUMBER)}>
                                    <CopySvg size={16} color={COLORS.SECONDARY} style={{ marginStart: 10, alignSelf: 'center' }} />
                                </TouchableOpacity>
                            </View>

                            <Text style={{ ...styles.description, marginTop: responsiveHeight(1) }}>IFSC Code</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.text}>{payment.BANK?.IFSC}</Text>
                                <TouchableOpacity style={{ marginStart: 'auto' }} activeOpacity={0.7} onPress={() => copyToClipboard(payment.BANK?.IFSC)}>
                                    <CopySvg size={16} color={COLORS.SECONDARY} style={{ marginStart: 10, alignSelf: 'center' }} />
                                </TouchableOpacity>
                            </View>

                            <Text style={{ ...styles.description, marginTop: responsiveHeight(1) }}>Account Type</Text>
                            <Text style={styles.text}>{payment.BANK?.ACCOUNT_TYPE || 'Current Account'}</Text>
                        </View>
                    ) : null}

                    {id == 'UPI' ? (
                        <View>
                            <View style={{ ...CommonStyles.card }}>
                                <Text style={styles.description}>UPI Id</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.text}>{payment.UPI?.ID}</Text>
                                    <TouchableOpacity style={{ marginStart: 'auto' }} activeOpacity={0.7} onPress={() => copyToClipboard(payment.UPI?.ID)}>
                                        <CopySvg size={16} color={COLORS.SECONDARY} style={{ marginStart: 10, alignSelf: 'center' }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* <Button
                                containerStyle={{ alignItems: 'center', marginTop: responsiveHeight(2) }}
                                name='Pay'
                                onPress={openUPIApp} /> */}
                        </View>
                    ) : null}

                    {id == 'Crypto' ? (
                        <View>
                            <View style={{ ...CommonStyles.card }}>
                                <Text style={styles.description}>Crypto Address ( {payment.CRYPTO?.BLOCKCHAIN} )</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.text}>{payment.CRYPTO?.WALLET_ADDRESS}</Text>
                                    <TouchableOpacity style={{ marginStart: 'auto' }} activeOpacity={0.7} onPress={() => copyToClipboard(payment.CRYPTO?.WALLET_ADDRESS)}>
                                        <CopySvg size={16} color={COLORS.SECONDARY} style={{ marginStart: 10, alignSelf: 'center' }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ) : null}

                    <Text style={{ ...styles.text, paddingVertical: responsiveHeight(2) }}>
                        Once you make the payment to the payee details mentioned above, fill the below form
                        with the correct details to complete the deposit process.
                    </Text>

                    <View style={{ marginBottom: responsiveHeight(1), marginTop: -8, marginHorizontal: responsiveWidth(-1) }}>

                        <SelectList label='Type' list={paymentType} searchEnabled={false} getValue={text => handleInputChange('type', text)} />

                        <TextInput disabled={true} value={data.amount} keyboardType='number-pad' label='Amount Deposited' onChangeText={text => handleInputChange('amount', text)} />
                        <TextInput label='UTR/Transaction ID/Crypto Wallet Address' onChangeText={text => handleInputChange('utr', text)} />
                        <TextInput value={date ? date.toLocaleDateString() : null} label='Transaction Date' onPress={() => setShowDatePicker(true)} />
                        {showDatePicker && (
                            <DateTimePicker
                                themeVariant='dark'
                                value={date ? date : new Date()}
                                mode='date'
                                onChange={onChange}
                            />
                        )}
                        <TextInput label='Remarks' onChangeText={text => handleInputChange('remarks', text)} />
                    </View>

                </View>
            </ScrollView>
            <Button style={{ borderRadius: 0 }} name='Submit' onPress={callAPI} />

        </View>
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
    },
    text: {
        width: '90%',
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: responsiveFontSize(1.8),
        color: COLORS.WHITE
    },
    description: {
        fontFamily: FONTS.MEDIUM,
        fontSize: responsiveFontSize(1.6),
        color: COLORS.DESCRIPTION
    }
})