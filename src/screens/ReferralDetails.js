import React, { useEffect, useState } from "react";
import { API, COLORS, FONTS, ICONS } from "../constants";
import { ActivityIndicator, FlatList, Image, SectionList, StyleSheet, Text, View } from "react-native";
import { Loader, NoData, ScreenLoading, Referral as ReferralCard, screenLoading } from "../components";
import { httpRequest } from "../api/http";
import { UTCtoIST, getAmount, getLevels } from "../utils";
import { CommonStyles } from "../styles/styles";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export const ReferralDetails = ({ navigation, route }) => {

    const [data, setData] = useState([]);
    const [amount, setAmount] = useState(0)
    const [symbol, setSymbol] = useState('')
    const { parent } = route.params;

    const level = getLevels(parent)
    const date = UTCtoIST(parent.createdAt, "MMM D, YYYY");

    useEffect(() => {
        loadData();
        const fun = async () => {
            const result = await getAmount(parent.investment)
            setAmount(result.amount)
            setSymbol(result.symbol)
        }
        fun()
    }, [parent])


    const loadData = async () => {

        screenLoading(true)

        const params = {
            level: level + 1,
            parent_id: parent.registration_id
        };

        try {
            const response = await httpRequest({ method: "GET", params, url: API.GET_REFERRALS });
            setData(response.data);
            screenLoading(false)
        } catch (error) {
            screenLoading(false)
        }
    }

    return (

        <View style={{ backgroundColor: COLORS.PRIMARY, flex: 1 }}>
            <ScreenLoading />
            <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 15 }}>

                <View style={{ ...styles.imageContainer, overflow: 'hidden' }}>
                    <Image
                        source={parent.profile_image ? { uri: parent.profile_image } : ICONS.AVATAR}
                        style={{ height: 80, width: 80, resizeMode: 'contain' }}
                    />
                </View>

                <View style={{ marginStart: 10, justifyContent: 'space-around' }}>
                    <Text style={{ fontFamily: FONTS.BOLD, fontSize: 16, color: COLORS.WHITE }}>
                        {parent.name}
                    </Text>
                    <Text style={{...styles.text, color:COLORS.DESCRIPTION}}>Invested Amount: {symbol + ' ' + amount}</Text>
                    <Text style={{...styles.text, color:COLORS.DESCRIPTION}}>Joined on {date}</Text>
                </View>
            </View>

            <View style={CommonStyles.horizontalLine} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: responsiveWidth(3), marginVertical: responsiveHeight(0.2) }}>

                <View style={styles.container2}>
                    <Text style={styles.amount}> Level {level} </Text>
                    <Text style={styles.label}> Position </Text>
                </View>

                <View style={styles.verticalLine} />

                <View style={styles.container2}>
                    <Text style={styles.amount}> {data.length} </Text>
                    <Text style={styles.label}>Referrals</Text>
                </View>
            </View>

            <View style={CommonStyles.horizontalLine} />

            <View style={{ flex: 1 }}>

                {!data.length > 0 ?
                    <NoData title='No Referrals!' description='No Referral found under this Account' />
                    :
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <ReferralCard data={item} />
                            )
                        }} />
                }
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 6,
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    container2: {
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    
    label: {
        marginTop: responsiveHeight(0.5),
        color: COLORS.DESCRIPTION,
        fontFamily: FONTS.MEDIUM,
        fontSize: responsiveFontSize(1.8)
    },
    text: {
        fontSize: 12,
        fontFamily: FONTS.SEMI_BOLD,
        color: COLORS.WHITE
    },
    imageContainer: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: COLORS.WHITE,
    },
    amount: {
        color: COLORS.SECONDARY,
        fontFamily: FONTS.BOLD,
        fontSize: responsiveFontSize(2),
    },
    verticalLine: {
        alignSelf: 'center',
        height: responsiveHeight(5),
        borderLeftColor: COLORS.DESCRIPTION,
        borderLeftWidth: 0.5,
    }
})