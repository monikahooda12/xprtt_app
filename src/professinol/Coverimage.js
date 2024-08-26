// import { View, Text } from 'react-native';
// import React from 'react';
// import { Button } from '../components';
// import DocumentPicker from 'react-native-document-picker';

// const Coverimage = () => {
  
//   const selectorDoc = async () => {
//     try {
//       const doc = await DocumentPicker.pick();
//       console.log(doc); // Log the document details
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User canceled the upload', err);
//       } else {
//         console.log(err);
//       }
//     }
//   };

//   return (
//     <View>
//       <Text>Cover-image</Text>
//       <Button title="Select Document" onPress={selectorDoc} >add </Button>
//     </View>
//   );
// };

// export default Coverimage;










///////////////////////my code///////////
// import React, { useEffect, useState } from 'react';
// import { View, Text, Alert, StyleSheet, Image } from 'react-native';
// import { Button } from '../components';
// import DocumentPicker from 'react-native-document-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { httpRequest } from '../api/http'; 
// import { API, LOCAL_DB } from '../constants'; 

// const Coverimage = ({ navigation }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const response = await httpRequest({
//         url: API.PROFILE,
//         method: 'GET',
//       });
//       if (response.status === 200) {
//         const data = await response.json();
//       setUserData(response?.data);
//       await storeLocalData('user', response?.data);
//     } else {
//       console.error(`Error fetching user data - Status ${response.status}`); 
//     }
//    } catch (error) {
//       console.error('Error fetching user data: ', error);
//       Alert.alert('Error', 'Failed to fetch user data. Please try again.');
//     }
//   };

//   const storeLocalData = async (key, value) => {
//     try {
//       await AsyncStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//       console.error('Error storing data:', error);
//     }
//   };

//   const uploadImage = async () => {
//     if (!selectedImage) {
//       Alert.alert('Error', 'Please select an image first.');
//       return;
//     }

//     setIsLoading(true);

//     const formData = new FormData();
//     formData.append('cover_image', {
//       uri: selectedImage.uri,
//       type: selectedImage.type,
//       name: selectedImage.name,
//     });

//     try {
//       const response = await httpRequest({ 
//         method: 'POST', 
//         url: API.UPLOAD_COVER_IMAGE, 
//         data: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       console.log('Image upload response:', response);
      
//       // Update local user data with new cover image
//       const updatedUserData = { ...userData, cover_image: response.data.cover_image_url };
//       setUserData(updatedUserData);
//       await storeLocalData(LOCAL_DB.USER, updatedUserData);
      
//       Alert.alert('Success', 'Cover image updated successfully');
//       navigation.replace('DashboardNavigator');
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       Alert.alert('Error', 'Failed to upload cover image. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const selectImage = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.images],
//       });
//       console.log('Selected Image:', res);
//       setSelectedImage(res[0]);
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User canceled the upload', err);
//       } else {
//         console.error('DocumentPicker Error:', err);
//         Alert.alert('Error', 'Failed to select image. Please try again.');
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Cover Image</Text>
//       {selectedImage && (
//         <Image 
//           source={{ uri: selectedImage.uri }} 
//           style={styles.previewImage} 
//         />
//       )}
//       <Button title="Select Image" onPress={selectImage} disabled={isLoading} />
//       <Button title="Upload Cover Image" onPress={uploadImage} disabled={isLoading || !selectedImage} />
//       {isLoading && <Text style={styles.loadingText}>Uploading...</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   loadingText: {
//     marginTop: 10,
//     color: 'gray',
//   },
//   previewImage: {
//     width: 200,
//     height: 200,
//     marginBottom: 20,
//     resizeMode: 'cover',
//     borderRadius: 10,
//   },
// });

// export default Coverimage;


import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from '../components';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { httpRequest } from '../api/http'; 
import { API, LOCAL_DB } from '../constants'; 

const Coverimage = ({ navigation }) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await httpRequest({
        url: API.GET_PROFILE,
        method: 'GET',
      });
       if (response) {
        // const data = await response;
        //  console.log("data",response)
 setUserData(response.data);
 setSelectedImage({uri:response.data.profile_image})
        await storeLocalData('user', response.data);
       } else {
         console.error(`Error fetching user data - Status $`,JSON.stringify(response)); 

       }
    } catch (error) {
      console.error('Error fetching user data: ', error);
      Alert.alert('Error', 'Failed to fetch user data. Please try again.');
    }
  };

  const storeLocalData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    // formData.append('cover_image', {
    //   uri: selectedImage.uri,
    //   // type: selectedImage.type,
    //   // name: selectedImage.name,
    // });
 
    formData.append('file_name',selectedImage.uri)
    try {
      const response = await httpRequest({ 
        method: 'POST', 
        url: API.PROFILE_IMAGE_UPLOAD, 
        params: {
          cover_image: Image.uri,
        },
        
        data: formData,
        
      });
      
      console.log('Image upload response:', response);
      
      // Update local user data with new cover image
      const updatedUserData = { ...userData, cover_image: response.data.cover_image_url };
      setUserData(updatedUserData);
      await storeLocalData(LOCAL_DB.USER, updatedUserData);
      
      Alert.alert('Success', 'Cover image updated successfully');
      navigation.replace('DashboardNavigator');
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload cover image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log('Selected Image:', res);
      setSelectedImage(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the upload', err);
      } else {
        console.error('DocumentPicker Error:', err);
        Alert.alert('Error', 'Failed to select image. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cover Image</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={selectImage} disabled={isLoading}>
        {selectedImage ? (
          <Image 
            source={{ uri: selectedImage.uri }} 
            style={styles.previewImage} 
          />
        ) : (
          <Text style={styles.uploadButtonText}>Select Image</Text>
        )}
      </TouchableOpacity>
      <View style={{flex:1}}><Button 
        title="Upload Cover Image" 
        onPress={uploadImage} 
        disabled={isLoading || !selectedImage}
        style={styles.submitButton}
      /></View>
      {isLoading && <Text style={styles.loadingText}>Uploading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  uploadButton: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'dotted',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    flex:1
  },
  uploadButtonText: {
    fontSize: 18,
    color: 'blue',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  submitButton: {
    // backgroundColor: 'blue',
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    // borderRadius: 8,
  },
  loadingText: {
    marginTop: 15,
    color: 'gray',
    fontSize: 16,
  },
});

export default Coverimage;