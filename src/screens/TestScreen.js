import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, BackHandler, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../CustomModal';
import { Referral } from '../screens';

export const TestScreen = () => {

  return (
    <View>
      <Referral />
    </View>
  );
};
