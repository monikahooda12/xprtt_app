import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { API, httpRequest } from '../constants';

const FilterModal = ({ visible, onClose, onFilterApplied, initialFilters }) => {
  const [filters, setFilters] = useState(initialFilters || {});
  const genderOptions = ['Male', 'Female', 'Other'];

  const fetchFilteredUsers = async () => {
    try {
      const { min_exp = 0, max_exp = 20, gender = '', location = '' } = filters;
      const queryParams = new URLSearchParams({
        page: '0',
        min_exp: min_exp.toString(),
        max_exp: max_exp.toString(),
        gender,
        location,
      }).toString();

      const response = await httpRequest({
        url: `${API.USERS}?${queryParams}`,
        method: 'GET',
      });

      onFilterApplied(response?.data?.list || []);
    } catch (error) {
      console.error('Error fetching filtered users:', error);
    }
  };

  const handleApplyFilters = () => {
    fetchFilteredUsers();
    onClose();
  };

  const handleClearFilters = () => {
    setFilters({});
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>Xprrt</Text>

          <Text style={styles.labelText}>Experience</Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={20}
              step={1}
              value={filters.min_exp || 0}
              onValueChange={(value) => setFilters({ ...filters, min_exp: value })}
            />
            <Text style={styles.valueText}>Min: {filters.min_exp || 0} years</Text>
          </View>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={20}
              step={1}
              value={filters.max_exp || 20}
              onValueChange={(value) => setFilters({ ...filters, max_exp: value })}
            />
            <Text style={styles.valueText}>Max: {filters.max_exp || 20} years</Text>
          </View>

          <Text style={styles.labelText}>Gender</Text>
          <View style={styles.radioGroup}>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.squareButton}
                onPress={() => setFilters({ ...filters, gender: option.toLowerCase() })}
              >
                <View style={[
                  styles.square,
                  filters.gender === option.toLowerCase() && styles.squareSelected
                ]} />
                <Text style={[
                  styles.radioLabel,
                  filters.gender === option.toLowerCase() && styles.radioLabelSelected
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.filterInput}
            placeholder="Enter Location"
            value={filters.location || ''}
            onChangeText={(text) => setFilters({ ...filters, location: text })}
          />

          <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={handleClearFilters}>
            <Text style={styles.closeButtonText}>Clear Filters</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  labelText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  valueText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
    lineHeight: 50,
    textAlign: 'center',
  },
  dropdownStyle: {
    borderRadius: 5,
  },
  squareButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  square: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#666',
    marginRight: 10,
  },
  squareSelected: {
    backgroundColor: '#999',
  },
  radioLabel: {
    fontSize: 16,
    color: '#000',
  },
  radioLabelSelected: {
    color: '#666',
  },
  filterInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  applyButton: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default FilterModal;








// import React, { useState } from 'react';  
// import { StyleSheet, View, Text, Button, TextInput, Alert, Slider,Modal } from 'react-native';  

//  import Slider from '@react-native-community/slider'; 

// const  FilterModal  = () => {  
//   const [category, setCategory] = useState(null);  
//   const [experience, setExperience] = useState(12);  
//   const [gender, setGender] = useState('Male');  
//   const [language, setLanguage] = useState('Hindi');  
//   const [location, setLocation] = useState('');  

//   const handleSubmit = () => {  
//     Alert.alert('Selected Values',  
//       `Categories: ${category}\n` +  
//       `Experience: ${experience} yrs\n` +  
//       `Gender: ${gender}\n` +  
//       `Language: ${language}\n` +  
//       `Location: ${location}`  
//     );  
//   };  

//   const genderOptions = [  
//     { key: 1, label: 'Female' },  
//     { key: 2, label: 'Male' },  
//   ];  

//   const languageOptions = [  
//     { key: 1, label: 'Hindi' },  
//     { key: 2, label: 'English' },  
//     { key: 3, label: 'Other' },  
//   ];  

//   const categoryOptions = [  
//     { key: 1, label: 'Logo & Brand Identity' },  
//     { key: 2, label: 'Web & App Design' },  
//     { key: 3, label: 'Architecture & Building Design' },  
//   ];  

//   return (  
//     <View style={styles.container}>  
//       <Text style={styles.header}>Explore</Text>  

//       <Text style={styles.label}>Select the services you require:</Text>  
//       <Modal  
//         data={categoryOptions}  
//         initValue="Select a category"  
//         onChange={(option) => setCategory(option.label)}  
//       />  

//       <Text style={styles.label}>Select Experience (0-20 years):</Text>  
//       <Slider 
//         minimumValue={0}  
//         maximumValue={20}  
//         step={1}  
//         value={experience}  
//         onValueChange={setExperience}  
//         style={styles.slider}  
//       />  
//       <Text>{experience} yrs</Text>  

//       <Text style={styles.label}>Select Gender:</Text>  
//       <Modal  
//         data={genderOptions}  
//         initValue="Select Gender"  
//         onChange={(option) => setGender(option.label)}  
//       />  

//       <Text style={styles.label}>Select the language you're comfortable with:</Text>  
//       <Modal  
//         data={languageOptions}  
//         initValue="Select Language"  
//         onChange={(option) => setLanguage(option.label)}  
//       />  

//       <Text style={styles.label}>Select Suitable Location:</Text>  
//       <TextInput  
//         style={styles.input}  
//         placeholder="Enter Location"  
//         onChangeText={setLocation}  
//         value={location}  
//       />  

//       <Button title="Submit" onPress={handleSubmit} />  
//       <Button title="Clear All" onPress={() => {  
//         setCategory(null);  
//         setExperience(12);  
//         setGender('Male');  
//         setLanguage('Hindi');  
//         setLocation('');  
//       }} />  
//     </View>  
//   );  
// };  

// const styles = StyleSheet.create({  
//   container: {  
//     padding: 20,  
//     backgroundColor: '#fff',  
//     flex: 1,  
//     justifyContent: 'center',  
//   },  
//   header: {  
//     fontSize: 24,  
//     marginBottom: 20,  
//     textAlign: 'center',  
//   },  
//   label: {  
//     marginTop: 10,  
//     marginBottom: 5,  
//   },  
//   slider: {  
//     width: '100%',  
//     height: 40,  
//   },  
//   input: {  
//     height: 40,  
//     borderColor: 'gray',  
//     borderWidth: 1,  
//     marginBottom: 10,  
//     paddingLeft: 8,  
//   },  
// });  

// export default FilterModal;