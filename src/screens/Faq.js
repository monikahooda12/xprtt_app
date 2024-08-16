import React, { } from 'react';
import { View } from 'react-native';
import { Faq as FaqCard } from '../components';
import { responsiveHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useState } from 'react';
import { useEffect } from 'react';
import { getLocalData } from '../utils';
import { COLORS, LOCAL_DB, WEBSITE_PAGES } from '../constants';

export const Faq = () => {

    const [faq, setFaq] = useState([])

    useEffect(() => {
        const fun = async () => {
            const result = await getLocalData(LOCAL_DB.CONFIG)
            // const result = await getLocalData(WEBSITE_PAGES.Faq)
            setFaq(result.FAQS)

        }
        fun()
    }, [])

    return (
        <View style={{ backgroundColor: COLORS.PRIMARY, paddingHorizontal: responsiveScreenWidth(3.8), paddingTop: responsiveHeight(1) }}>
            {/* <FaqCard data={faq} /> */}
        
        </View>

    );
};