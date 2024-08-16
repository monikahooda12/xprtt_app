import React, { useEffect, useState } from "react";
import { API, COLORS, FIREBASE_REF, ICONS } from "../constants";
import { FlatList, View } from "react-native";
import { IndicesListing, Loader, ScreenLoading, Transaction as TransactionCard, screenLoading } from "../components";
import { httpRequest } from "../api/http";
import { Currency as CurrencyCard } from "../components";
import { getFirebaseRef } from "../utils";

export const Indices = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        screenLoading(true)
        const indicesRef = getFirebaseRef(FIREBASE_REF.INDICES);
        const onValueChange = async snapshot => {

            if (snapshot.exists()) {
                // Convert the snapshot value to an array of objects
                const values = snapshot.val();
                const dataList = Object.keys(values).map(key => {

                    return {
                        ...values[key],
                    };
                });
                setData(dataList)
                screenLoading(false)
            }
        };

        indicesRef.on('value', onValueChange);

        return () => indicesRef.off('value', onValueChange);
    }, []);

    return (
        <View style={{flex:1, backgroundColor:COLORS.WHITE}}>
            <ScreenLoading />
            <FlatList
                contentContainerStyle={{ marginTop: 5, paddingHorizontal: 15 }}
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <IndicesListing data={item} />
                    )
                }}>
            </FlatList>
        </View>

    );
};