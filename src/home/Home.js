import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { hideLoader, showLoader } from '../components';
import { httpRequest } from '../api/http';
import { API } from '../constants';
import { useDispatch } from 'react-redux';
import { setCategories, setSelectedCategoryID } from '../redux/categories/categorySlice';
import { CardGrid } from '../components/card';
import CategoryModal from '../Modals/categorymodal';
import { COLOR } from '../theme/Theme';

const { width } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  const [categoriesData, setCategoriesData] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const addToCart = (service) => {
    dispatch(setSelectedCategoryID(service.id));
    navigation.navigate('Subhome', { id: service.id, title: service.title });
  };

  const getAllCategories = async () => {
    showLoader();
    try {
      const response = await httpRequest({
        method: 'GET',
        url: API.GET_CATEGORIES,
      });
      const categories = response?.data.list.map((item) => ({
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
    getAllCategories();
  }, []);

  const handleOnApply = (Service) => {
    // Logic for handling selected services
  };

  const handleViewAllPress = () => {
    // Navigate to Categories page
    navigation.navigate('Categories');
  };

  // Limit to 6 categories
  const displayedCategories = filteredCategories.slice(0, 6);

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Title and View All in the same row */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Categories</Text>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={handleViewAllPress}
          >   
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {displayedCategories.length > 0 ? (
          <CardGrid items={displayedCategories} onCardPress={addToCart} />
        ) : (
          <Text style={styles.noDataText}>No categories available</Text>
        )}

        <CategoryModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          services={filteredCategories}
          label="Select Categories"
          onApply={handleOnApply}
        />

        <View style={{}}>
          <View style={styles.separator} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    // marginTop: 4,
    marginHorizontal:18,
    marginTop:11

  },
  title: {
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F0F0F',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000000',
    marginTop: 20,
  },
  viewAllButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLOR.lightGray,
    borderRadius: 5,
  },
  viewAllText: {
    color: '#333',
    fontWeight: 'bold',
  },
  headerRow: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between', // To space out the title and View All button
    alignItems: 'center', // Vertically align items in the center
    marginBottom: 20,
    marginHorizontal:5
  },
  separator: {    
    width: '100%',
    backgroundColor: '#D8D8D8',
    height: 1,
    marginBottom: 20,
    marginTop: 10,
    
  },
});

export default Home;
