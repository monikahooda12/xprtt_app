import React, { useState } from 'react';
import { Text, View, ScrollView, Modal, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Button, Dialog, errorToast, TextInput } from '../components';
import { COLORS, FONTS, LOCAL_DB, LOTTIE } from '../constants';
import { CloseSvg } from '../assets/icons/svg';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AnimatedLottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { getAmount, getLocalData } from '../utils';

export const InvestmentPlan = ({ navigation }) => {

    const [amount, setAmount] = useState(0);
    const [minINR, setMinINR] = useState(0);
    const [minAmount, setMinAmount] = useState(0);
    const [symbol, setSymbol] = useState('')
    const [authUser, setAuthUser] = useState({})
    const [visible, setVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);

    useEffect(() => {
        fun()
    }, [])

    const fun = async () => {
        const result = await getLocalData(LOCAL_DB.CONFIG);
        const user = await getLocalData(LOCAL_DB.USER);
        setAuthUser(user)
        if (result.INVESTMENT?.MIN_INVEST) {
            setMinINR(result.INVESTMENT?.MIN_INVEST)
            const minAmount = await getAmount(result.INVESTMENT?.MIN_INVEST)
            setMinAmount(minAmount.amount)
            setSymbol(minAmount.symbol)
        }
    }

    const closeDialog = () => {
        setVisible(false);
        setAmount(0);
    }

    const handleButtonClick = () => {
        authUser.kyc_status !== 'APPROVED' ?
        setDialogVisible(true) :
        setVisible(true)
    }

    const handleYesClick =()=>{
        setDialogVisible(false)
        navigation.navigate('KycStatus')
    }

    const handleProceed = async () => {
        const result = await getLocalData(LOCAL_DB.CONFIG);
        const minAmount = result.INVESTMENT?.MIN_INVEST;
        if (amount < parseInt(minAmount)) {
            errorToast(`Amount should be greater than ₹${minAmount}`)
            return
        }
        const finalAmount = amount;
        closeDialog();
        navigation.navigate('PaymentMethod', { finalAmount })
    }

    const handleInputChange = (value) => {
        setAmount(value);
    };

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={{ backgroundColor: COLORS.PRIMARY }} >

            <Text style={{ fontFamily: FONTS.BOLD, color: COLORS.SECONDARY, textAlign: 'center', fontSize: responsiveFontSize(4) }}>
                AI Smart Invest
            </Text>
            <View style={{ alignSelf: 'center', marginTop: 10, width: 50, height: 5, borderRadius: 10, backgroundColor: COLORS.WHITE }} />
            <Text style={{ fontFamily: FONTS.REGULAR, color: COLORS.DESCRIPTION, marginTop: responsiveHeight(1.3), textAlign: 'center', fontSize: responsiveFontSize(2.5) }}>Your Automated Investment Partner</Text>
            <View style={{ alignItems: 'center' }}>
                <AnimatedLottieView
                    style={{ marginRight: 26, width: '100%' }}
                    source={LOTTIE.BOT}
                    autoPlay
                    loop
                />
            </View>

            <Button
                textColor={COLORS.BLACK}
                backgroundColor={COLORS.SECONDARY}
                containerStyle={{ paddingHorizontal: responsiveWidth(10), marginTop: 20, marginBottom: 10 }}
                name='Deposit INR Now'
                onPress={handleButtonClick} />

            <Dialog
                visible={dialogVisible}
                onYes={handleYesClick}
                onClose={() => setDialogVisible(false)}
                message={'Your KYC is pending. Complete KYC Verification before deposit.'}
                positiveButton={'Ok'}
                title='Alert!'
            />

            <Modal visible={visible} animationType='fade' transparent={true}>
                <KeyboardAvoidingView behavior='padding' style={styles.modalContainer}>

                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <Text style={styles.title}>Deposit INR</Text>
                            <TouchableOpacity style={{ marginStart: 'auto' }} activeOpacity={0.7} onPress={closeDialog}>
                                <CloseSvg color={COLORS.SECONDARY} size={26} />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            keyboardType='numeric'
                            inputMode='numeric'
                            label="Enter Amount (INR)"
                            onChangeText={text => handleInputChange(text)}
                            mode="outlined"
                        />

                        <Text style={{ ...styles.title, color: COLORS.DESCRIPTION }}>Minimum Amount : ₹{minINR} ({symbol + minAmount})</Text>

                        <Button style={{ marginTop: responsiveHeight(3) }} name='Proceed' onPress={handleProceed} />

                    </View>
                </KeyboardAvoidingView>
            </Modal>

        </ScrollView>

    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    modalContent: {
        paddingVertical: responsiveHeight(3.8),
        backgroundColor: COLORS.PRIMARY_LIGHT,
        paddingHorizontal: responsiveWidth(3.8),
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        paddingHorizontal: responsiveWidth(1.5),
        color: COLORS.SECONDARY,
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: responsiveFontSize(2),
    },
});