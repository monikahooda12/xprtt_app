import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS, ICONS } from "../../constants";
import { UTCtoIST, getAmount, getLevels } from "../../utils";
import { Image } from "react-native";
import NavigationService from "../../navigator/NavigationService";
import { responsiveFontSize } from "react-native-responsive-dimensions";

export const Referral = ({ data }) => {

    const { name, investment, profile_image, createdAt } = data;
    const level = getLevels(data)
    const [amount, setAmount] = useState(0)
    const [symbol, setSymbol] = useState('')

    useEffect(() => {
        const fun = async () => {
            const result = await getAmount(investment)
            setAmount(result.amount)
            setSymbol(result.symbol)
        }
        fun()
    }, [])

    const date = UTCtoIST(createdAt, "MMM D, YYYY");

    const handleClick = () => {
        NavigationService.navigate('ReferralDetails', { parent: data })
    }

    return (
        <TouchableOpacity onPress={handleClick} activeOpacity={0.7} style={styles.container}>

            <View style={{ ...styles.imageContainer, overflow: 'hidden' }}>
                <Image
                    source={profile_image ? { uri: profile_image } : ICONS.AVATAR}
                    style={{ height: 50, width: 50, resizeMode: 'contain' }} />
            </View>

            <View style={{ marginStart: 10, flex: 1 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.text}>{name}</Text>
                    <Text style={{ ...styles.amountText, color: COLORS.SECONDARY }}> {'Level ' + level} </Text>
                </View>
                <Text style={{ ...styles.amountText }}>Invested Amount: {symbol + ' ' + amount}</Text>
                <Text style={{ ...styles.description }}>Joined: {date}</Text>
            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 6,
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    text: {
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: responsiveFontSize(2),
        color: COLORS.WHITE
    },
    description: {
        fontFamily: FONTS.MEDIUM,
        fontSize: responsiveFontSize(1.5),
        color: COLORS.DESCRIPTION
    },
    amountText: {
        fontSize: responsiveFontSize(1.5),
        color: COLORS.DESCRIPTION
    },
    imageContainer: {
        borderRadius: 100,
        backgroundColor: COLORS.WHITE,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
})