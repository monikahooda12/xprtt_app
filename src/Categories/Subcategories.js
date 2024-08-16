// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { COLORS } from '../constants';
// import { setselectedService } from '../redux/categories/categorySlice';

// const { width, } = Dimensions.get('window');
// const cardWidth = (width - 45) / 2; // 15px padding on each side

// const Subcategories = ({ route, navigation }) => {
//   const [servicesData, setServicesData] = useState([]);
//   const categories = useSelector(state => state.categories.categories);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const getServices = categories?.find(category => category.id === route?.params?.id);
//     if (getServices) {
//       const data = getServices.child || getServices.services || [];
//       setServicesData(data);
//     } else {
//       setServicesData([]);
//     }
//   }, [categories, route?.params?.id]);

//   const handleServicePress = (service) => {
//     dispatch(setselectedService(service));
//     navigation.navigate('SuperSubchild');
//   };

//   const renderServiceCard = ({ item: service }) => (
   
//     <TouchableOpacity 
//       style={styles.serviceCardWrapper}
//       onPress={() => handleServicePress(service)}
//     >
//       <View style={styles.serviceCard}>
//         <Image
//           source={{ uri: service.icon }}
//           style={styles.serviceIcon}
//           resizeMode="cover"
//         />
//         <Text style={styles.serviceTitle} numberOfLines={1} ellipsizeMode="tail">
//           {service.name || 'Unnamed Service'}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Our Service</Text>
//       <FlatList
//         data={servicesData}
//         renderItem={renderServiceCard}
//         keyExtractor={(item, index) => item.id || index.toString()}
//         numColumns={2}
//         columnWrapperStyle={styles.columnWrapper}
//         contentContainerStyle={styles.flatListContent}
//         ListEmptyComponent={<Text style={styles.noDataText}>No service available</Text>}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     padding: 15,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginBottom: 15,
//   },
//   flatListContent: {
//     paddingBottom: 20,
//   },
//   columnWrapper: {
//     justifyContent: 'space-between',
//   },
//   serviceCardWrapper: {
//     width: cardWidth,
//     marginBottom: 15,
//     height:'auto',
//   },
//   serviceCard: {
//     width: '100%',
//     borderRadius: 10,
//     overflow: 'hidden',
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   serviceIcon: {
//     width: '100%',
//      height: 120,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   serviceTitle: {
//     padding: 10,
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#000000',
//   },
//   noDataText: {
//     fontSize: 18,
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default Subcategories;


    import React, { useState } from 'react';
    import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
    import Slider from '@react-native-community/slider';



    const Userfilter = () => {
      const [experience, setExperience] = useState(12);
      const [gender, setGender] = useState('Male');
      const [language, setLanguage] = useState('Hindi');
      const [location, setLocation] = useState('Dehradun');

      return (
        <View style={styles.container}>
    <Text style={styles.simpletext}>Select Category</Text>
          <Text style={styles.header}>Category</Text>
          <Text style={styles.subheader}>Graphic & Design</Text>
        
            
          <Text style={styles.simpletext}>Select Experience you need</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.label}>Experience</Text>
          <Text style={styles.sliderValue}>{experience}yrs</Text>
          </View>
          
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={20}
            step={1}
            value={experience}
            onValueChange={setExperience}
            minimumTrackTintColor="#6366F1"
            thumbTintColor="#6366F1"
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
          <Text style={styles.label}>Location</Text>
          <Text style={styles.sliderValue}>{location}</Text>
          </View>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter Location"
          />

        
        

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.clearAll}>Clear all</Text>
          </TouchableOpacity>
        </View>
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
