import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { NotFoundSvg } from '../../assets/icons/svg';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export const NoData = (data) => {

    const { title, description } = data;

    return (
        <View style={styles.container}>
            {/* <NotFoundSvg size={100} style={{ marginVertical: 20 }} /> */}
            <Text style={styles.title}>
                {title || 'Oops... No Data Found'}
            </Text>
            <Text style={styles.subTitle}>
                {description || 'Looks like you have not made any transaction yet.'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginVertical: 20,
        textAlign: 'center',
        fontFamily: FONTS.BOLD,
        fontSize: responsiveFontSize(2),
        color: COLORS.WHITE
    },
    subTitle: {
        textAlign: 'center',
        fontFamily: FONTS.REGULAR,
        fontSize: responsiveFontSize(1.5),
        color: COLORS.DESCRIPTION
    },
});
