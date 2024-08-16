// import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const CustomText = ({ children }) => {
  return (
    <View>
      <Text style={styles.label}>{children}</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 6,
    color:'#000000'
  },
});
