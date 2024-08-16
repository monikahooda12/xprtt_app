import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../../constants";
import { ClockSvg } from "../../assets/icons/svg";
import { getTimeDifference } from "../../utils";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export const News = ({ data }) => {
    const { title, description, image, pubDate, link } = data;

    const date = getTimeDifference(pubDate);

    const openURL = async () => {
        await Linking.openURL(link);
    }

    return (

        <TouchableOpacity onPress={openURL} activeOpacity={0.8} style={{ paddingVertical: 5 }}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text numberOfLines={2} style={styles.title}>{title}</Text>
                    <Text numberOfLines={2} style={styles.description}>{description}</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
                <View style={styles.author}>
                    <Text style={styles.authorText}>Economic Times</Text>
                </View>
                <View style={styles.dateContainer}>
                    <ClockSvg size={12} color={COLORS.WHITE} />
                    <Text style={styles.date}>{date}</Text>
                </View>
            </View>

        </TouchableOpacity>

    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textContainer: {
        flex: 0.7,
        paddingRight: 20
    },
    imageContainer: {
        flex: 0.3,
        borderColor: COLORS.SHADOW,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden'
    },
    title: {
        fontFamily: FONTS.BOLD,
        fontSize: responsiveFontSize(2),
        color: COLORS.WHITE
    },
    description: {
        fontFamily: FONTS.REGULAR,
        fontSize: responsiveFontSize(1.8),
        color: COLORS.DESCRIPTION,
        marginTop: responsiveHeight(0.5)
    },
    image: {
        width: responsiveWidth(30),
        height: responsiveHeight(10)
    },
    author: {
        paddingHorizontal: responsiveWidth(1.5),
        paddingVertical: responsiveHeight(0.5),
        backgroundColor: COLORS.PRIMARY_LIGHTER,
        borderRadius: 5,
    },
    authorText: {
        fontFamily: FONTS.REGULAR,
        fontSize: responsiveFontSize(1.4),
        color: COLORS.SECONDARY,
        includeFontPadding: false,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: 10,
    },
    date: {
        marginStart: 5,
        fontFamily: FONTS.REGULAR,
        fontSize: 12,
        color: COLORS.WHITE
    }
});