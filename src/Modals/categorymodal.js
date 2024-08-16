// Modal.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { COLORS } from '../constants';

const CategoryModal = ({ visible, onClose, services, selectedServices, label,onCheckboxToggle }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
        
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <View>

        <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{label}</Text>
          <View style={{width:50,backgroundColor:'#DCDCDC',height:1,alignSelf:'center',marginBottom:10}}/>
              </View>
        
          
          <FlatList
            data={services}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={!!selectedServices[item.id]}
                  onValueChange={() => onCheckboxToggle(item.id)}
                  tintColors={{ true: '#6C63FF', false: '#999' }} // Red color for both checked and unchecked states
                />
                <Text style={styles.checkboxLabel}>{item.name}</Text>
              </View>
            )}
          />
          
            <TouchableOpacity
            style={{backgroundColor:'#6C63FF',alignItems:'center',justifyContent:'center',padding:10,borderRadius:10,width:'50%',alignSelf:'center',}}>
           
              <Text>Apply</Text>
              </TouchableOpacity>
                   
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
     paddingHorizontal: 20,
     paddingBottom:20,
  },
  modalTitle: {
    fontSize: 20,
     fontWeight: 'bold',
    marginBottom: 10,
    // borderBottomWidth:1,
    // color:"#DCDCDC",
    textAlign:'center'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    // padding: 10,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 5,
    alignItems: 'flex-end'
  },
  closeButtonText: {
    color: '#6C63FF',
    fontSize: 16,
  },
});

export default CategoryModal;
