import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Dashboard, Account, Blog } from '../screens';
import { COLORS, FONTS } from '../constants';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AccountSvg, HomeSvg, IndicesSvg, CurrenciesSvg } from '../assets/icons/svg';
import { Header } from '../components';
import Xprrt from '../xprrt/Xprrt';
import Parentcategories from '../Categories/Parentcategories';
import Childcategories from '../Categories/Childcategories';
import Subchildcategories from '../Categories/Subchildcategories';
import Xprtcategories from '../xprrt/Xprtcategories';



const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create stack navigators for tabs where you need deeper navigation
function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      {/* Add more screens if needed for the Dashboard tab */}
    </Stack.Navigator>
  );
}

function CategoriesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Parentcategories" component={Parentcategories} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Parentcategories" component={Parentcategories} options={{ header: () => <Header title='Xprrt Watch'  showBackButton={true} tintColor={COLORS.WHITE} backgroundColor={COLORS.PRIMARY} />, }} /> */}
      <Stack.Screen name="Childcategories" component={Childcategories} options={{ headerShown: false }} />
      <Stack.Screen name="Subchildcategories" component={Subchildcategories} options={{ headerShown: false }} />
      {/* Add more screens if needed for the Categories tab */}
    </Stack.Navigator>
  );
}

function XprrtStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Xprrt" component={Xprrt} options={{ header: () => <Header title='Xprrt Watch' showBackButton={true} tintColor={COLORS.WHITE} backgroundColor={COLORS.PRIMARY} />, }} />
      <Stack.Screen name="Xprtcategories" component={Xprtcategories} options={{ headerShown: false }} />
      {/* Add more screens if needed for the Xprrt tab */}
    </Stack.Navigator>
  );
}

function BlogStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Blog" component={Blog} options={{ headerShown: false }} />
      {/* Add more screens if needed for the Blog tab */}
    </Stack.Navigator>
  );
}

function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
      {/* Add more screens if needed for the Account tab */}
    </Stack.Navigator>
  );
}

export const DashboardNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <Tab.Navigator
      initialRouteName={'Dashboard'}
      screenOptions={{
        tabBarStyle: {
          borderTopColor: COLORS.PRIMARY,
          backgroundColor: COLORS.PRIMARY,
        },
      }}>
      <Tab.Screen
        name={"Dashboard"}
        component={DashboardStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <HomeSvg color={focused ? COLORS.SECONDARY : COLORS.DESCRIPTION} />
              <Text style={{ color: focused ? COLORS.SECONDARY : COLORS.DESCRIPTION, fontFamily: FONTS.SEMI_BOLD, top: 5, fontSize: 13 }}>
                Home
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
         name={"Categories"}
        component={CategoriesStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <IndicesSvg color={focused ? COLORS.SECONDARY : COLORS.DESCRIPTION} />
              <Text style={{ color: focused ? COLORS.SECONDARY : COLORS.DESCRIPTION, fontFamily: FONTS.SEMI_BOLD, top: 5, fontSize: 13 }}>
                Categories
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={"Xprrt"}
        component={XprrtStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <IndicesSvg color={focused ? COLORS.SECONDARY : COLORS.DESCRIPTION} />
              <Text style={{ color: focused ? COLORS.SECONDARY : COLORS.DESCRIPTION, fontFamily: FONTS.SEMI_BOLD, top: 5, fontSize: 13 }}>
                Xprrt
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={'Blog'}
        component={BlogStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <CurrenciesSvg color={focused ? COLORS.SECONDARY : COLORS.DESCRIPTION} />
              <Text style={{ color: focused ? COLORS.SECONDARY : COLORS.DESCRIPTION, fontFamily: FONTS.SEMI_BOLD, top: 5, fontSize: 13 }}>
                Blog
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={"Account"}
        component={AccountStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <AccountSvg color={focused ? COLORS.SECONDARY : COLORS.DESCRIPTION} />
              <Text style={{ color: focused ? COLORS.SECONDARY : COLORS.DESCRIPTION, fontFamily: FONTS.SEMI_BOLD, top: 5, fontSize: 13 }}>
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 25,
  },
});
