import { StyleSheet } from "react-native"
import { COLORS, FONTS } from "../constants";

export const CommonStyles = StyleSheet.create({
    card: {
        backgroundColor:COLORS.PRIMARY_LIGHT,
        borderWidth: 0.2,
        borderColor: COLORS.DESCRIPTION,
        padding: 20,
    },
    title: {
        fontFamily: FONTS.BOLD,
        fontSize: 16,
        color: 'black',
    },
    subTitle: {
        fontFamily: FONTS.BOLD,
        color: 'gray',
    },

    horizontalLine: {
        marginVertical:15,
        borderBottomColor: COLORS.DESCRIPTION,
        borderBottomWidth: 0.5,
        opacity:0.5
    },
    verticalLine: {
        height: 30,
        borderLeftColor: COLORS.DESCRIPTION,
        borderLeftWidth: 1,
        borderStyle: 'dashed'
    },

});