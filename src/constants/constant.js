export const appName = 'Xprrt';

//To be set conditionally for Android/iphone
export const DEVICE_TYPE = 2;
export const APP_EXCHANGE_RATE = 85.00;

export const FIREBASE_REF = Object.freeze({
    TRADING: 'trading',
    INDICES: 'indices',
    STOCKS: 'stocks',
    SETTINGS: 'settings',
})

export const LOCAL_DB = Object.freeze({
    USER: 'user',
    TOKEN: 'token',
    LOCK_SCREEN: 'isLockScreen',
    CURRENCY: 'currency',
    FCM_TOKEN: 'fcm_token',
    CONFIG: 'config'
})

//URL Constants
export const API = Object.freeze({
    // BASE_URL: "http://403339.hstgr.cloud", ===========orginal
      BASE_URL:'https://srv544638.hstgr.cloud',
    //   BASE_URL:'https://xprrt-frontend.vercel.app',
    VERSION: "/api/v1",

    LOGIN: "/auth/login",
    VERIFY: "/auth/verify",
    LOGOUT: "/auth/logout",
    USERS:'/users',
    REVIEWS:"/reviews",
    REFERRAL: "/profile/referral",

    PROFILE_PROFESSIONAL: "/profile/professional",

    PROFILE_IMAGE_delete : "/profile/upload-details",



    GET_PROFILE: "/profile",
    PROFILE_IMAGE_UPLOAD: "/profile/upload",
    CONTACT : "/contacts",
    UPDATE_PERSONAL_PROFILE: "/profile/personal",
    TRANSACTIONS: "/transactions",
    FOREGROUND_BACKGROUND: "/common/foreground-background",
    DASHBOARD: "/common/dashboard",
    GET_CATEGORIES: "/categories",
    GET_REFERRALS: "/referrals",
    BANK_DETAILS: "/profile/bank-details",
});

export const BASE_URL = "https://www.jmbfx.com";
export const WEBSITE_PAGES = Object.freeze({
    PRIVACY_POLICY: BASE_URL + "/privacy-policy.php",
    TERMS_CONDITIONS: BASE_URL + "/terms-conditions.php",
    
});

//Color Constants
export const COLORS = Object.freeze({
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    TRANSPARENT: 'rgba(0, 0, 0, 0.0)',
LIGHTGRAY:'#999',

     PRIMARY: '#FFFFFF',   
   // PRIMARY:'#00150F', (DARK BLACK) 

   PRIMARY_LIGHT: '#0EBECF0',
//    PRIMARY_LIGHT: '#0a1e18',(LIGHT BLACK)
    PRIMARY_LIGHTER: '#21342f',

   // SECONDARY:'#00D094', ORGINAL==========(GREEEN)
SECONDARY :'rgb(60,235,230)',
    
   DESCRIPTION:'#0a1e18',
  // DESCRIPTION:'#000000',

    GREEN: 'white',
    // GREEN:'#32CD32',
     GREEN_LIGHT: 'rgba(50,205,50,0.1)',
    RED: '#FF0800',
    RED_LIGHT: 'rgba(255,8,0,0.1)',
    BLUE_SHADOW: '#e9f2f7',
    DARK_GRAY: '#696666',
    OVERLAY: 'rgba(0, 0, 0, 0.2)',
    SHADOW: 'rgba(0, 0, 0, 0.1)',
    ORANGE: '#FF4500',
    YELLOW: '#FEBE10',
    ALERT: '#F8D7DA',
    ALERT_TEXT: '#721C24',
})

//Icons Constants
export const ICONS = Object.freeze({
    AVATAR: require('../assets/icons/avatar.png'),
    INDIA_FLAG: require('../assets/icons/india-flag.png'),
    US_FLAG: require('../assets/icons/us-flag.png'),
    LOGO: require('../assets/icons/logo.png'),
})

export const LOTTIE = Object.freeze({
    LOGIN: require('../assets/lottie/login.json'),
    THANKS: require('../assets/lottie/thanks.json'),
    REFERRAL: require('../assets/lottie/referral.json'),
    AI_ANIM: require('../assets/lottie/ai_anim.json'),
    AI_SLEP: require('../assets/lottie/ai_sleep.json'),
    SECURITY: require('../assets/lottie/security.json'),
    IMAGE_LOADING: require('../assets/lottie/image_loading.json'),
    SCREEN_LOADER: require('../assets/lottie/screenLoader.json'),
    BOT: require('../assets/lottie/bot.json'),
})

//Fonts Constants
/*
If want to replace fonts then replace fonts at './src/assets/fonts/'
Make sure react-native.config.js files available on projects root folder with
module.exports = {
    project: {
        ios: {},
        android: {}
    },
    assets: ['./src/assets/fonts/'],
}
Then run "npx react-native-asset"
*/
export const FONTS = Object.freeze({
    BLACK: 'Nunito-Black',
    EXTRA_BOLD: 'Nunito-ExtraBold',
    BOLD: 'Nunito-Bold',
    SEMI_BOLD: 'Nunito-SemiBold',
    MEDIUM: 'Nunito-Medium',
    REGULAR: 'Nunito-Regular',
    LIGHT: 'Nunito-Light',
    ITALIC: 'Nunito-Italic',
});

export const firebaseConfig = {
    apiKey: "AIzaSyDOre2o2CQeG0AkrXktnJR6dQkGQNwy00w",
    authDomain: "jmbfx-751c8.firebaseapp.com",
    databaseURL: "https://jmbfx-751c8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jmbfx-751c8",
    storageBucket: "jmbfx-751c8.appspot.com",
    messagingSenderId: "425403590015",
    appId: "1:425403590015:web:3d19fca088edc6e50ba64a"
};