import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Slick from 'react-native-slick';

// constants
import { API, FONTS } from '../constants';

// api
import { httpRequest } from '../api/http';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const { width } = Dimensions.get('window');

const Subhome = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const [categoriesData, setCategoriesData] = useState([]);
  const [subCategoriesData, setSubCategoriesData] = useState({});
  const [categories,setCategories] =  useState([]);
  const getallcatergies = async () => {
    try {
      const response = await httpRequest({
        method: 'GET',
        url: API.GET_CATEGORIES,
      });
      const childcategoriesArray = response.data.list.reduce((acc, item) => {
        acc[item.id] = item.child;
        return acc;
      }, {});
      const childcategory = childcategoriesArray[id];

      const subChildArray = {};

      childcategory.forEach(category => {
        subChildArray[category.name] = category.child;
      });

      setCategoriesData(childcategory);
      setSubCategoriesData(subChildArray);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryPress = category => {
    navigation.navigate('Xprrt', { categoriesSlug: category.slug });
  };

  useEffect(() => {
    getallcatergies();
  }, []);

  const RenderCategoryItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleCategoryPress(item)}>
        <View style={styles.categoryItem}>
          <Image
            source={{ uri: item.icon }}
            style={styles.serviceIcon}
            resizeMode="cover"
          />
          <Text style={styles.categoryTitle}>
            {item.name || 'Unnamed Category'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSlider = (subCategories) => {
    const itemsPerSlide = 3;
    const slides = [];
    for (let i = 0; i < subCategories.length; i += itemsPerSlide) {
      slides.push(subCategories.slice(i, i + itemsPerSlide));
    }

    return (
      <Slick
        style={styles.slickWrapper}
        showsButtons={true}
        autoplay={false}
        loop={false}
        dot={<View style={styles.slickDot} />}
        activeDot={<View style={styles.slickActiveDot} />}
        prevButton={
          <View style={styles.arrowCircle}>
            <Text style={styles.slickArrow}>‹</Text>
          </View>
        }
        nextButton={
          <View style={styles.arrowCircle}>
            <Text style={styles.slickArrow}>›</Text>
          </View>
        }
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            {slide.map(subItem => (
              <RenderCategoryItem key={subItem.id} item={subItem} />
            ))}
          </View>
        ))}
      </Slick>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categoriesData}
        renderItem={({ item }) => (
          <View style={styles.categorySection}>
            <Text style={styles.text}>{item.name}</Text>
            <View style={styles.underline} />
            {renderSlider(subCategoriesData[item.name] || [])}
          </View>
        )}
        keyExtractor={(item, index) => item.id.toString() || index.toString()}
        ListEmptyComponent={<Text>No categories available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categorySection: {
    marginBottom: 20,
  },
  text: {
    color: '#313131',
    fontFamily: FONTS.ROBOTO_BLACK,
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 25,
    marginBottom: 10,
  },
  underline: {
    width: 35,
    backgroundColor: '#D8D8D8',
    height: 1,
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    width: width / 3 - 20,
    marginHorizontal: 5,
  },
  serviceIcon: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  categoryTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
    paddingHorizontal: 5,
    height: 30,
  },
  slickWrapper: {
    height: 180,
  },
  slide: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  slickDot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  slickActiveDot: {
    backgroundColor: '#007aff',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  slickArrow: {
    color: '#222222',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight:19,
  },
  arrowCircle: {
    backgroundColor: '#EBEBEB',
    width: 27,
    height: 27,
    borderRadius: 27 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: -8, // Adjust to position arrows properly
    marginTop: responsiveHeight(-6), // Adjust the arrow positioning as needed
  },
});

export default Subhome;
