
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
  const [location, setLocation] = useState('Dehradun');

  const handleClearAll = () => {
    setMinExperience(0);
    setMaxExperience(0);                    
    // setExperience(0);
    setGender('');
    setLanguage('');
    setLocation('');
  };

  const fetchFilteredUsers = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: '0',
        min_exp: minExperience.toString(),
        max_exp: maxExperience.toString(),  
        gender,
        location,
      }).toString();

      const response = await httpRequest({
        url: `${API.USERS}?${queryParams}`,
        method: 'GET',
      });

      console.log('filterurl', `${API.USERS}?${queryParams}`);
      onFilterApplied(response?.data?.list || []); // Call the onFilterApplied callback
      // console.log('???????????????????????????', JSON.stringify(response.data.list));
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
            setMaxExperience(values[20]);
          }}
          min={0}
          max={20}
          step={1}
          selectedStyle={{ backgroundColor: '#6366F1' }}
          unselectedStyle={{ backgroundColor: '#E5E7EB' }}
          markerStyle={{ backgroundColor: '#6366F1' }}
        />
{/*       
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={20}
        step={1}
        value={experience}
        onValueChange={setExperience}
        minimumTrackTintColor="#6366F1"
        thumbTintColor="#6366F1"
      /> */}
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
      <Text style={styles.label}>Location</Text>
      <Text style={styles.sliderValue}>{location}</Text>
      </View>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter Location"
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








// import React, { useState } from 'react';
// import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
// import Slider from '@react-native-community/slider';
// import { API, httpRequest } from '../constants';

// const FilterModal = ({ visible, onClose, onFilterApplied, initialFilters }) => {
//   const [filters, setFilters] = useState(initialFilters || {});
//   const genderOptions = ['Male', 'Female', 'Other'];

//   const fetchFilteredUsers = async () => {
//     try {
//       const { min_exp = 0, max_exp = 20, gender = '', location = '' } = filters;
//       const queryParams = new URLSearchParams({
//         page: '0',
//         min_exp: min_exp.toString(),
//         max_exp: max_exp.toString(),
//         gender,
//         location,
//       }).toString();

//       const response = await httpRequest({
//         url: `${API.USERS}?${queryParams}`,
//         method: 'GET',
//       });

//       onFilterApplied(response?.data?.list || []);
//     } catch (error) {
//       console.error('Error fetching filtered users:', error);
//     }
//   };

//   const handleApplyFilters = () => {
//     fetchFilteredUsers();
//     onClose();
//   };

//   const handleClearFilters = () => {
//     setFilters({});
//     onClose();
//   };

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.modalContainer}>
//         <ScrollView contentContainerStyle={styles.modalContent}>
//           <Text style={styles.modalTitle}>Xprrt</Text>

//           <Text style={styles.labelText}>Experience</Text>
//           <View style={styles.sliderContainer}>
//             <Slider
//               style={styles.slider}
//               minimumValue={0}
//               maximumValue={20}
//               step={1}
//               value={filters.min_exp || 0}
//               onValueChange={(value) => setFilters({ ...filters, min_exp: value })}
//             />
//             <Text style={styles.valueText}>Min: {filters.min_exp || 0} years</Text>
//           </View>
//           <View style={styles.sliderContainer}>
//             <Slider
//               style={styles.slider}
//               minimumValue={0}
//               maximumValue={20}
//               step={1}
//               value={filters.max_exp || 20}
//               onValueChange={(value) => setFilters({ ...filters, max_exp: value })}
//             />
//             <Text style={styles.valueText}>Max: {filters.max_exp || 20} years</Text>
//           </View>

//           <Text style={styles.labelText}>Gender</Text>
//           <View style={styles.radioGroup}>
//             {genderOptions.map((option) => (
//               <TouchableOpacity
//                 key={option}
//                 style={styles.squareButton}
//                 onPress={() => setFilters({ ...filters, gender: option.toLowerCase() })}
//               >
//                 <View style={[
//                   styles.square,
//                   filters.gender === option.toLowerCase() && styles.squareSelected
//                 ]} />
//                 <Text style={[
//                   styles.radioLabel,
//                   filters.gender === option.toLowerCase() && styles.radioLabelSelected
//                 ]}>
//                   {option}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           <TextInput
//             style={styles.filterInput}
//             placeholder="Enter Location"
//             value={filters.location || ''}
//             onChangeText={(text) => setFilters({ ...filters, location: text })}
//           />

//           <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
//             <Text style={styles.applyButtonText}>Apply Filters</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.closeButton} onPress={handleClearFilters}>
//             <Text style={styles.closeButtonText}>Clear Filters</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     margin: 20,
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   labelText: {
//     fontSize: 16,
//     marginBottom: 5,
//     fontWeight: 'bold',
//   },
//   valueText: {
//     fontSize: 14,
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   slider: {
//     width: '100%',
//     height: 40,
//   },
//   dropdown: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   dropdownText: {
//     fontSize: 16,
//     lineHeight: 50,
//     textAlign: 'center',
//   },
//   dropdownStyle: {
//     borderRadius: 5,
//   },
//   squareButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   square: {
//     width: 20,
//     height: 20,
//     borderRadius: 5,
//     borderWidth: 2,
//     borderColor: '#666',
//     marginRight: 10,
//   },
//   squareSelected: {
//     backgroundColor: '#999',
//   },
//   radioLabel: {
//     fontSize: 16,
//     color: '#000',
//   },
//   radioLabelSelected: {
//     color: '#666',
//   },
//   filterInput: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//   },
//   applyButton: {
//     backgroundColor: '#999',
//     borderRadius: 5,
//     padding: 10,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   applyButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   closeButton: {
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: '#007bff',
//     fontWeight: 'bold',
//   },
// });

// export default FilterModal;








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