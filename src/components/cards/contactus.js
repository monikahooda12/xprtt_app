import { View, Text, TouchableOpacity } from "react-native";
import { CommonStyles } from "../../styles/styles";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { COLORS, FONTS } from "../../constants";

export const ContactUs = (data) => {

    const { onPress, icon: IconComponent, size, title } = data;

    return (

        <View style={{ paddingVertical: responsiveHeight(1) }}>
            <TouchableOpacity style={{ ...CommonStyles.card, flexDirection: 'row' }} onPress={onPress} activeOpacity={0.7}>

                <IconComponent style={{ alignSelf: 'center' }} size={size} />
                <Text style={{ fontFamily: FONTS.BOLD, fontSize: 14, color: COLORS.WHITE, marginStart: 10 }}>
                    {title}
                </Text>

            </TouchableOpacity>
        </View>

    );
};