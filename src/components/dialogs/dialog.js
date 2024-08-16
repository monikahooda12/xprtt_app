import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { Button } from 'react-native-paper';
import { CommonStyles } from '../../styles/styles';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

export const Dialog = (data) => {

    const { buttonColor, textColor, visible, onYes, onClose, title = 'Confirmation!', message, positiveButton, negativeButton = 'Cancel' } = data;

    return (

        <Modal visible={visible} animationType="fade" transparent>
            <View style={styles.container}>
                <View style={{ backgroundColor: COLORS.PRIMARY_LIGHT, padding: 16, }}>

                    <Text style={styles.text}>{title}</Text>

                    <View style={CommonStyles.horizontalLine} />

                    <Text style={{ ...styles.description, paddingVertical: 20 }}>{message}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Button
                            onPress={onClose}
                            mode='outlined'
                            textColor={COLORS.DESCRIPTION}
                            contentStyle={{ paddingVertical: 2 }}
                            style={{ flex: 1, marginEnd: 5, borderRadius: 2, borderWidth: 0.5 }}
                        >
                            {negativeButton}
                        </Button>
                        <Button
                            onPress={onYes}
                            mode='contained'
                            textColor={textColor ? textColor : COLORS.WHITE}
                            buttonColor={buttonColor ? buttonColor : COLORS.RED}
                            contentStyle={{ paddingVertical: 2 }}
                            style={{ borderRadius: 2, marginStart: 5, flex: 1 }}
                        >
                            {positiveButton}
                        </Button>

                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    text:{
        fontFamily: FONTS.BOLD,
        fontSize: responsiveFontSize(2),
        color: COLORS.WHITE,
    },
    description:{
        marginTop:responsiveHeight(-3),
        fontFamily: FONTS.MEDIUM,
        fontSize: responsiveFontSize(2),
        color: COLORS.DESCRIPTION,
    }
});
