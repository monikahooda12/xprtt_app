import { TextInput } from "../components";

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS } from "../constants";
import { CustomText } from "../components/textInputs/text";








export const Education = () => {
    const [educationFields, setEducationFields] = useState([{ degree: '', university: '', subjects: '', passing_year: '' }]);
  
    const addEducationField = () => {
      setEducationFields([...educationFields, { degree: '', university: '', subjects: '', passing_year: '' }]);
    };
  
    const removeEducationField = (index) => {
      const newEducationFields = [...educationFields];
      newEducationFields.splice(index, 1);
      setEducationFields(newEducationFields);
    };
  
    const updateEducationField = (index, key, value) => {
      const newEducationFields = [...educationFields];
      newEducationFields[index][key] = value;
      setEducationFields(newEducationFields);
    };
  
    return (
      <ScrollView>
      <Text style={styles.heading}>Education</Text>
      {/* <View style={styles.divider} /> */}
      {educationFields.map((field, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Education {index + 1}</Text>
            {/* <FontAwesome name="close" size={24} color="black" onPress={() => removeEducationField(index)} /> */}
            <TouchableOpacity onPress={() => removeEducationField(index)}>
              <Text style={{ color: '#000000',marginRight:9 }}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
          <CustomText>Degree</CustomText>
            <TextInput
              placeholder="Degree Name"
              // style={styles.input}
              value={field.degree}
              onChangeText={(text) => updateEducationField(index, 'degree', text)}
            />
             <CustomText>School/university</CustomText>
            <TextInput
              placeholder="School/University"
              // style={styles.input}
              value={field.university}
              onChangeText={(text) => updateEducationField(index, 'university', text)}
            />
             <CustomText>Field of study/Subjects</CustomText>
            <TextInput
              placeholder="Field of study/Subjects"
              // style={styles.input}
              value={field.subjects}
              onChangeText={(text) => updateEducationField(index, 'subjects', text)}
            />
             <CustomText>Passing Year</CustomText>
            <TextInput
              placeholder="Passing Year"
              // style={styles.input}
              value={field.passing_year}
              onChangeText={(text) => updateEducationField(index, 'passing_year', text)}
            />
          </View>
        </View>
      ))}
       <TouchableOpacity style={styles.addButton} onPress={addEducationField}>
          <Text style={styles.addButtonText}>+ Add More Education</Text>
        </TouchableOpacity>
    </ScrollView>
  );
  };
  
  
  const styles = StyleSheet.create({
card: {
  backgroundColor: 'transparent',
        // backgroundColor:COLORS.PRIMARY_LIGHT,
        // borderWidth: 0.2,
        // borderColor: COLORS.DESCRIPTION,
        // padding: 20,
    },
    title: {
        fontFamily: FONTS.BOLD,
        fontSize: 16,
        color: 'black',
    },
    subTitle: {
        fontFamily: FONTS.BOLD,
        color: 'gray',
    },
    heading: {
      fontSize: 15,
      fontWeight: 'bold',
      color:'black',
    },
    
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
      color:'black',
    },
    cardTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color:'black',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      // gap: 1,
    },
   
    addButton: {
      marginTop: 16,
      borderColor: 'rgba(227,236,255,0.5)',
    //   backgroundColor: 'rgba(227,236,255,0.5)',
    },
    addButtonText:{
  marginLeft:'auto',
  color:'#000000'
    }
  });
  