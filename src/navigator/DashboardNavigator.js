import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard, Account, Blog,   } from '../screens';
import { COLORS, FONTS, ICONS } from '../constants';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AccountSvg, CurrenciesSvg, HomeSvg, IndicesSvg, NotificationSvg } from '../assets/icons/svg';
import { Header } from '../components';
import Xprrt from '../skill/Xprrt';

import Home1 from '../skill/Home1';


const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

export const DashboardNavigator = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [navigation]);

  return (

    <Tab.Navigator initialRouteName={'Dashboard'}
      screenOptions={{
        tabBarStyle: {
           borderTopColor: COLORS.PRIMARY,
          backgroundColor: COLORS.PRIMARY,
         
           

        }
      }}>

      <Tab.Screen name={"Dashboard"} component={Dashboard}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabContainer}>
                <HomeSvg color={focused ? COLORS.SECONDARY : COLORS.DESCRIPTION} />
                <Text style={{ color: focused ? COLORS.SECONDARY : COLORS.DESCRIPTION, fontFamily: FONTS.SEMI_BOLD, top: 5, fontSize: 13, }}>
                  Home
                </Text>
              </View>
            )
          }
        }} />





<Tab.Screen name={"Home1"} component={Home1}
        options={{
          header: () => <Header title='xprrt Watch' showBackButton={false} tintColor={COLORS.WHITE} backgroundColor={COLORS.PRIMARY} />,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabContainer}>
                <IndicesSvg color={focused ? COLORS.SECONDARY : COLORS.DESCRIPTION} />
                <Text style={{ color: focused ? COLORS.SECONDARY : COLORS.DESCRIPTION, fontFamily: FONTS.SEMI_BOLD, top: 5, fontSize: 13 }}>
                  Categories
                </Text>
              </View>
            )
          }
        }} />



      <Tab.Screen name={"xprrtt"} component={Xprrt}
        options={{
          header: () => <Header title='xprrt Watch' showBackButton={false} tintColor={COLORS.WHITE} backgroundColor={COLORS.PRIMARY} />,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabContainer}>
                <IndicesSvg color={focused ? COLORS.SECONDARY : COLORS.DESCRIPTION} />
                <Text style={{ color: focused ? COLORS.SECONDARY : COLORS.DESCRIPTION, fontFamily: FONTS.SEMI_BOLD, top: 5, fontSize: 13 }}>
                  Xprrt
                </Text>
              </View>
            )
          }
        }} />



      <Tab.Screen name={'Blog'} component={Blog}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabContainer}>
                <CurrenciesSvg color={focused ? COLORS.SECONDARY : COLORS.DESCRIPTION} />
                <Text style={{ color: focused ? COLORS.SECONDARY : COLORS.DESCRIPTION, fontFamily: FONTS.SEMI_BOLD, top: 5, fontSize: 13 }}>
                  Blog
                </Text>
              </View>
            )
          }
        }} />
      <Tab.Screen name={"Account"} component={Account}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabContainer}>
                <AccountSvg color={focused ? COLORS.SECONDARY : COLORS.DESCRIPTION} />
                <Text style={{ color: focused ? COLORS.SECONDARY : COLORS.DESCRIPTION, fontFamily: FONTS.SEMI_BOLD, top: 5, fontSize: 13 }}>
                  Account
                </Text>
              </View>
            )
          }
        }} />
        
       
            
          
        

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
     alignItems: 'center',
    justifyContent: 'space-between',
     borderRadius:25,
   
  },
});