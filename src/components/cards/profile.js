import { Image, StyleSheet, View, Text } from "react-native";
import { COLORS, FONTS, ICONS } from "../../constants";

export const Profile = (data) => {

    const { icon: IconComponent, size, color, source, iconBackgroundColor, name } = data;

    return (

        <View style={styles.container}>
            <View style={styles.block1}>
                <View style={{ backgroundColor: iconBackgroundColor, borderRadius: 10 }}>
                    <Image style={styles.image} source={source} />
                </View>
                <View>
                    <Text style={styles.text}>{name}</Text>
                    <Text style={styles.text1}>durejagaurav@gmail.com</Text>
                    <Text style={styles.text1}>Rohtak, Haryana</Text>
                </View>
            </View>
            {/* <View style={{justifyContent:'center', marginStart:'auto', marginEnd:15}}>
                <IconComponent style={{ alignSelf: 'center' }} size={size} color={color} />
            </View> */}
        </View>

    );

};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        flexDirection: 'row',
    },
    block1: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 70,
        height: 70,
    },
    text: {
        marginStart: 10,
        fontFamily: FONTS.BOLD,
        fontSize: 18,
        color: 'black'
    },
    text1: {
        marginStart: 10,
        fontFamily: FONTS.BOLD,
        fontSize: 14,
        color: 'gray'
    },

});