import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackArrowSvg, LogoSvg } from '../../assets/icons/svg';
import { COLORS, FONTS } from '../../constants';
import { responsiveWidth } from 'react-native-responsive-dimensions';

export const Header = (props) => {

    const { title,
        logo,
        rightIcon,
        showBackButton = true,
        
        backgroundColor = COLORS.PRIMARY,
        tintColor = COLORS.WHITE } = props;

    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>

            <View style={{ height: 60 }}></View>

            {showBackButton && (
                <TouchableOpacity activeOpacity={0.7} style={[styles.backButton, { borderColor: tintColor }]} onPress={handleGoBack}>
                    <BackArrowSvg size={15} color={tintColor} />
                </TouchableOpacity>
            )}

            {title && (
                <Text style={[styles.title, { color: tintColor }]}>{title}</Text>
            )}

            {/* {logo && (
                <LogoSvg height={25} color={COLORS.PRIMARY} />
            )} */}

            {rightIcon && (
                <View style={styles.rightIcon}>
                    {rightIcon.map((icon, index) => (
                        <TouchableOpacity activeOpacity={0.7} style={{ paddingHorizontal: 5 }} key={index} onPress={icon.onPress}>
                            {icon.component}
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
         flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        zIndex: 999,
        position: 'absolute',
         marginLeft: responsiveWidth(3.8),
        padding: 10,
        borderRadius: 100,
        borderWidth: 0.4,
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontFamily: FONTS.BOLD,
        fontSize: 18,
        color: COLORS.BLACK
    },
    rightIcon: {
        flexDirection: 'row',
         zIndex: 999,
        position: 'absolute',
        right: 0
    }
});
