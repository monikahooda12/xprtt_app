import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const Chatbot = () => {
  return (

    <View style={{ flex: 1 }}>
      <WebView
    javaScriptEnabled
    userAgent="Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3714.0 Mobile Safari/537.36"
    source={{ html:`
    <script src="https://code.tidio.co/mtp4fucoayid4imrzybozaelzhmqopgm.js" async></script>
    `}}
   />
    </View>
  );
};

export default Chatbot;