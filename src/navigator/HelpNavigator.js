import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ContactUs, Faq, Webview } from '../screens';
import { COLORS, FONTS } from '../constants';
import { responsiveFontSize } from 'react-native-responsive-dimensions';



const Tab = createMaterialTopTabNavigator();
export const HelpNavigator = ({ route }) => {

  const { initialRoute } = route.params || {};
  return (
    <Tab.Navigator
      initialRouteName={initialRoute || 'FAQ'}
      sceneContainerStyle={{backgroundColor:COLORS.PRIMARY}}
      screenOptions={{
        tabBarStyle: { backgroundColor: COLORS.PRIMARY_LIGHT, },
        tabBarIndicatorStyle: { backgroundColor: COLORS.SECONDARY },
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarLabelStyle: { color: COLORS.WHITE, fontFamily: FONTS.BOLD, fontSize: responsiveFontSize(1.8) },
        tabBarPressColor: 'transparent',
      }}>

 <Tab.Screen name="FAQ" component={Webview} initialParams={{ url: "https://dev.xprrt.com/faq/" }} />
 <Tab.Screen name="ContactUs" component={ContactUs} />
    </Tab.Navigator>
  );
}


// initialParams={{ url: "https://dev.xprrt.com/faq/" }}
