import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { hideLoader, showLoader } from '../components';
import { httpRequest } from '../api/http';
import { API } from '../constants';
import { useDispatch } from 'react-redux';
import {
  setCategories,
  setSelectedCategoryID,setselectedServiceNames
} from '../redux/categories/categorySlice';

import { CardGrid, SearchBar } from '../components/card';
import CategoryModal from '../Modals/categorymodal';
import CommonInput from '../components/Input/commominput';
import { COLOR } from '../theme/Theme';


const { width } = Dimensions.get('window');

const Categories = () => {
  const navigation = useNavigation();
  const [categoriesData, setCategoriesData] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  // const [selectedServices, setSelectedServices] = useState([]);
  // const [selectedServicesNames, setSelectedServicesNames] = useState([]);
  const dispatch = useDispatch();

  const addToCart = service => {
    dispatch(setSelectedCategoryID(service.id));
    navigation.navigate('Subchild', { id: service.id });
  };

  const getallcatergies = async () => {
    showLoader();
    try {
      const response = await httpRequest({
        method: 'GET',
        url: API.GET_CATEGORIES,
      });
      const categories = response?.data.list.map(item => ({
        ...item,
        icon: { uri: item.icon },
        title: item.name,
      }));
      setCategoriesData(categories);
      setFilteredCategories(categories);
      dispatch(setCategories(response?.data?.list));
      hideLoader();
    } catch (error) {
      console.error('Error fetching categories:', error);
      hideLoader();
    }
  };

  useEffect(() => {
    getallcatergies();
  }, []);

  const handleSearch = text => {
    const filtered = categoriesData.filter(category =>
      category.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCategories(filtered);
    console.log("filteredCategories",filteredCategories)
  };

  // const handleCheckboxToggle =async ( service) => {
  //   // console.log("service",service)
  //  await setSelectedServices(prevSelected => {
  //     if (prevSelected.some(s => s.id === service.id)) {

  //              return prevSelected.filter(s => s.id !== service.id);
  //            } else {
  //              return [...prevSelected, service];
  //            }
  //   } 
  // );
  // console.log("?[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[",selectedServices);

  // const handleCheckboxToggle = (service) => {
  //   setSelectedServices((prevSelected) => {
  //     if (prevSelected.some(s => s.id === service.id)) {

  //       return prevSelected.filter(s => s.id !== service.id);
  //     } else {
  //       return [...prevSelected, service];
  //     }
  //   });
  // };
// console.log("selectedServicesNames",selectedServicesNames)
//     setSelectedServices(prevState => ({
//       ...prevState,
//       [serviceId]: !prevState[serviceId],
//     }));
   

  const handleOnApply = Service => {
    // dispatch(setselectedServiceNames(selectedServicesNames));
    
    console.log("?[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[",Service);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <CommonInput
                      name="email"
                      label="Email"
                      placeholderText="eg. john@gmail.com"
                      InputIcon={source=require('../assets/icons/Icon.png')}
                      // onchange={handleChange("email")}
                      // onBlur={handleBlur("email")}
                      // onError={
                      //   errors.email && touched.email ? errors.email : null
                      // }
                      // errors={errors.email && touched.email}
                    />
      <SearchBar
        placeholder="Search categories..."
        onSearch={handleSearch}
        onFilterPress={() => setModalVisible(true)}
      />
      {filteredCategories.length > 0 ? (
        <CardGrid items={filteredCategories} onCardPress={addToCart} />
      ) : (
        <Text style={styles.noDataText}>No categories available</Text>
      )}
      <CategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        services={filteredCategories}
        // selectedServices={selectedServices}
        label="Select Categories"
        // onCheckboxToggle={handleCheckboxToggle}
        onApply={handleOnApply}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    marginTop: 4,
    padding: 15,
  },
  title: {
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0F0F0F',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000000',
    marginTop: 20,
  },
});

export default Categories;
