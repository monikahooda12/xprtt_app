import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { CommonStyles } from '../../styles/styles';
import { ArrowSvg } from '../../assets/icons/svg';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

export const Faq = ({ data }) => {
    const [expandedId, setExpandedId] = useState(null);

    const handleItemPress = (id) => {
        setExpandedId((prevId) => (prevId === id ? null : id));
    };

    const renderItem = ({ item, index }) => {
        const isExpanded = index === expandedId;
        return (

            <View style={{ paddingVertical: responsiveHeight(1) }}>
                <TouchableOpacity style={{ ...CommonStyles.card}} activeOpacity={0.7} onPress={() => handleItemPress(index)}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{width:'90%', fontFamily: FONTS.SEMI_BOLD, fontSize: responsiveFontSize(1.8), color: COLORS.WHITE }}>
                            {item.question}
                        </Text>
                        <ArrowSvg color={COLORS.SECONDARY} size={16} style={{ marginStart: 'auto', alignSelf:'center' }} />
                    </View>

                    {isExpanded && <View style={{ height: 0.4, marginTop: 20, marginBottom: 10, backgroundColor: COLORS.DARK_GRAY, elevation: 1 }} />}
                    {isExpanded &&
                        <Text style={{ fontFamily: FONTS.MEDIUM, fontSize: 12, color: COLORS.DESCRIPTION, }}>
                            {item.answer}
                        </Text>}
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};
