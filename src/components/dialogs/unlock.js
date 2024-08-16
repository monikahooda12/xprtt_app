import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { COLORS, FONTS, LOTTIE, appName } from '../../constants';
import { Button } from 'react-native-paper';
import AnimatedLottieView from 'lottie-react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const Unlock = (data) => {

    const { visible, onYes, onClose, } = data;

    return (

        <Modal visible={visible} animationType="fade" transparent>
            <View style={styles.container}>
                <View style={{ backgroundColor: COLORS.PRIMARY_LIGHT, paddingHorizontal:responsiveWidth(3.8), paddingBottom:responsiveWidth(3.8), alignItems: 'center' }}>

                    <View style={{ alignSelf: 'center', width: '35%' }}>
                        <AnimatedLottieView
                            style={{ position: 'relative' }}
                            source={LOTTIE.SECURITY}
                            autoPlay
                            loop
                        />
                    </View>

                    <Text style={{ fontFamily: FONTS.SEMI_BOLD, fontSize: responsiveFontSize(2), color: COLORS.WHITE, }}>
                        Lock Screen Security
                    </Text>

                    <Text style={{ textAlign: 'center', lineHeight: 24, fontFamily: FONTS.MEDIUM, color: COLORS.DESCRIPTION, paddingVertical: responsiveHeight(4) }}>
                        Please unlock to continue. {'\n'} Lock Screen Security protects you from unauthorised access to {appName}
                    </Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Button
                            onPress={onClose}
                            mode='outlined'
                            textColor={COLORS.DESCRIPTION}
                            contentStyle={{ paddingVertical: 8 }}
                            style={{ flex: 1, marginEnd: 5, borderRadius: 2, borderWidth: 0.4 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onPress={onYes}
                            mode='contained'
                            textColor={COLORS.BLACK}
                            buttonColor={COLORS.SECONDARY}
                            contentStyle={{ paddingVertical: 8 }}
                            style={{ borderRadius: 2, marginStart: 5, flex: 1 }}
                        >
                            Unlock
                        </Button>

                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: responsiveWidth(5),
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
