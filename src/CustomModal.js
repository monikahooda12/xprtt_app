import React from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';

const CustomModal = ({ visible, onRequestClose }) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="fade"
      transparent={true}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20 }}>
          <Text>This is a modal</Text>
          <TouchableOpacity onPress={onRequestClose}>
            <Text>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
