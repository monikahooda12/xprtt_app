import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NotificationSvg } from '../assets/icons/svg';
import { COLORS } from '../constants';
import { responsiveWidth } from 'react-native-responsive-dimensions';

export const NotificationIcon = ({ count }) => {
    return (
        <View style={styles.container}>
            
            <NotificationSvg size={15}/>

            {count > 0 &&

                <View style={styles.badgeContainer}>
                    <Text style={styles.text}>{count}</Text>
                </View>

            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        right:responsiveWidth(3.8),
        borderRadius: 100,
        borderWidth: 0.4,
    },
    badgeContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: COLORS.RED,
        borderRadius: 10,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        fontSize: 10,
        color: 'white',
        includeFontPadding:false
      },
});
