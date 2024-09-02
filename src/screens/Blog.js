
// import React from 'react';
// import { View } from 'react-native';
// import { COLORS } from '../constants';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { CommonStyles } from '../styles/styles';
// import { WebView } from 'react-native-webview';
// import BlogsScreen from './Blogdata';


// export const Blog = () => {
//     return (
//         <View style={{flex: 1, backgroundColor: COLORS.WHITE}}>
//             <View 
//             style={CommonStyles.horizontalLine}
//             />

//             {/* <View style={{ 
//                  flex: 1,
//                  paddingHorizontal: responsiveWidth(3.8), 
//                  paddingTop: responsiveHeight(1),
//             }}>
//                 <Webview 
//                     source={{ uri: "https://blog.xprrt.com/" }}
//                     // style={{ flex: 1 }}
//                 />
//             </View> */}
//             <WebView 
//             injectedJavaScript={`
//                               document.querySelector('.sticky').style.display = 'none';
//                               document.querySelector('footer').style.display = 'none';
//                             `}
//                     source={{ uri: "https://blog.xprrt.com/" }}
//                     // style={{ flex: 1 }}
//                 />
//         </View>
//     );
// };







import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { WebView } from 'react-native-webview'; // Ensure this is imported correctly
import { COLORS, FONTS } from '../constants';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
// import BlogsScreen from './Blogdata';

const Tab = createMaterialTopTabNavigator();

export const Blog = ({ route }) => {
  const { initialRoute } = route.params || {};

  return (
    <Tab.Navigator
      initialRouteName={initialRoute || 'blog'}
      sceneContainerStyle={{ backgroundColor: COLORS.PRIMARY }}
      screenOptions={{
        tabBarStyle: { backgroundColor: COLORS.PRIMARY_LIGHT },
        tabBarIndicatorStyle: { backgroundColor: COLORS.SECONDARY },
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarLabelStyle: {
          color: COLORS.WHITE,
          fontFamily: FONTS.BOLD,
          fontSize: responsiveFontSize(1.8),
        },
        tabBarPressColor: 'transparent',
      }}
    >
      <Tab.Screen
        name="blog"
        component={BlogWebView} // Using the WebView component below
        options={{ headerShown: true }}
        initialParams={{ url: "https://blog.xprrt.com/search/categories/" }}
        
      />
      
    </Tab.Navigator>
  );
};

const BlogWebView = ({ route }) => {
  const { url } = route.params;

  return (
    <WebView
      injectedJavaScript={`
        document.querySelector('.sticky').style.display = 'none';
        document.querySelector('footer').style.display = 'none';
      `}
      source={{ uri: url }}
      style={{ flex: 1 }}
    />
  );
};



// initialParams={{ url: "https://dev.xprrt.com/faq/" }}







// import React, { useEffect, useState } from "react";
// import { COLORS, FIREBASE_REF, FONTS, LOCAL_DB } from "../constants";
// import { FlatList, Text, View } from "react-native";
// import { Button, ScreenLoading, screenLoading, Trade as TradeCard, TradeHeader } from "../components";
// import { getFirebaseRef, getLocalData } from "../utils";
// import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

// export const Trading = ({ navigation }) => {
//     const [data, setData] = useState([]);
//     const [dayProfit, setDayProfit] = useState(0);
//     const [investment, setInvestment] = useState(0);
//     const [marketStatus, setMarketStatus] = useState(false);

//     useEffect(() => {
//         screenLoading(true)

//         const tradingRef = getFirebaseRef(FIREBASE_REF.TRADING);
//         const settingsRef = getFirebaseRef(FIREBASE_REF.SETTINGS);
//         const onTradingValueChange = async snapshot => {
//             const { investment } = await getLocalData(LOCAL_DB.USER);
//             setInvestment(investment)

//             if (snapshot.exists()) {
//                 const values = snapshot.val();
//                 let profit = 0;
//                 const dataList = Object.keys(values).map(key => {
//                     const allocation = values[key].allocation;
//                     const interest = values[key].interest;

//                     const allocatedAmt = investment * (allocation / 100);
//                     const interestAmt = allocatedAmt * (interest / 100);

//                     profit = interestAmt + profit;
//                     setDayProfit(profit);

//                     return {
//                         allocatedAmt,
//                         interestAmt,
//                         ...values[key],
//                     };
//                 });
//                 setData(dataList);
//             }
//         };

//         const onSettingsValueChange = async snapshot => {
//             if (snapshot.exists()) {
//                 const values = snapshot.val();
//                 values.trading == 'OPEN' ? setMarketStatus(true) : setMarketStatus(false)
//                 screenLoading(false)
//             }
//         };

//         tradingRef.on('value', onTradingValueChange);
//         settingsRef.on('value', onSettingsValueChange);

//         return () => {
//             tradingRef.off('value', onTradingValueChange);
//             settingsRef.off('value', onSettingsValueChange);
//         }
//     }, []);

//     return (
//         <View style={{ backgroundColor: COLORS.PRIMARY, flex: 1 }}>

//             <ScreenLoading />
//             <TradeHeader dayProfit={dayProfit} marketStatus={marketStatus} />
//             {investment ?
//                 (<View style={{ flex: 1, marginTop: responsiveHeight(1), paddingHorizontal: responsiveWidth(3.8) }}>
//                     <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
//                         <Text style={{ flex: 0.50, fontSize: 12, fontFamily: FONTS.BOLD, color: COLORS.DESCRIPTION }}>
//                             Pairs
//                         </Text>
//                         <Text style={{ flex: 0.25, textAlign: 'right', fontSize: 12, fontFamily: FONTS.BOLD, color: COLORS.DESCRIPTION }}>
//                             Amt Allocated
//                         </Text>
//                         <Text style={{ flex: 0.25, textAlign: 'right', fontSize: 12, fontFamily: FONTS.BOLD, color: COLORS.DESCRIPTION }}>
//                             Change
//                         </Text>
//                     </View>
//                     <FlatList
//                         contentContainerStyle={{ marginTop: responsiveHeight(2) }}
//                         data={data}
//                         showsVerticalScrollIndicator={false}
//                         keyExtractor={(item, index) => index.toString()}
//                         renderItem={({ item, index }) => {
//                             return (
//                                 <TradeCard data={item} marketStatus={marketStatus} />
//                             )
//                         }}>
//                     </FlatList>
//                 </View>)
//                 :
//                 <View style={{ flex: 1, justifyContent: 'center' }}>
//                     <Button
//                         textColor={COLORS.BLACK}
//                         backgroundColor={COLORS.SECONDARY}
//                         containerStyle={{ paddingHorizontal: responsiveWidth(10) }}
//                         name='Go to Deposit Section'
//                         onPress={() => navigation.navigate('InvestmentPlan')} />
//                 </View>
//             }
//         </View>
//     );
// };