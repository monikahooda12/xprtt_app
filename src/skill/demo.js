import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure to install this package

const EditProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#999"
        />
      </View>

      

     

      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
 

  inputContainer: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  label: {
    color: '#999',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    color: '#000',
    paddingVertical: 8,
  },
  
  
  updateButton: {
    backgroundColor: '#7E57C2',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfile;