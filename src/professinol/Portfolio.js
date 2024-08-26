

import { Button, TextInput } from "../components";

import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, FlatList, } from 'react-native';
import React, { useState } from 'react';
import { responsiveWidth } from "react-native-responsive-dimensions";
import { COLORS } from "../constants";
import DocumentPicker from 'react-native-document-picker';







export const Portfolio = () => {
    const [portfolioFields, setPortfolioFields] = useState([
      { id: Date.now(), link: '', portfolio_title: '', details: '', description: '', image: null }
    ]);
  
    const addPortfolioField = () => {
      setPortfolioFields([...portfolioFields, { id: Date.now(), link: '', portfolio_title: '', details: '', description: '', image: null }]);
    };
  
    const removePortfolioField = (id) => {
      setPortfolioFields(portfolioFields.filter(field => field.id !== id));
    };
  
    const updatePortfolioField = (id, key, value) => {
      setPortfolioFields(portfolioFields.map(field => 
        field.id === id ? { ...field, [key]: value } : field
      ));
    };
  
    // const pickImage = async (id) => {
    //   ImagePicker.launchImageLibrary(
    //     {
    //       mediaType: 'photo',
    //     },
    //     (response) => {
    //       if (response.assets && response.assets.length > 0) {
    //         const imageUri = response.assets[0].uri;
    //         updatePortfolioField(id, 'image', imageUri);
    //       }
    //     }
    //   );

    
      const selectorDoc = async () => {
        try {
          const doc = await DocumentPicker.pick();
          console.log(doc); // Log the document details
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            console.log('User canceled the upload', err);
          } else {
            console.log(err);
          }
        }
      };


    



  
    const renderPortfolioItem = ({ item, index }) => (
      <View key={item.id} style={stylepro.card}>
        <View style={stylepro.cardHeader}>
          <Text style={stylepro.cardTitle}>Portfolio {index + 1}</Text>
          <TouchableOpacity onPress={() => removePortfolioField(item.id)}>
            <Text style={stylepro.removeButton}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={stylepro.inputContainer}>
          <TextInput
            // style={styles.input}
            placeholder="Online link of portfolio"
            value={item.link}
            onChangeText={(text) => updatePortfolioField(item.id, 'link', text)}
          />
          <TextInput
            // style={styles.input}
            placeholder="Title"
            value={item.portfolio_title}
            onChangeText={(text) => updatePortfolioField(item.id, 'portfolio_title', text)}
          />
          <TextInput
            // style={styles.input}
            placeholder="Project Details"
            value={item.details}
            onChangeText={(text) => updatePortfolioField(item.id, 'details', text)}
          />
          <TextInput
            // style={styles.input}
            placeholder="Description"
            value={item.description}
            onChangeText={(text) => updatePortfolioField(item.id, 'description', text)}
          />
          {/* <TouchableOpacity style={stylepro.uploadButton} onPress={() => pickImage(item.id)}>
          {/* {item.image && (
            <Image source={{ uri: item.image }} style={stylepro.image} />
          )} */}
            {/* <Text style={stylepro.uploadButtonText}>Click to upload image</Text>
          </TouchableOpacity> */} 
         <TouchableOpacity style={stylepro.uploadButton} onPress={()=>selectorDoc()}>
          <Text style= {stylepro.uploadButtonText} >Click to upload image</Text>

          </TouchableOpacity>
         
         
         
         
        </View>
      </View>
    );
  
    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={stylepro.container}
      >
        <Text style={stylepro.heading}>Portfolio</Text>
        {/* <View style={stylepro.divider} /> */}
        <FlatList
          data={portfolioFields}
          renderItem={renderPortfolioItem}
          keyExtractor={item => item.id.toString()}
        />
        {/* <TouchableOpacity >
          {/* <Text>+ Add More Portfolio</Text> */}
          {/* <Button display="bottom" style={{ borderRadius: 0 }} name="+more Portfolio" onPress={addPortfolioField} /> */}
        {/* </TouchableOpacity> */} 

        <TouchableOpacity style={stylepro.uploadButton}  name ='+more Portfolio' onPress={addPortfolioField}>
          <Text style={stylepro.addButtonText}>+more portolio</Text>
       </TouchableOpacity>

      </KeyboardAvoidingView>
    );
  };
  
   { Portfolio}
  
  const stylepro = StyleSheet.create({
    container: {
      flex:1,
       paddingHorizontal: responsiveWidth(0),
       backgroundColor: COLORS.PRIMARY,
      
      
  
    },
    heading: {
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 16,
      color:'black',
    },
   
    card: {
      //  backgroundColor: '#FFFFFF',
      // borderRadius: 8,
      //  padding: 16,
      // marginBottom: 16,
      elevation: 1,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // marginBottom: 16,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color:'#000000'
    },
    removeButton: {
      fontSize:12,
      fontWeight: 'bold',
      color: '#000000',
      margin:9
    },
    inputContainer: {
      flexDirection: 'column',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 8,
      marginBottom: 16,
    },
    uploadButton: {
        
      marginTop: 16,
      borderStyle: 'dashed',
      borderStyle: 'dotted',

            //  borderColor: 'rgba(227,236,255,0.5)',
              // backgroundColor: 'rgba(227,236,255,0.5)',
          },
    
    uploadButtonText: {
      color: '#000000',
       fontWeight: 'bold',
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 8,
      marginTop: 16,

    },
    addButton: {
      backgroundColor: '#007AFF',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
    },
    addButtonText: {
        
        color:'#000000',
        marginLeft:'auto',
        marginRight:9
          }
    
  });
  
  {Portfolio}
