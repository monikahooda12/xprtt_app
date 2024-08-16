import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { COLORS, FONTS } from "../../constants";

export const InvestmentPlan = () => {

    const { width } = useWindowDimensions();

    return (
        <View style={{width, paddingVertical: 40, paddingHorizontal: 40 }} >

            <View style={{ shadowColor: 'white', borderRadius: 15, padding: 30, backgroundColor: COLORS.PRIMARY }}>

                <Text style={{ alignSelf: 'center', color: 'white', fontSize: 26, fontFamily: FONTS.SEMI_BOLD }}>
                    Popular Plan
                </Text>
                <View style={{ alignSelf: 'center', marginTop: 10, width: 50, height: 5, borderRadius: 10, backgroundColor: 'white' }} />

                <Text style={{ color: 'white', fontFamily: FONTS.BOLD, marginTop: 20, }}>
                    - Lorem Ipsum is simply dummy text
                </Text>
                <Text style={{ color: 'white', fontFamily: FONTS.BOLD, marginTop: 20, }}>
                    - Lorem Ipsum is simply dummy text
                </Text>
                <Text style={{ color: 'white', fontFamily: FONTS.BOLD, marginTop: 20, }}>
                    - Lorem Ipsum is simply dummy text
                </Text>
                <Text style={{ color: 'white', fontFamily: FONTS.BOLD, marginTop: 20, }}>
                    - Lorem Ipsum is simply dummy
                </Text>
                <Text style={{ color: 'white', fontFamily: FONTS.BOLD, marginTop: 20, }}>
                    - Lorem Ipsum is simply dummy text
                </Text>
                <View style={{ elevation: 5, marginTop: 30, height: 0.4, borderRadius: 10, backgroundColor: 'white' }} />
                <Text style={{ alignSelf: 'center', color: 'white', fontSize: 16, fontFamily: FONTS.BOLD, marginTop: 20, }}>
                    - Special feature come here
                </Text>
            </View>
        </View>
    );
};