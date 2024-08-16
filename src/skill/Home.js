

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {hideLoader, showLoader} from '../components';
import {httpRequest} from '../api/http';
import {API, COLORS} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCategories,
  setSelectedCategoryID,
} from '../redux/categories/categorySlice';
import Index from '../screens/homeslider';


const {width} = Dimensions.get('window');
const cardWidth = width * 0.6; // 40% of screen width
const cardHeight = cardWidth * 1.2; // Slightly taller than wide

const Home = () => {
  const navigation = useNavigation();
  const [categoriesData, setCategoriesData] = useState([]);
  const dispatch = useDispatch();

  const addToCart = service => {
    dispatch(setSelectedCategoryID(service.id));
    navigation.navigate('Subchild', {id: service.id});
    // navigation.navigate('Homechild',{id: service.id});
  };

  const getallcatergies = async () => {
    showLoader();
    try {
      const response = await httpRequest({
        method: 'GET',
        url: API.GET_CATEGORIES,
      });
      setCategoriesData(response?.data.list);
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

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => addToCart(item)}>
      <Image
        source={{uri: item.icon}}
        style={styles.serviceIcon}
        resizeMode='stretch'

      />
      <View style={styles.overlay} />
      <Text style={styles.serviceTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      {categoriesData.length > 0 ? (
        <FlatList
          data={categoriesData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <Text style={styles.noDataText}>No categories available</Text>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop:48,
    padding: 15,
  },
  title: {
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0F0F0F',
  },
  flatListContent: {
    paddingRight: 15, // Add some padding to the end of the list
  },
  serviceCard: {
    width: cardWidth,
    height: cardHeight,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  serviceIcon: {
    // objectFit:'cover',
    width: '100%',
    height: '100%',
    // aspectRatio:1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  serviceTitle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000000',
    marginTop: 20,
  },
});

export default Home;