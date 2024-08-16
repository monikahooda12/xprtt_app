import React, { useState } from 'react';
import { View, ScrollView, Linking } from 'react-native';
import { ContactUs as ContactUsCard } from '../components';
import { CustomerServiceSvg, EmailSvg, FacebookSvg, WebsiteSvg, WhatsAppSvg } from '../assets/icons/svg';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useEffect } from 'react';
import { getLocalData } from '../utils';
import { COLORS, LOCAL_DB } from '../constants';

export const ContactUs = () => {

    const [support, setSupport] = useState([])

    useEffect(() => {
        const fun = async () => {
            const result = await getLocalData(LOCAL_DB.CONFIG)
            setSupport(result.CUSTOMER_SUPPORT)
        }
        fun()
    }, [])

    const dialNumber = () => {
        Linking.openURL(`tel:${support.MOBILE}`);
    };

    const sendEmail = () => {
        const emailUrl = `mailto:${support.EMAIL}?subject=${encodeURIComponent('')}&body=${encodeURIComponent('')}`;
        Linking.openURL(emailUrl);
    };

    const openWhatsApp = () => {
        Linking.openURL(`whatsapp://send?phone=${support.WHATSAPP}`);
    };

    const openFacebookPage = () => {
        Linking.openURL(`fb://facewebmodal/f?href=${support.FACEBOOK}`);
    };

    const openWebsite = () => {
        Linking.openURL(support.WEBSITE);
    };

    

    return (
        <ScrollView style={{ backgroundColor: COLORS.PRIMARY }}>
            <View style={{ paddingHorizontal: responsiveWidth(3.8), marginTop: responsiveHeight(1) }}>

                {support.MOBILE &&
                    <ContactUsCard
                        onPress={dialNumber}
                        title="Customer Service"
                        icon={CustomerServiceSvg}
                        size={16}
                    />
                }

                {support.EMAIL &&
                    <ContactUsCard
                        onPress={sendEmail}
                        title="Write to Us"
                        icon={EmailSvg}
                        size={16}
                    />
                }

                {support.WHATSAPP &&

                    <ContactUsCard
                        onPress={openWhatsApp}
                        title="WhatsApp"
                        icon={WhatsAppSvg}
                        size={16}
                    />
                }

                {support.FACEBOOK &&
                    <ContactUsCard
                        onPress={openFacebookPage}
                        title="Facebook"
                        icon={FacebookSvg}
                        size={16}
                    />
                }

                {support.WEBSITE &&
                    <ContactUsCard
                        onPress={openWebsite}
                        title="Website"
                        icon={WebsiteSvg}
                        size={16}
                    />
                }
            </View>

        </ScrollView>
    );
};