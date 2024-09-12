import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { COLORS, FONTS } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

let successToastFunction, errorToastFunction;

export const successToast = (message) => {
  if (successToastFunction) {
    successToastFunction(message);
  }
};

export const errorToast = (message) => {
  
  if (errorToastFunction) {
    errorToastFunction(message);
  }
};

export const Toaster = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  const insets = useSafeAreaInsets();

  const onDismissSnackBar = () => {
    setVisible(false);
    setMessage('');
  }

  successToastFunction = (message) => {
    setMessage(message);
    setType('success');
    setVisible(true);
  };

  errorToastFunction = (message) => {
    setMessage(message);
    setType('error');
    setVisible(true);
  };

  return (
    <Snackbar
            wrapperStyle={{ top: 0, paddingTop: insets.top }}
            duration={Snackbar.DURATION_SHORT}
            children={<Text style={{ fontFamily: FONTS.BOLD, color: type === 'success' ? COLORS.BLACK : COLORS.WHITE }}>{message}</Text>}
            style={{ backgroundColor: type === 'success' ? COLORS.SECONDARY : COLORS.RED }}
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
                labelStyle: { fontWeight: '600' },
                label: 'Ok',
                textColor: type === 'success' ? COLORS.BLACK : COLORS.WHITE,
                onPress: () => { },
            }}
        />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    zIndex: 999,
  },
});







