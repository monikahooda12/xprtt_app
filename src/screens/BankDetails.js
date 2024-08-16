import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { TextInput, Button, ScreenLoading, screenLoading, showLoader, hideLoader, errorToast, Dialog } from "../components";
import { API, COLORS, FONTS } from "../constants";
import { httpRequest } from '../api/http';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export const BankDetails = () => {

    const [data, setData] = useState({});
    const [updated, setUpdated] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [buttonText, setButtonText] = useState();
    const [buttonColor, setButtonColor] = useState();
    const [dailogMessage, setDailogMessage] = useState();

    useEffect(() => {
        screenLoading(true)
        fetchBankDetails();
    }, []);

    const fetchBankDetails = async () => {
        try {
            const response = await httpRequest({ method: "GET", url: API.BANK_DETAILS });
            setData(response.data ? response.data : false)
            setUpdated(response.data ? true : false)
            screenLoading(false)
        } catch (error) {
            screenLoading(false)
        }
    };

    const handleInputChange = (key, value) => {
        setData(prevData => ({ ...prevData, [key]: value }));
    };

    const openDialog = () => {
        if (!updated) {
            if (!data.name) return errorToast('Name is required');
            if (!data.account_number) return errorToast('Account Number is required');
            if (!data.account_number1) return errorToast('Re-Enter Account Number');
            if (data.account_number != data.account_number1) return errorToast('Account Number does not match');
            if (!data.ifsc) return errorToast('IFSC is required');
            if (!data.bank_name) return errorToast('Bank name is required');
        }

        const message = updated
            ? 'Do you really want to delete your Account Details'
            : 'Please double check the details before proceeding';
        const buttonText = updated ? 'Delete' : 'Save';
        const buttonColor = updated ? COLORS.RED : COLORS.SECONDARY

        setDailogMessage(message);
        setButtonText(buttonText);
        setButtonColor(buttonColor);
        setDialogVisible(true);
    };

    const handleClick = () => {
        updated ? deleteBank() : addBank();
        setDialogVisible(false);
    };

    const addBank = async () => {

        showLoader()

        const params = {
            name: data.name,
            account_number: data.account_number,
            ifsc: data.ifsc,
            bank_name: data.bank_name,
            upi: data.upi,
        }

        try {
            await httpRequest({ method: "POST", url: API.BANK_DETAILS, params, alert: true });
            hideLoader()
            fetchBankDetails()
        } catch (error) {
            hideLoader()
        }
    };

    const deleteBank = async () => {

        showLoader()

        try {
            await httpRequest({ method: "DELETE", url: API.BANK_DETAILS, alert: true });
            hideLoader()
            fetchBankDetails()
        } catch (error) {
            hideLoader()
        }
    };

    return (

        <View style={{ flex: 1, backgroundColor: COLORS.PRIMARY }}>
            <ScreenLoading />

            <ScrollView style={{ paddingHorizontal: responsiveWidth(2.5) }}>

                <View style={{ marginHorizontal: responsiveWidth(1.3) }}>
                    <Text style={styles.title}>
                        {updated
                            ? 'Your account details for payout'
                            : 'Update your account details for payout'
                        }
                    </Text>
                </View>

                <View style={{ marginHorizontal: responsiveWidth(1.3) }}>
                    <Text style={{ ...styles.title, marginBottom: -2 }}>Bank Account:</Text>
                </View>

                <TextInput
                    disabled={updated && true}
                    label="Account Holder Name"
                    value={data && data.name}
                    onChangeText={text => handleInputChange('name', text)} />

                <TextInput
                    disabled={updated && true}
                    secureTextEntry={!updated && true}
                    label="Account Number"
                    value={data && data.account_number}
                    onChangeText={text => handleInputChange('account_number', text)} />

                {!updated &&
                    <TextInput
                        label="Re-enter Account Number"
                        onChangeText={text => handleInputChange('account_number1', text)} />
                }

                <TextInput
                    autoCapitalize='characters'
                    disabled={updated && true}
                    label="Bank Name"
                    value={data && data.bank_name}
                    onChangeText={text => handleInputChange('bank_name', text)} />

                <TextInput
                    autoCapitalize='characters'
                    disabled={updated && true}
                    label="IFSC Code"
                    value={data && data.ifsc}
                    onChangeText={text => handleInputChange('ifsc', text)} />

                <View style={{ marginHorizontal: responsiveWidth(1.3) }}>
                    <Text style={{ ...styles.title, marginBottom: -2 }}>UPI Id:</Text>
                </View>

                <TextInput
                    disabled={updated && true}
                    label="UPI Id"
                    value={data && data.upi}
                    onChangeText={text => handleInputChange('upi', text)} />

            </ScrollView>

            <Button
                display="bottom" 
                style={{ borderRadius: 0 }}
                name={updated ? 'Delete Account Details' : 'Add Account Details'}
                backgroundColor={updated ? COLORS.RED : null}
                textColor={updated ? COLORS.WHITE : null}
                onPress={() => openDialog()} />

            <Dialog
                buttonColor={buttonColor}
                visible={dialogVisible}
                onYes={handleClick}
                onClose={() => setDialogVisible(false)}
                message={dailogMessage}
                positiveButton={buttonText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        marginVertical: responsiveHeight(2),
        fontFamily: FONTS.BOLD,
        fontSize: responsiveFontSize(2),
        color: COLORS.DESCRIPTION,
    },
});