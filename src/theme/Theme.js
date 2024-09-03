import { Platform } from "react-native";

export const COLOR = {
  white: '#FFFFFF',
  darkBlack: '#181C32',
  regularBlack: '#3F4254',
  lightBlack: '#84859A',
  thinLightBlack: '#F7F8FA',
  disabledBackground: '#FBFBFC',
  disabledText: '#999AA8',
  disabledIcon: '#B5B5C3',
  visibleIcon: '#84859A',
  placeholderTextColor: '#B5B5C3',
  darkBlue: '#3D8BFD',
  regularGreen: '#1AB03B',
  lightGreen: 'rgba(26, 176, 59, 0.1)',
  darkRed: '#DB081B',
  lightRed: 'rgba(219, 8, 27, 0.1)',
  blueText: '#3D8BFD',
  greyBG: '#F4F6FA',
  warningText: '#FFC926',
  white: "#FFFFFF",
  borderColor: "#EBEDF3",
  lightYellow:"#FFF9E6",
lifhtBlack:"#84859A",
darkGreen:"#0DB969"
 
 
  // thinLightBlack: "#F7F8FA",
  // disabledBackground: "#FBFBFC",
  // disabledText: "#999AA8",
  // disabledIcon: "#B5B5C3",
  // visibleIcon: "#84859A",
  // placeholderTextColor: "#B5B5C3",
  // darkGreen: "#099E60",
  // regularGreen: "#1AB03B",
  // lightGreen: "rgba(26, 176, 59, 0.1)",

  // darkRed: "#DB081B",
  // lightRed: "rgba(219, 8, 27, 0.1)",
  // blueText: "#3D8BFD",
  // greenBg: '#F2FAF7',
  // lightSky: '#F3F6F9',
};

export const FONTS = {
  GilroyThin200: Platform.select({
    android: "Gilroy-Thin",
    ios: "Gilroy-Thin",
  }),
  GilroyLight300: Platform.select({
    android: "Gilroy-Light",
    ios: "Gilroy-Light",
  }),
  GilroyRegularItalic400: Platform.select({
    android: "Gilroy-RegularItalic",
    ios: "Gilroy-RegularItalic",
  }),
  GilroyRegular400: Platform.select({
    android: "Gilroy-Regular",
    ios: "Gilroy-Regular",
  }),
  GilroyMedium500: Platform.select({
    android: "Gilroy-Medium",
    ios: "Gilroy-Medium",
  }),
  GilroyMediumItalic500: Platform.select({
    android: "Gilroy-MediumItalic",
    ios: "Gilroy-MediumItalic",
  }),
  GilroySemiBold600: Platform.select({
    android: "Gilroy-SemiBold",
    ios: "Gilroy-SemiBold",
  }),
  GilroyBold700: Platform.select({
    android: "Gilroy-Bold",
    ios: "Gilroy-Bold",
  }),
  GilroyExtraBold800: Platform.select({
    android: "Gilroy-ExtraBold",
    ios: "Gilroy-ExtraBold",
  }),
  PoppinsMedium500: Platform.select({
    android: "Poppins-Medium",
    ios: "Poppins-Medium",
  }),
  PoppinsRegular400: Platform.select({
    android: "Poppins-Regular",
    ios: "Poppins-Regular",
  }),
  RobotoLight: Platform.select({
    android: "Poppins-Regular",
    ios: "Poppins-Regular",
  })
};

const appTheme = { COLOR, FONTS };

export default appTheme;