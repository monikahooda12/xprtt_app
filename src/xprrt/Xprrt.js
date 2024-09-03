import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

//constants
import {API} from '../constants';

//api
import {httpRequest} from '../api/http';

//modals
import Userfilter from '../Modals/FilterModal';

import SearchBar from '../home/Searchbar';
import SearchResults from '../home/Searchresult';
import Coverimage from '../professinol/Coverimage';

const {width} = Dimensions.get('window');
const cardWidth = width * 0.91;

const Xprrt = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
   const route = useRoute();
  const {itemName} = route.params || {};
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const {categoriesSlug} = route.params || [];
  const [isLoading, setIsLoading] = useState(false);
  const [categoryNames, setCategoryNames] = useState([]);

  console.log('route', categoriesSlug);
  console.log('navigation', navigation)
  const [filters, setFilters] = useState({
    experience: '',
    gender: '',
    state: '',
    category: '',
  });
  const [payload, setPayload] = useState({
    totalPages: 0,
    currentPage: 0,
    totalCount: 0,
  });

  useEffect(() => {
    fetchUsers();
  }, [payload.currentPage,route.params]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const allData = [];
      let currentPage = 0;
      let totalPages = 1;
  
      while (currentPage < totalPages) {
        const response = await httpRequest({
          url: API.USERS,
          method: 'GET',
          params: {
            page: currentPage,
          },
        });
  
        if (response.data) {
          const userData = response.data.list || [];
          totalPages = response.data.totalPages || totalPages;
  
          if (categoriesSlug && categoriesSlug.length > 0) {
            const matchedCategories = userData
              .map(item => {
                return {
                  ...item,
                  categories: item.categories.filter(category =>
                    categoriesSlug.includes(category.slug),
                  ),
                };
              })
              .filter(item => item.categories.length > 0);
  
            console.log('Matched Categories:', JSON.stringify(matchedCategories));
  
            // Extract category names and set them in state
            const matchedCategoryNames = matchedCategories.flatMap(item =>
              item.categories.map(cat => cat.name)
            );
            setCategoryNames(matchedCategoryNames);
  
            setData(matchedCategories);
          } else {
            allData.push(...userData);
            setData(allData);
          }
          currentPage++;
        } else {
          console.error('API response is missing data.');
          break;
        }
      }
      setPayload({
        currentPage: currentPage - 1,
        totalPages,
        totalCount: allData.length,
      });
  
      if (allData.length > 0) {
        const allCategories = allData.flatMap(user => user.categories || []);
        const uniqueCategories = [
          ...new Set(allCategories.map(cat => JSON.stringify(cat))),
        ].map(str => JSON.parse(str));
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleFilterApplied = users => {
    console.log('Filtered users received in handleFilterApplied:', users);

    if (users) setData(users);
  };

  const handleSearch = () => {
    console.log('Search Query:', searchQuery);
  };

  const defaultImage = 'https://via.placeholder.com/150'; // URL of the default image

  const renderProfileCard = () => {
    const filteredData = data.filter(item => {
      if (selectedCategories.length === 0) {
        return true;
      }
      return item.categories.some(category =>
        selectedCategories?.includes(category.name),
      );
    });



    return (
      <ScrollView>
        {filteredData.map(item => (
          <TouchableOpacity
            key={item.registration_id}
            onPress={() => navigation.navigate('Detailsuser', {data: item, portfolio : item.professional.portfolio})}>
            <View style={styles.card}>
              {item.professional.cover_images
                .slice(0, 1)
                .map((coverImage, coverImageIndex) => (
                  <Image
                    key={coverImageIndex}
                    source={{uri: coverImage}}
                    style={styles.backgroundImage}
                  />
                ))}

<View style={styles.overlay}>
  <Text style={styles.experienceText}>
    {item.professional.total_experience} years exp.
  </Text>
  <View style={styles.servicesContainer}>
    {item.professional.service?.slice(0, 1).map((service, index) => (
      <View key={index} style={styles.serviceBadge}>
        <Text style={styles.priceText}>
          ${service.min_price} - ${service.max_price}
        </Text>
      </View>
    )) || <Text>No services available</Text>}
  </View>
</View>

              <View style={styles.profileInfo}>
                <View>
                  <Image
                    source={{uri: item.profile_image || defaultImage}}
                    style={styles.profileImage}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                    {/* <Text style={styles.name}>{item.slug}</Text> */}
                    <View style={styles.location}>
                      <Image
                        source={require('../assets/icons/carbon_location-filled.png')}
                        style={{height: 19, width: 17}}
                      />
                      <Text style={styles.city}>{item.city},</Text>
                      <Text style={styles.city}>{item.state}</Text>
                    </View>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>(12)</Text>
                  </View>
                </View>
              </View>
              <View style={styles.skillsContainer}>
                {item.professional.skill?.map((skill, index) => (
                  <View key={index} style={styles.skillBadge}>
                    <Text style={styles.skillText}>{skill.name}</Text>
                  </View>
                )) || <Text>No skills listed</Text>}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const toggleCategory = categoryName => {
    setSelectedCategories(prevCategories => {
      if (prevCategories.includes(categoryName)) {
        return prevCategories.filter(cat => cat !== categoryName);
      } else {
        return [...prevCategories, categoryName];
      }
    });
  };

  const renderCategories = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesContainer}>
      <TouchableOpacity
        style={[
          styles.categoryItem,
          selectedCategories.length === 0 && styles.selectedCategory,
        ]}
        onPress={() => setSelectedCategories([])}>
        <Text style={styles.categoryText}>All</Text>
      </TouchableOpacity>
      {categories.map((category, index) => (
        <TouchableOpacity
           key={`${category.id}-${index}`}
          style={[
            styles.categoryItem,
            selectedCategories.includes(category.name) &&
              styles.selectedCategory,
          ]}
          onPress={() => toggleCategory(category.name)}>
          <Text style={styles.categoryText}>{category.name}</Text>
          {selectedCategories.includes(category.name) && (
            <TouchableOpacity
              style={styles.removeCategory}
              onPress={() => toggleCategory(category.name)}>
              <Text style={styles.removeCategoryText}>×</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>{/* Header content can go here */}</View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 10,
          paddingRight: 40,
        }}>
        <View style={styles.searchSection}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Categories', {itemName})}>
            <Text style={styles.title}> {itemName}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 19,
            height: 48,
            width: 60,
            borderRadius: 6,
            backgroundColor: '#6C63FF',
          }}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterVisible(true)}>
            <Image
              source={require('../assets/icons/whitefilter.png')}
              style={{height: 16, width: 16}}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? ( // Show loader when data is loading
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#6C63FF" />
        </View>
      ) : (
        <>
          {renderCategories()}
          {renderProfileCard()}
        </>
      )}

      <View style={styles.paginationInfo}>
        <Text style={styles.paginationText}>
          Page {payload.currentPage + 1} of {payload.totalPages}
        </Text>
        <Text style={styles.paginationText}>
          Total Users: {payload.totalCount}
        </Text>
      </View>

      <Modal
        visible={isFilterVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterVisible(false)}>
        <View style={styles.modalContainer}>
          <Userfilter
            onClose={() => setFilterVisible(false)}
            onFilterApplied={users => handleFilterApplied(users)}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setFilterVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  paginationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  paginationText: {
    fontSize: 16,
    color: '#333333',
  },
  card: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 5,
  },
  backgroundImage: {
    width: '100%',
    height: 150,
    resizeMode: 'stretch',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 135,
    left: 0,
    right: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  experienceText: {
    color: 'white',
    padding: 5,
  },
  priceText: {
    color: 'white',
    padding: 5,
  },
  profileInfo: {
    alignItems: 'center',
    flexDirection: 'row',

    gap: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginTop: 5,
    borderWidth: 3,
    borderColor: 'black',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
    flexDirection: 'row',
    gap: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  ratingText: {
    marginLeft: 5,
    color: 'gray',
  },
  skillsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    left: 13,
  },
  skillBadge: {
    backgroundColor: '#C5DBF5',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  skillText: {
    fontSize: 12,
    Color: '#3B33B7',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9Fa',
    margin: 10,
  },
  removeCategory: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FDC1C1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  removeCategoryText: {
    color: '#D90808',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    textAlign: 'center',
  },
  categoriesContainer: { ///////ok All////
    height: 80,
    paddingVertical: 7,
     paddingHorizontal: 15,
    // backgroundColor: 'black',
  },
  categoryItem: {
    height: 40,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingRight: 24,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  selectedCategory: {
    height: 40,
    backgroundColor: '#F1F1F1',
    borderColor: '#fff',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'red',
    // paddingTop: 10,
  },
  searchSection: {
    height: 48,
    width: 319,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 6,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    color: '#333',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Xprrt;