import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "../components";
import { useState } from "react";
import { CustomText } from "../components/textInputs/text";
// import { CommonStyles } from "../styles/styles";

export const Language = () => {
    const [user, setUser] = useState({});
    const handleInputChange = (key, value) => {
        setUser(prevData => ({ ...prevData, [key]: value }));
    };
    return (
        <View>
            <Text style={style.heading}>Language</Text>
            <CustomText>Language</CustomText>
            <TextInput label="language" value={user.language} onChangeText={text => handleInputChange('language', text)} />
            <CustomText>Skill</CustomText>
            <TextInput label="skill" value={user.language} onChangeText={text => handleInputChange('skill', text)} />
        </View>
    );
};




const style = StyleSheet.create({
    container: {
      // flex: 1,
      // padding: 16,
    },
    heading: {
      fontSize: 15,
      fontWeight: 'bold',
      color:'black',
    },
    divider: {
      width: '20%',
      height: 2,
      backgroundColor: 'gray',
      marginVertical: 8,
    },
    card: {
      borderRadius: 8,
      padding: 16,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      color:'white',
    },
    cardTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color:'white',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      padding: 8,
      marginBottom: 8,
    },
    addButton: {
      marginTop: 16,
      borderColor: 'rgba(227,236,255,0.5)',
      backgroundColor: 'rgba(227,236,255,0.5)',
    },
    addButtonText:{
  textAlign:'center',
  color:'#FFFFFF'
    }
  });

  {Language};