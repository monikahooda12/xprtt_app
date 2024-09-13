import React, {useState, useEffect} from 'react';
import {View,Text,Modal,Pressable,StyleSheet,TouchableOpacity,ScrollView,} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import { useSelector } from 'react-redux';
import {httpRequest} from '../api/http';
import {API, COLORS} from '../constants';
//utils
import {getLocalData, storeLocalData} from '../utils';
//components
import {TextInput, Button, SelectList} from '../components';
import {CustomText} from '../components/textInputs/text';

const Service = () => {
  const [services, setServices] = useState([]);
  const [projectTypeModalVisible, setProjectTypeModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [maincategory, setMainCategory] = useState('');
  const [projectTypes, setProjectTypes] = useState({});

  const categoriesFromRedux = useSelector(state => state.categories.categories);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchCategories = async mainCategory => {
    try {
      const catObj = await getLocalData('categories');
      console.log(mainCategory, 'mainCategory in data --services----');
      console.log("redux", categoriesFromRedux)

      let index;
      const categoryName = categoriesFromRedux.find((item, i) => {
        if (item.name == mainCategory) {
          index = i;
          return true;
        }
        return false;
      });

      console.log(index, 'categoryname------');

      if (index !== undefined) {
        categoriesFromRedux[index].child.map(child =>
          setCategories(categories => [
            ...categories,
            {
              label: <span>{child.name}</span>,
              title: child.name,
              options: child.child.map(children => ({
                label: <span>{children.name}</span>,
                value: children.name,
              })),
            },
          ]),
        );
      }
    } catch (error) {
      console.error('Some error occurred', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await httpRequest({
        url: API.GET_PROFILE,
        method: 'GET',
      });

      console.log('Response ', response?.data?.professional);
      const professionalObj = response?.data?.professional;
      console.log(professionalObj?.main_category, "main category 84");

      professionalObj.service = professionalObj?.service?.length
        ? professionalObj.service
        : [{}]; // Ensure there's at least one service

      await storeLocalData('user', response?.data);
      setServices(professionalObj.service);
      fetchCategories(professionalObj?.main_category);

      const initialProjectTypes = professionalObj.service.reduce(
        (acc, index) => {
          acc[index] = professionalObj.service[index]?.project_type || 'hourly';
          return acc;
        },
        {},
      );
      setProjectTypes(initialProjectTypes);
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };

  const loadServices = async () => {
    try {
      const savedServices = await AsyncStorage.getItem('services');
      if (savedServices !== null) {
        setServices(JSON.parse(savedServices));
      } else {
        setServices([
          {
            title: '',
            project_type: 'hourly',
            category: '',
            min_price: '',
            max_price: '',
            description: '',
          },
        ]);
      }
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const handleCategoryChange = category => {
    navigation.navigate('SearchResults', {category});
  };

  const saveServices = async updatedServices => {
    try {
      await AsyncStorage.setItem('services', JSON.stringify(updatedServices));
    } catch (error) {
      console.error('Error saving services:', error);
    }
  };

  const handleAddService = () => {
    const updatedServices = [
      ...services,
      {
        title: '',
        project_type: 'hourly',
        category: '',
        min_price: '',
        max_price: '',
        description: '',
      },
    ];
    setServices(updatedServices);
    saveServices(updatedServices);
  };

  const handleRemoveService = index => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
    saveServices(updatedServices);
  };

  const handleProjectTypeChange = value => {
    updateServiceField(selectedServiceIndex, 'project_type', value);
    setProjectTypeModalVisible(false);
  };

  const updateServiceField = (index, field, value) => {
    const updatedServices = services.map((service, i) =>
      i === index ? {...service, [field]: value} : service,
    );
    setServices(updatedServices);
    saveServices(updatedServices);
  };

  const handleChangeProjectType = (index, value) => {
    setProjectTypes(prev => ({...prev, [index]: value}));
  };

  const handleSubmit = async values => {
    try {
      const response = await httpRequest({
        method: 'PUT',
        url: API.PROFILE_PROFESSIONAL,
        data: values,
      });
      if (response) {
        console.log('Form submitted successfully!', response.data);
      } else {
        console.log('Form submission response not successful:', response);
      }
    } catch (error) {
      console.error('Form submission failed:', error);
    }
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
              onChangeText={text => updateServiceField(index, 'title', text)}
              // style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Pressable
              onPress={value => {
                handleChangeProjectType(index, value);
                setProjectTypeModalVisible(true);
              }}>
              <View style={styles.pickerContainer}>
                <Text style={styles.input}>
                  {service.project_type === 'fixed'
                    ? 'Fixed Project'
                    : 'Hourly Based Project'}
                </Text>
              </View>
            </Pressable>
          </View>

          <View style={styles.inputContainer}>
            <Pressable
              onPress={() => {
                setSelectedServiceIndex(index);
                setCategoryModalVisible(true);
              }}>
              <View style={styles.pickerContainer}>
                <Text style={styles.input}>
                  {service.category || 'Select Category'}
                </Text>
              </View>
            </Pressable>
          </View>

          <View style={styles.priceContainer}>
            <TextInput
              style={{flex: 1}}
              label="Min Price"
              value={service.min_price}
              onChangeText={text =>
                updateServiceField(index, 'min_price', text)
              }
              // style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              style={{flex: 1}}
              label="Max Price"
              value={service.max_price}
              onChangeText={text =>
                updateServiceField(index, 'max_price', text)
              }
              // style={styles.input}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <CustomText>Description</CustomText>
            <TextInput
              label="Description"
              value={service.description}
              onChangeText={text =>
                updateServiceField(index, 'description', text)
              }
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
        name="Submit"
        onPress={() => handleSubmit(services)}
        style={{marginTop: 16}}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={projectTypeModalVisible}
        onRequestClose={() => setProjectTypeModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <SelectList onPress={() => handleProjectTypeChange('fixed')}>
              <Text style={styles.modalOption}>Fixed Project</Text>
            </SelectList>
            <SelectList onPress={() => handleProjectTypeChange('hourly')}>
              <Text style={styles.modalOption}>Hourly Based Project</Text>
            </SelectList>
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
        onRequestClose={() => setCategoryModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {categories.map((category, index) => (
                <Pressable
                  key={index}
                  onPress={() => handleCategoryChange(category)}>
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
    flex: 1,
    paddingHorizontal: responsiveWidth(3),
    // backgroundColor:black,
     backgroundColor: COLORS.PRIMARY,
  },
  card: {
    // backgroundColor: 'transparent',
    marginBottom: 10,
    elevation: 0, // Optional shadow effect
    borderRadius: 0,
  },
  cardHeader: {
    marginLeft: 5,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  removeButton: {
    fontSize: 15,
    marginTop: 10,
    color: '#000000',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    color: 'rgba(0, 0, 0, 0.7)',
  },
  addButton: {},
  addButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  pickerContainer: {
     borderWidth: 1,
     borderColor: '#ccc',
     padding: 12,
    borderRadius:8,
     marginBottom: 16,
    backgroundColor: 'white', // Black with 50% opacity
    marginHorizontal: 5,
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cccc',
  },
  modalContent: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 8,
    width: '30%',
  },
  modalOption: {
    paddingVertical: 10,
    textAlign: 'center',
    color: 'black',
    marginBottom: 8,
    borderRadius: 8,
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