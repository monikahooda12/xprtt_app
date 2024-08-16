import React, { useState } from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import { COLORS, LOTTIE } from '../constants';
import AnimatedLottieView from 'lottie-react-native';

let loaderFunction;

export const screenLoading = (loading) => {
  loaderFunction(loading);
};

export const isScreenLoading = () => {
  return !!loaderFunction;
};

export const ScreenLoading = () => {

  const [visible, setVisible] = useState(false);

  loaderFunction = (loading) => {
    setVisible(loading);
  };

  if (!visible) {
    return null;
  }

  return (
    <View style={{
      backgroundColor:COLORS.PRIMARY,
      zIndex: 99, flex: 1,
      position: 'absolute',
      width: '100%', height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <AnimatedLottieView
        style={{ position: 'relative', width: '10%' }}
        source={LOTTIE.SCREEN_LOADER}
        autoPlay
        loop
      />
    </View>
  );
};