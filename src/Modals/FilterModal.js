
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { httpRequest } from '../api/http';
import { API } from '../constants';
const GOOGLE_API_KEY = 'AIzaSyD8y4F3DecFx7ayX9ECDwAsOPnaLJb8QqU'; // Your Google API Key

const Userfilter = ({ onClose, onFilterApplied }) => {
  const [minExperience, setMinExperience] = useState(0);
  const [maxExperience, setMaxExperience] = useState(12);
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('');
  const [state, setState] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories,setCategories] =  useState([]);
  const [payload, setPayload] = useState({
    currentPage: 0,
    totalPages: 0,
    totalCount: 0,
  });

  useEffect(() => {
    fetchFilteredUsers();
  }, [payload.currentPage]);



  const handleApplyFilters = () => {
    fetchFilteredUsers().then((filteredUsers) => {
      onFilterApplied(filteredUsers); // Pass the filtered users to the parent component
      onClose(); // Close the filter modal after applying filters
    });
  };


  const handleClearAll = () => {
    setMinExperience(0);
    setMaxExperience(0);
    setGender('');
    setLanguage('');
    setState('');
    setCategories ([]);
  };

  const fetchFilteredUsers = async () => {
    setLoading(true);
    
    try {
      const filterParams = {
        page: 0,
          gender: gender,
          min_exp: minExperience.toString(),
          max_exp: maxExperience.toString(),
          state,
      };

      console.log('filterParams', filterParams)

      const response = await httpRequest({
        url: API.USERS,
        method: 'GET',
        params:filterParams,
      });

      console.log("response------value---in filter page",response.data)

      if (response.data && Array.isArray(response.data.list)) {
        const users = response.data.list;
        const totalPages = response.data.totalPages;
        const currentPage = response.data.currentPage;
        const totalCount = response.data.totalCount;

      console.log('users', users)

        setUsers(users);
        setPayload({ totalPages, currentPage, totalCount, users });
        onFilterApplied(users)
        // console.log('Filtered Users:', users);
        setLoading(false);
      } else {
        console.error("Invalid API response format:", response);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching filtered users:', error);
      Alert.alert('Error', 'Failed to fetch filtered users. Please try again.');
      setLoading(false);
    }
  };


    // Function to fetch state from location

    function searchPlaces(keyword, country) {
      // const apiKey = vars.gcp_key;
      const regionParam = country
        ? `&region=${encodeURIComponent(country)}`
        : '&region=ca';
      const countryRestrictions = '&components=country:ca';
      const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${keyword}&key=${'AIzaSyBm1sjZor8Z1jKqBGYEBdeCfXrTtICgeXQ'}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log("locationdata...",data)
          // if (data.status === 'OK') {
          //   const placeIds = data.predictions.map(
          //     prediction => prediction.place_id,
          //   );
          //   // Fetch details for each place using Geocoding API
          //   return Promise.all(
          //     placeIds.map(placeId => fetchPlaceDetails(placeId, apiKey)),
          //   );
          // } else {
          //   console.error('Error:', data.status);
          // }
        })
        // .then(detailsArray => {
        //   // Extract postal codes from detailsArray
        //   const postalCodeResults = detailsArray
        //     .filter(details =>
        //       details.address_components.some(component =>
        //         component.types.includes('postal_code'),
        //       ),
        //     )
        //     .map(details => details.formatted_address);
  
        //   setSearchedData(prev => [...prev, ...postalCodeResults]);
        // })
        .catch(error => console.error('Error:', error));
    }
  
   
    function handlePlacesSearch(text) { 
      setState(text)
      setTimeout(function () {
      if (text?.length > 3) {
        searchPlaces(text);
      }
    }, 200);
  }

  // const handleApplyFilters = () => {
  //   fetchFilteredUsers();
  //   onClose(); // Close the filter modal after applying filters
  // };

  // Your component UI with filter options remains unchanged
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text style={styles.simpletext}>Select Category</Text> */}
        {/* <Text style={styles.header}>Category</Text> */}
        {/* <Text style={styles.subheader}>Graphic & Design</Text> */}

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
            {/* <Text style={styles.buttonText}>Female</Text> */}
            <Text style={[styles.buttonText, gender === 'Female' && styles.selectedButtonText]}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, gender === 'Male' && styles.selectedButton]}
            onPress={() => setGender('Male')}>
                <Text style={[styles.buttonText, gender === 'Male' && styles.selectedButtonText]}>Male</Text>
            {/* <Text style={styles.buttonText}>Male</Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, gender === 'Other' && styles.selectedButton]}
            onPress={() => setGender('Other')}>
               <Text style={[styles.buttonText, gender === 'Other' && styles.selectedButtonText]}>Other</Text>
            {/* <Text style={styles.buttonText}>Other</Text> */}
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
            {/* <Text style={styles.buttonText}>Hindi</Text> */}
            <Text style={[styles.buttonText, language === 'Hindi' && styles.selectedButtonText]}>Hindi</Text>
  </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, language === 'English' && styles.selectedButton]}
            onPress={() => setLanguage('English')}>
            {/* <Text style={styles.buttonText}>English</Text> */}
            <Text style={[styles.buttonText, language === 'English' && styles.selectedButtonText]}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, language === 'Other' && styles.selectedButton]}
            onPress={() => setLanguage('Other')}>
            {/* <Text style={styles.buttonText}>Other</Text> */}
            <Text style={[styles.buttonText, language === 'Other' && styles.selectedButtonText]}>Other</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.simpletext}>Select Suitable Location</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.label}>State</Text>
          <Text style={styles.sliderValue}>{state}</Text>
        </View>
        <TextInput
         style={styles.input}
         value={state}
        //  onChangeText={text => {
        //    setState(text);
          //  fetchStateFromLocation(text); // Fetch state data when input changes
          onChangeText={(text) => {
            handlePlacesSearch(text);
          }}
        
         
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
    marginTop:80,
    padding: 20,
     backgroundColor: 'white',
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
    marginBottom: 15,
  },
  sliderValue: {
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
    width: 104,
    height: 34,
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
  simpletext: {
    marginTop: 20,
    marginBottom: 0,
    color: '#BEC2C7',
  },
  buttonText: {
    color: '#374151',
  },
  selectedButtonText: {
    color: 'white', // Text color for selected buttons
  },

  
});

export default Userfilter;



