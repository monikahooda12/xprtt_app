import React, { useEffect, useState } from "react";
import { COLORS, FIREBASE_REF} from "../constants";
import { FlatList, View } from "react-native";
import { Currency as CurrencyCard, ScreenLoading, screenLoading } from "../components";
import { getFirebaseRef} from "../utils";

export const Market = ({ navigation }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        screenLoading(true)

        const stocksRef = getFirebaseRef(FIREBASE_REF.STOCKS);
        const onValueChange = async snapshot => {

            if (snapshot.exists()) {
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
        stocksRef.on('value', onValueChange);

        return () => stocksRef.off('value', onValueChange);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ScreenLoading />
            <View style={{ backgroundColor: COLORS.PRIMARY, paddingHorizontal: 15, flex: 1 }}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <CurrencyCard data={item} />
                        )
                    }}>
                </FlatList>
            </View>
        </View>
    );
};