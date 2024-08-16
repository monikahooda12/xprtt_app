import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS, ICONS } from '../../constants';
import { ArrowSvg } from '../../assets/icons/svg';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

export const ViewAll = (data) => {

    const {title, onPress}=data;

    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>{title}</Text>
            
            <TouchableOpacity onPress={onPress} activeOpacity={.7} style={styles.viewAllContainer}>
                
                <Text style={styles.viewAllText}>{'See All >>'}</Text>
                
                {/* <View style={styles.arrowContainer}>
                    
                <ArrowSvg color='white' size={10} style={{ transform: [{ rotate: `${-90}deg` }] }} />

                </View> */}

            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical:responsiveHeight(2),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: FONTS.BOLD,
        fontSize: responsiveFontSize(2),
        color: COLORS.SECONDARY,
    },
    viewAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewAllText: {
        fontFamily: FONTS.BOLD,
        paddingEnd:5,
        fontSize: 15,
        color: COLORS.SECONDARY,
        textAlign: 'center',
    },
    arrowContainer: {
        alignContent: 'center',
        padding: 5,
        borderRadius: 5,
        backgroundColor: COLORS.SECONDARY
    },
    arrowIcon: {
        width: 10,
        height: 10,
        tintColor: 'white'
    },


});
