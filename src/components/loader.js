import React, { useRef, useState } from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import { COLORS } from '../constants';

let showLoaderFunction, hideLoaderFunction;

export const showLoader = () => {
  showLoaderFunction();
};

export const hideLoader = () => {
  hideLoaderFunction();
};

export const Loader = () => {

  const [visible, setVisible] = useState(false);

  showLoaderFunction = () => {
    setVisible(true);
  };

  hideLoaderFunction = () => {
    setVisible(false);
  };

  return (

    <Modal
      transparent={true}
      visible={visible}
      animationType='fade'>
      <View style={{ flex: 1, position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
        <ActivityIndicator size="large" color={COLORS.SECONDARY} />
      </View>
    </Modal>
  );
};