import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, ICONS } from "../../constants";
import { Capitalize, UTCtoIST, getTimeDifference } from "../../utils";
import { CommonStyles } from "../../styles/styles";
import { Image } from "react-native";
import { ArrowDownSvg, ArrowRDownSvg, CloseSvg, InvestSvg, PlusSvg } from "../../assets/icons/svg";

export const Notification = ({ data }) => {

    const { createdAt, title, description } = data;

    const date = getTimeDifference(createdAt);

    return (
        <View style={styles.container}>

            <View style={{flex:1, marginStart: 10, minHeight: 40, justifyContent: 'space-between' }}>

                <View style={{ flexDirection: 'row'}}>
                    <Text style={styles.title}>title</Text>
                    <Text style={styles.description}>{date}</Text>
                </View>
                <Text style={styles.date}>description</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        marginVertical: 6,
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    title: {
        flex:0.8,
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: 16,
        color: 'black'
    },
    description: {
        flex:0.2,
        textAlign: 'right',
        fontWeight: '600',
        fontSize: 14,
        color: 'black'
    },
    date: {
        fontSize: 12,
        fontFamily: FONTS.SEMI_BOLD,
        color: 'gray',
    }
})