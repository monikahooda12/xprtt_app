
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
// import Slider from '@react-native-community/slider';
import { httpRequest } from '../api/http';
import { API } from '../constants';
import MultiSlider from '@ptomasroos/react-native-multi-slider';



const Userfilter = ({ onClose, onFilterApplied }) => {
  const [minExperience, setMinExperience] = useState(0);
  const [maxExperience, setMaxExperience] = useState(12);
  // const [experience, setExperience] = useState(12);
  const [gender, setGender] = useState('Male');
  const [language, setLanguage] = useState('Hindi');
  const [state, setstate] = useState('Dehradun');

  const handleClearAll = () => {
    setMinExperience(0);
    setMaxExperience(0);                    
    // setExperience(0);
    setGender('');
    setLanguage('');
    setstate('');
  };

  const fetchFilteredUsers = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: '0',
        min_exp: minExperience,
        max_exp: maxExperience,  
        gender: gender,
        //  state
      }).toString();

      const response = await httpRequest({
        url: `${API.USERS}?${queryParams}`,
        method: 'GET',
      });

      // console.log('???????????????????????????', JSON.stringify(response));
      onFilterApplied(response?.data?.list || []); // Call the onFilterApplied callback
    } catch (error) {
      console.error('Error fetching filtered users:', error);
      Alert.alert('Error', 'Failed to fetch filtered users. Please try again.');
    }
  };

  const handleApplyFilters = () => {
    fetchFilteredUsers();
    onClose(); // Close the filter modal after applying filters
  };





  return (
    <ScrollView>
    <View style={styles.container}>
<Text style={styles.simpletext}>Select Category</Text>
      <Text style={styles.header}>Category</Text>
      <Text style={styles.subheader}>Graphic & Design</Text>
    
        
      <Text style={styles.simpletext}>Select Experience you need</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={styles.label}>Experience</Text>
      <Text style={styles.sliderValue}>{minExperience}-{maxExperience}yrs</Text>
      </View>
      <MultiSlider
          values={[minExperience, maxExperience]}
          onValuesChange={values => {
            setMinExperience(values[0]);
             setMaxExperience(values[1]);
            
          }}
          min={0}
          max={20}
          step={1}
          selectedStyle={{ backgroundColor: '#6366F1' }}
          unselectedStyle={{ backgroundColor: '#E5E7EB' }}
          markerStyle={{ backgroundColor: '#6366F1' }}
        />

      <Text style={styles.simpletext}>Select Gender</Text>
<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={styles.label}>Gender</Text>
      <Text style={styles.sliderValue}> {gender}</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, gender === 'Female' && styles.selectedButton]}
          onPress={() => setGender('Female')}>
          <Text style={styles.buttonText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, gender === 'Male' && styles.selectedButton]}
          onPress={() => setGender('Male')}>
          <Text style={styles.buttonText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, gender === 'Other' && styles.selectedButton]}
          onPress={() => setGender('Other')}>
          <Text style={styles.buttonText}>Other</Text>
        </TouchableOpacity>
      </View>
<Text style={styles.simpletext}>Select the language you’re comfortable </Text>
<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={styles.label}>Language</Text>
      <Text style={styles.sliderValue}>{language}</Text>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, language === 'Hindi' && styles.selectedButton]}
          onPress={() => setLanguage('Hindi')}>
          <Text style={styles.buttonText}>Hindi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, language === 'English' && styles.selectedButton]}
          onPress={() => setLanguage('English')}>
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, language === 'Other' && styles.selectedButton]}
          onPress={() => setLanguage('Other')}>
          <Text style={styles.buttonText}>Other</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.simpletext}>Select Suitable Location</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={styles.label}>state</Text>
      <Text style={styles.sliderValue}>{state}</Text>
      </View>
      <TextInput
        style={styles.input}
        value={state}
        onChangeText={setstate}
        placeholder="Enter State"
      />

    
    

      <TouchableOpacity style={styles.submitButton} onPress={handleApplyFilters}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleClearAll}>
        <Text style={styles.clearAll}>Clear all</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subheader: {
    color: '#6B7280',
    marginBottom: 20,
  },
  selectedInfo: {
    backgroundColor: '#E5E7EB',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  selectedText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    //  marginTop: 2,
    marginBottom: 15,
  },
  slider: {
    width: '100%',
    height: 10,
  },
  sliderValue: {
    // alignSelf: 'flex-end',
    color: '#6366F1',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
width:104,
height:34,
    borderColor: '#D1D5DB',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  buttonText: {
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#111827',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  clearAll: {
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 10,
  },

  simpletext:{
    marginTop:20,marginBottom:0,color:'#BEC2C7'
  }
});

export default Userfilter;











