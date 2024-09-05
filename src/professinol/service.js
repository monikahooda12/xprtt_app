import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button, SelectList } from "../components";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { CustomText } from '../components/textInputs/text';
import { SlideInDown } from 'react-native-reanimated';

const Service = () => {
    const [services, setServices] = useState([]);
    const [projectTypeModalVisible, setProjectTypeModalVisible] = useState(false);
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadServices();
        
    }, []);

    const loadServices = async () => {
        try {
            const savedServices = await AsyncStorage.getItem('services');
            if (savedServices !== null) {
                setServices(JSON.parse(savedServices));
            } else {
                setServices([{ title: '', project_type: 'hourly', category: '', min_price: '', max_price: '', description: '' }]);
            }
        } catch (error) {
            console.error('Error loading services:', error);
        }
    };

   


    const handleCategoryChange = (category) => {
        // Navigate to SearchResult page with the selected category as a parameter
        navigation.navigate('SearchResults', { category });
      };

    const saveServices = async (updatedServices) => {
        try {
            await AsyncStorage.setItem('services', JSON.stringify(updatedServices));
        } catch (error) {
            console.error('Error saving services:', error);
        }
    };

    const handleSubmit = async (values) => {
        console.log(values);
        await saveServices(values);
    };

    const handleAddService = () => {
        const updatedServices = [...services, { title: '', project_type: 'hourly', category: '', min_price: '', max_price: '', description: '' }];
        setServices(updatedServices);
        saveServices(updatedServices);
    };

    const handleRemoveService = (index) => {
        const updatedServices = services.filter((_, i) => i !== index);
        setServices(updatedServices);
        saveServices(updatedServices);
    };

    const handleProjectTypeChange = (value) => {
        updateServiceField(selectedServiceIndex, 'project_type', value);
        setProjectTypeModalVisible(false);
    };

    // const handleCategoryChange = (value) => {
    //     updateServiceField(selectedServiceIndex, 'category', value);
    //     setCategoryModalVisible(false);
    // };

    const updateServiceField = (index, field, value) => {
        const updatedServices = services.map((service, i) =>
            i === index ? { ...service, [field]: value } : service
        );
        setServices(updatedServices);
        saveServices(updatedServices);
    };

    return (
        <ScrollView style={styles.container}>
            {services.map((service, index) => (
                <View key={index} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Service {index + 1}</Text>
                        <TouchableOpacity onPress={() => handleRemoveService(index)}>
                            <Text style={styles.removeButton}>X</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                    <CustomText>Title Name</CustomText>
                        <TextInput
                            label="title name"
                            value={service.title}
                            onChangeText={(text) => updateServiceField(index, 'title', text)}
                            // style={styles.input}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Pressable onPress={() => {
                            setSelectedServiceIndex(index);
                            setProjectTypeModalVisible(true);
                        }}>
                            <View style={styles.pickerContainer}>
                                <Text style={styles.input}>{service.project_type === 'fixed' ? 'Fixed Project' : 'Hourly Based Project'}</Text>
                            </View>
                        </Pressable>
                    </View>

                    <View style={styles.inputContainer}>
                        <Pressable onPress={() => {
                            setSelectedServiceIndex(index);
                            setCategoryModalVisible(true);
                        }}>
                            <View style={styles.pickerContainer}>
                            
                                <Text style={styles.input}>{service.category || 'Select Category'}</Text>
                              
                            </View>
                        </Pressable>
                    </View>

                    <View style={styles.priceContainer}>
                        
                        <TextInput
                            style={{ flex: 1 }}
                            label="Min Price"
                            value={service.min_price}
                            onChangeText={(text) => updateServiceField(index, 'min_price', text)}
                            // style={styles.input}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            label="Max Price"
                            value={service.max_price}
                            onChangeText={(text) => updateServiceField(index, 'max_price', text)}
                            // style={styles.input}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                    <CustomText>Description</CustomText>
                        <TextInput
                            label="Description"
                            value={service.description}
                            onChangeText={(text) => updateServiceField(index, 'description', text)}
                            // style={styles.input}
                            multiline
                            numberOfLines={4}
                        />
                    </View>
                </View>
            ))}

            <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
                <Text style={styles.addButtonText}>+ Add More Service</Text>
            </TouchableOpacity>

            <Button
                title="Submit"
                onPress={() => handleSubmit(services)}
                style={{ marginTop: 16 }}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={projectTypeModalVisible}
                onRequestClose={() => setProjectTypeModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <SelectList onPress={() => handleProjectTypeChange('fixed')}>
                            <Text style={styles.modalOption}>Fixed Project</Text>
                        </SelectList>
                        <Pressable onPress={() => handleProjectTypeChange('hourly')}>
                            <Text style={styles.modalOption}>Hourly Based Project</Text>
                        </Pressable>
                        <Pressable onPress={() => setProjectTypeModalVisible(false)}>
                            <Text style={styles.modalOptionCancel}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={categoryModalVisible}
                onRequestClose={() => setCategoryModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            
                            {categories.map((category, index) => (
                                <Pressable key={index} onPress={() => handleCategoryChange(category)}>
                                    <Text style={styles.modalOption}>{category}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                        <Pressable onPress={() => setCategoryModalVisible(false)}>
                            <Text style={styles.modalOptionCancel}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
         paddingHorizontal: responsiveWidth(3),
         backgroundColor: COLORS.PRIMARY,
    },
    card: {
      backgroundColor: 'transparent',
        // padding: 10,
        marginBottom: 10,
         elevation: 0, // Optional shadow effect
         borderRadius: 0,
    },
    cardHeader: {
         marginLeft:5,
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color:'white'
    },
    removeButton: {
        fontSize: 15,
        marginTop:10,
        color: '#000000',
    },
    inputContainer: {
         marginBottom: 16,
    },
    input: {
        // borderWidth: 1,
        //  borderColor: '#ccc',
        //  borderRadius: 8,
        //  padding: 8,
        // marginBottom: 8,
        // color: "rgb(60,235,230)",
        color:'white',
    },
    addButton: {
        // backgroundColor: '#007AFF',
        // padding: 16,
        // borderRadius: 8,
         
    //   marginLeft:'auto',
        
    },
    addButtonText: {
        color: '#000000',
        fontWeight: 'bold',
        marginLeft:'auto',
    },
    pickerContainer: {
        // borderWidth: 1,
        // borderColor: '#ccc',
        // borderRadius: 8,
        // padding: 8,
        // alignItems: 'center',
        // marginBottom: 8,

        borderWidth: 1,
        borderColor: '#ccc',
        // borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#E0E0E0',
        marginHorizontal:5,
        

    },
    modalContainer: {
        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //  backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundColor:"#999"
    },
    modalContent: {
        backgroundColor: 'transparent',
        padding: 20,
        borderRadius: 8,
        width: '50%',
    },
    modalOption: {
        // fontSize: 18,
        paddingVertical: 10,
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: 8,
        borderRadius:8,
    },
    modalOptionCancel: {
        fontSize: 18,
        paddingVertical: 10,
        textAlign: 'center',
        color: 'red',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,

        
    },
});

export default Service;










// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, ScrollView, Button, Alert, StyleSheet } from 'react-native';

// import { useNavigation } from '@react-navigation/native';
// import { getLocalData, storeLocalData } from './utils'; // Adjust the path accordingly

// const Service = () => {
//   const [categories, setCategories] = useState([]);
//   const { control, handleSubmit, setValue, getValues } = useForm({
//     defaultValues: {
//       service: [{ title: '', category: '', min_price: '', max_price: '', description: '' }]
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'service'
//   });

//   const navigation = useNavigation();

//   useEffect(() => {
//     fetchCategories();
//     fetchUserData();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const catObj = await getLocalData('categories');

//       const categoriesList = catObj[0].child.map((child) => ({
//         label: child.name,
//         value: child.name,
//         options: child.child.map((children) => ({
//           label: children.name,
//           value: children.name,
//         })),
//       }));

//       setCategories(categoriesList);
//     } catch (error) {
//       console.error('Some error occurred', error);
//     }
//   };

//   const fetchUserData = async () => {
//     try {
//       const response = await fetch('YOUR_API_ENDPOINT', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${await getLocalData('token')}`,
//         },
//       });
//       const data = await response.json();
//       const professionalObj = data?.professional || {};
      
//       await storeLocalData('user', data);
//       professionalObj.service = professionalObj.service.length ? professionalObj.service : [{}];
//       professionalObj.service.forEach((service, index) => {
//         setValue(`service[${index}]`, service);
//       });
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   const onSubmit = async (values) => {
//     try {
//       const response = await fetch('YOUR_API_ENDPOINT', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${await getLocalData('token')}`,
//         },
//         body: JSON.stringify(values),
//       });

//       const data = await response.json();
//       // Handle response or navigation if needed
//       console.log(data);
//     } catch (error) {
//       console.error('Form submission failed:', error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>Service Details</Text>

//       {fields.map((field, index) => (
//         <View key={field.id} style={styles.card}>
//           <Text style={styles.cardTitle}>Service {index + 1}</Text>

//           <Controller
//             control={control}
//             name={`service[${index}].title`}
//             render={({ field: { onChange, onBlur, value } }) => (
//               <TextInput
//                 style={styles.input}
//                 placeholder="Title Name"
//                 onBlur={onBlur}
//                 onChangeText={onChange}
//                 value={value}
//               />
//             )}
//           />

//           <Controller
//             control={control}
//             name={`service[${index}].category`}
//             render={({ field: { onChange, onBlur, value } }) => (
//               <TextInput
//                 style={styles.input}
//                 placeholder="Select a category"
//                 onBlur={onBlur}
//                 onChangeText={onChange}
//                 value={value}
//               />
//             )}
//           />

//           <Controller
//             control={control}
//             name={`service[${index}].min_price`}
//             render={({ field: { onChange, onBlur, value } }) => (
//               <TextInput
//                 style={styles.input}
//                 placeholder="Min Price"
//                 onBlur={onBlur}
//                 onChangeText={onChange}
//                 value={value}
//                 keyboardType="numeric"
//               />
//             )}
//           />

//           <Controller
//             control={control}
//             name={`service[${index}].max_price`}
//             render={({ field: { onChange, onBlur, value } }) => (
//               <TextInput
//                 style={styles.input}
//                 placeholder="Max Price"
//                 onBlur={onBlur}
//                 onChangeText={onChange}
//                 value={value}
//                 keyboardType="numeric"
//               />
//             )}
//           />

//           <Controller
//             control={control}
//             name={`service[${index}].description`}
//             render={({ field: { onChange, onBlur, value } }) => (
//               <TextInput
//                 style={styles.textArea}
//                 placeholder="Description"
//                 onBlur={onBlur}
//                 onChangeText={onChange}
//                 value={value}
//                 multiline
//                 numberOfLines={4}
//               />
//             )}
//           />

//           <Button title="Remove" onPress={() => remove(index)} />
//         </View>
//       ))}

//       <Button title="Add More Service" onPress={() => append({ title: '', category: '', min_price: '', max_price: '', description: '' })} />
//       <Button title="Submit" onPress={handleSubmit(onSubmit)} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   card: {
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 8,
//     marginBottom: 8,
//   },
//   textArea: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 8,
//     marginBottom: 8,
//     height: 100,
//   },
// });

// export default Service;

