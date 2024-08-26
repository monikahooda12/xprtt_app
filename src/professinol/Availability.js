import { StyleSheet, Text, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react';
import { TextInput } from '../components/textInputs/textInput';

export const Availability = () => {
    const [selectedDays, setSelectedDays] = useState({
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    });
  
    return (
      <View style={style.container}>
        <Text style={style.heading}>Availability</Text>
        <View style={style.divider} />
  
        {Object.entries(selectedDays).map(([day, isOpen]) => (
          <View key={day} style={style.row}>
            <Text style={style.day}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
            <View style={style.checkboxContainer}>
              <CheckBox
                value={isOpen}
                onValueChange={(isChecked) => {
                  setSelectedDays((prevSelectedDays) => ({
                    ...prevSelectedDays,
                    [day]: isChecked,
                  }));
                }}
              />
              <Text style={style.checkboxLabel}>
                {isOpen ? "Available" : "Unavailable"}
              </Text>
            </View>
          </View>
        ))}
  
        {/* <View style={styless.bioContainer}>
          <Text style={styless.bioLabel}>Bio</Text>
          <TextInput
            style={styles.bioInput}
            maxLength={50}
            multiline
            numberOfLines={2}
            placeholder="Enter your bio"
          /> */}
        {/* </View> */}
      </View>
    );
  };
  
  const style = StyleSheet.create({
    container: {
      padding: 20,
    },
    heading: {
      fontSize: 15,
      fontWeight: 'bold',
      // backgroundColor:'white'
      color:'black',
    },
    divider: {
      width: '20%',
      height: 2,
      // backgroundColor: 'whites',
      marginVertical: 10,
      
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    day: {
      flex: 1,
      fontSize: 18,
      color:'black'
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
     
    },
    checkboxLabel: {
      marginLeft: 8,
       color:'#000000'
    },
   
  });
  
  export default Availability;
  
  
   {Availability}