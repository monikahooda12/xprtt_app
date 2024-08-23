import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons
import {  SearchBar } from '../components/card';
import { COLORS, ICONS, LOCAL_DB } from '../constants';


const BlogsScreen = () => {
    const [image,setImage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const user = await getLocalData(LOCAL_DB.USER);
            setImage(user.profile_image);
    
           
        };
        fetchData();
        
    },[]);
    console.log("image",image)
    
     


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Blogs</Text>
       
      </View>
      
      <View style={styles.menuContainer}>
        <Text style={styles.menuItem}>Business</Text>
        <Text style={styles.menuItem}>Podcast</Text>
        <Text style={styles.menuItem}>Study case</Text>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>+ Create</Text>
        </TouchableOpacity>
        <TouchableOpacity >
           {/* <Image source={require('../assets/icons/account.png')} style={styles.icon} /> */}
           <View style={{ ...styles.imageContainer, overflow: 'hidden' }}>
                                <Image
                                    source={image ? { uri: image } : ICONS.AVATAR}
                                    style={{ height: 40, width: 40, resizeMode: 'contain' }}
                                />
                            </View>

         </TouchableOpacity>
        
      </View>
      <SearchBar/>
      
       
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
     padding: 16,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    borderRadius: 100,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal:13,
},

  header: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
     alignItems: 'center',
      marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
     textAlign:'center',
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
     marginBottom: 16,
  },
  menuItem: {
    size:12,
    marginRight: 12,
    fontSize: 16,
    left:6,
  },
  createButton: {
     backgroundColor: '#6C63FF',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    },
    profileicon:{
        // backgroundColor: '#6C63FF',
        paddingVertical: 6,
        paddingHorizontal:16,
        borderRadius: 6,  
    }
    
 
  
});

export default BlogsScreen;