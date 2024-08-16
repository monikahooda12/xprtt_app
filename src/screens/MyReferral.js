import React, { useEffect, useState } from "react";
import { API, COLORS, FONTS } from "../constants";
import { FlatList, Text, View } from "react-native";
import { NoData, ScreenLoading, Referral as ReferralCard, screenLoading, ReferralHeader } from "../components";
import { httpRequest } from "../api/http";
import { CommonStyles } from "../styles/styles";

export const MyReferral = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [counts, setCounts] = useState({});
    const [totalCounts, setTotalCounts] = useState(0);

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {

        screenLoading(true)

        const params = {
            level: 1
        };

        try {
            const response = await httpRequest({ method: "GET", params, url: API.GET_REFERRALS });
            setData(response.data)
            setCounts(response.counts)
            setTotalCounts(Object.values(response.counts).reduce((acc, value) => acc + value, 0))
            screenLoading(false)
        } catch (error) {
            screenLoading(false)
        }
    }

    return (

        <View style={{ backgroundColor: COLORS.PRIMARY, flex: 1 }}>
            <ScreenLoading />

            <ReferralHeader counts={counts} />

            {/* <View style={{ paddingHorizontal: 15, marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: COLORS.RED, fontFamily: FONTS.BOLD }}>Level 1 Referrals</Text>
                <Text style={{ color: COLORS.WHITE, fontFamily: FONTS.BOLD }}>{counts.Level_1}</Text>
            </View>
            <View style={{ paddingHorizontal: 15, marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: COLORS.ORANGE, fontFamily: FONTS.BOLD }}>Level 2 Referrals</Text>
                <Text style={{ color: COLORS.WHITE, fontFamily: FONTS.BOLD }}>{counts.Level_2}</Text>
            </View>
            <View style={{ paddingHorizontal: 15, marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: COLORS.YELLOW, fontFamily: FONTS.BOLD }}>Level 3 Referrals</Text>
                <Text style={{ color: COLORS.WHITE, fontFamily: FONTS.BOLD }}>{counts.Level_3}</Text>
            </View>
            <View style={{ paddingHorizontal: 15, marginTop: 5, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: COLORS.WHITE, fontFamily: FONTS.BOLD }}>Total Referral</Text>
                <Text style={{ color: COLORS.WHITE, fontFamily: FONTS.BOLD }}>{totalCounts}</Text>
            </View> */}
            {/* <View style={{ paddingHorizontal: 15, marginTop: 5, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: COLORS.WHITE, fontFamily: FONTS.BOLD }}>Commission Earned</Text>
                <Text style={{ color: COLORS.WHITE, fontFamily: FONTS.BOLD }}>₹ 0</Text>
            </View> */}

            <View style={CommonStyles.horizontalLine}/>

            <View style={{flex: 1 }}>

                {!data.length > 0 ?
                    <NoData title='No Referrals' description='No Referral found under this Account' />
                    :
                    <FlatList
                        data={data}
                        stickySectionHeadersEnabled={true}
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