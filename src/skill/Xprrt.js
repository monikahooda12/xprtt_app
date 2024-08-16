import FilterModal from './FilterModal';
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
} from 'react-native';
import {useDispatch} from 'react-redux';
import {API} from '../constants';
import {httpRequest} from '../api/http';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {parse} from 'react-native-svg';
import {Card} from 'react-native-paper';
import {red} from 'react-native-reanimated/lib/typescript/Colors';

const {width} = Dimensions.get('window');
const cardWidth = width * 0.91; // 70% of screen width

const Xprrt = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const route = useRoute();
  const {itemName} = route.params || {};
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [professionalObj, setProfessionalObj] = useState([]);

  const [filters, setFilters] = useState({
    experience: '',
    gender: '',
    location: '',
    category: '',
  });

  // const applyFilters = () => {
  //   setIsFilterModalVisible(false);
  //   const filteredData = data.filter(item => {
  //     return (
  //       // (!filters.experience || item.professional?.experience?.length >= parseInt(filters.experience)) &&
  //       // (!filters.gender || item.gender === filters.gender) &&
  //       // (!filters.location || item.city.toLowerCase().includes(filters.location.toLowerCase()) || item.state.toLowerCase().includes(filters.location.toLowerCase())) &&
  //       (!filters.category || item.categories?.some(cat => cat.name === filters.category))
  //     );
  //   });
  //   setData(filteredData);
  // };

  // Fetch and filter data based on user inputs-----------------------
  const applyFilter = async filters => {
    try {
      // Fetch categories and users data
      const categories = await fetchItems(); // Fetch categories
      const flattenedCategories = flattenItems(categories); // Flatten the categories if nested

      const usersResponse = await httpRequest({url: API.USERS, method: 'GET'}); // Fetch users
      const users = usersResponse?.data?.list || [];

      // Filter users based on experience and gender
      const filteredUsers = users.filter(user => {
        const matchesExperience = user.experience >= filters.experience;
        const matchesGender = !filters.gender || user.gender === filters.gender;
        return matchesExperience && matchesGender;
      });

      // Extract categories from filtered users
      const userCategories = filteredUsers.flatMap(
        user => user.categories || [],
      );
      const uniqueCategories = [
        ...new Set(userCategories.map(cat => JSON.stringify(cat))),
      ].map(str => JSON.parse(str));

      // Further filter categories based on user selection (if any)
      const filteredCategories = flattenedCategories.filter(category => {
        return uniqueCategories.some(uniqueCat => uniqueCat.id === category.id);
      });

      return filteredCategories;
    } catch (error) {
      console.error('Error fetching or filtering data:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await httpRequest({
        url: API.USERS,
        method: 'GET',
      });
      setData(response?.data?.list || []);
      const allCategories = response?.data?.list.flatMap(
        user => user.categories || [],
      );
      const uniqueCategories = [
        ...new Set(allCategories.map(cat => JSON.stringify(cat))),
      ].map(str => JSON.parse(str));
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = () => {
    console.log('Search Query:', searchQuery);
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////{itemNmae}
  const renderProfileCard = () => {
    const navigation = useNavigation();
    return (
      <ScrollView>
        {data.map(item => (
          <TouchableOpacity
            key={item.registration_id}
            onPress={() => navigation.navigate('Detailsuser', {data: item})}>
            <View style={styles.card}>
              <Image
                source={{uri: item.profile_image}}
                style={styles.backgroundImage}
              />

              <View style={styles.overlay}>
                {/* <Text style={styles.experienceText}>2 Years Experience</Text> */}
                <Text style={styles.experienceText}>
                  Total Experience: {item.professional.total_experience} years
                </Text>
                <Text style={styles.priceText}>$12/Project</Text>
              </View>

              <View style={styles.profileInfo}>
                <View>
                  <Image
                    source={{uri: item.profile_image}}
                    style={styles.profileImage}
                  />
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:"space-between"}}>
                  <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <View style={styles.location}>
                    <Image
                      source={require('../assets/icons/carbon_location-filled.png')}
                      style={{height: 19, width: 17}}
                    />
                    <Text style={styles.city}>{item.city}</Text>

                  
                   
                  </View>
                  </View>
                   <View style={styles.ratingContainer}>
                     
                      <Text style={styles.ratingText}>(12)</Text>
                    </View>
                  {/* <View style={styles.skillsContainer}>
                    <View style={styles.skillBadge}>
                      <Text style={styles.skillText}>
                        {item.professional.skill.name}name
                      </Text>
                    </View>
                    <View style={styles.skillBadge}>
                      <Text style={styles.skillText}>
                        {item.professional.skill.level}level
                      </Text>
                    </View>

                  
                  </View> */}
                  {/* <Image
                  source={require('../assets/icons/carbon_location-filled.png')}
                  style={{ height: 19, width: 17 }}
                /> */}
                  {/* <Text style={styles.city}>{item.city}</Text> */}
                </View>
                {/* <Text style={styles.state}>{item.state}</Text> */}
                {/* <View style={styles.statsContainer}> */}
                {/* <View style={styles.statItem}> */}
                {/* <Icon name="star" size={16} color="#FFD700" /> */}
                {/* <Text style={styles.statText}>4.8</Text> */}
              </View>
            </View>
            {/* </View> */}
            {/* </View> */}
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  // return (
  //   <SafeAreaView style={styles.container}>
  //     {renderProfileCard()}
  //   </SafeAreaView>
  // );
  // };

  // const renderProfileCard = (item, index, type) => (
  //   <TouchableOpacity
  //     onPress={() => navigation.navigate('Detailsuser', { user: item })}
  //     key={item.registration_id || index}
  //     style={[styles.profileCard, { width: cardWidth }]}
  //   >
  //     <Image source={{ uri: item.profile_image || 'default_image_url' }} style={styles.profileImage} />
  //     <View style={styles.cardContent}>
  //       <Text style={styles.name}>{item.name || 'No Name'}</Text>
  //       <View style={styles.locationContainer}>
  //         <Image
  //           source={require('../assets/icons/carbon_location-filled.png')}
  //           style={{height:17,width:15}}
  //         />
  //         <Text style={styles.location}>{item.city || 'Unknown'}, {item.state || 'Unknown'}</Text>
  //       </View>
  //       <View style={styles.statsContainer}>
  //         <View style={styles.statItem}>
  //           <Icon name="star" size={16} color="#FFD700" />
  //           <Text style={styles.statText}>4.8</Text>
  //         </View>
  //         <View style={styles.statItem}>
  //           <Icon name="briefcase-outline" size={16} color="#007AFF" />
  //           <Text style={styles.statText}>{item.professional?.experience?.length || 0} jobs</Text>
  //         </View>
  //       </View>
  //     </View>
  //     <View style={[styles.cardType, styles[`${type.toLowerCase()}Type`]]}>
  //       <Text style={styles.cardTypeText}>{type}</Text>
  //     </View>
  //   </TouchableOpacity>
  // );

  // const renderCategories = () => (
  //   <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
  //     <TouchableOpacity
  //       style={[styles.categoryItem, !selectedCategory && styles.selectedCategory]}
  //       onPress={() => setSelectedCategory(null)}
  //     >
  //       <Text style={styles.categoryText}>All</Text>
  //     </TouchableOpacity>
  //     {categories.map((category) => (
  //       <TouchableOpacity
  //         key={category.id}
  //         style={[styles.categoryItem, selectedCategory === category.name && styles.selectedCategory]}
  //         onPress={() => setSelectedCategory(category.name)}
  //       >
  //         <Text style={styles.categoryText}>{category.name}</Text>
  //       </TouchableOpacity>
  //     ))}
  //   </ScrollView>
  // );

  // const renderSection = (title, data, type) => {
  //   const filteredData = selectedCategory
  //     ? data.filter(item => item.categories?.some(cat => cat.name === selectedCategory))
  //     : data;

  //   return (
  //     <View style={styles.section}>
  //       <Text style={styles.sectionTitle}>{title}</Text>
  //       <ScrollView>
  //         {filteredData.map((item, index) => renderProfileCard(item, index, type))}
  //       </ScrollView>
  //     </View>
  //   );
  // };

  /////////////////////////catergory wali////////////////////s

  const renderCategories = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesContainer}>
      <TouchableOpacity
        style={[
          styles.categoryItem,
          !selectedCategory && styles.selectedCategory,
        ]}
        onPress={() => setSelectedCategory(null)}>
        <Text style={styles.categoryText}>All</Text>
      </TouchableOpacity>
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryItem,
            selectedCategory === category.name && styles.selectedCategory,
          ]}
          onPress={() => setSelectedCategory(category.name)}>
          <Text style={styles.categoryText}>{category.name}</Text>
          {selectedCategory === category.name && (
            <TouchableOpacity
              style={styles.removeCategory}
              onPress={() => setSelectedCategory(null)}>
              <Text style={styles.removeCategoryText}>×</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderSection = (title, data, type) => {
    const filteredData = selectedCategory
      ? data.filter(item =>
          item.categories?.some(cat => cat.name === selectedCategory),
        )
      : data;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <ScrollView>
          {/* {filteredData.map((item, index) => renderProfileCard(item, index, type))} */}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.itemName}>{item.name}</Text>
      {item.professional?.job_title && (
        <Text style={styles.itemDescription}>{item.professional.job_title}</Text>   
      )} */}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 10,
          paddingRight: 40,
        }}>
        <View style={styles.searchSection}>
          {/* <Image
          source={require('../assets/icons/Icon.png')}
          style={{height:19, width:19}}
        /> */}
          {/* //////////////////////////////////////////////////////////// */}
          {/* <Text style={styles.title}>Details for: {itemName}</Text> */}

          <TouchableOpacity
            onPress={() => navigation.navigate(Homesubchild, {itemName})}>
            <Text style={styles.title}>Details for: {itemName}</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.searchInput}
            // placeholder="Search ..."
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
            onPress={() => setIsFilterModalVisible(true)}>
            <Image
              source={require('../assets/icons/whitefilter.png')} ///////filter/////////
              style={{height: 16, width: 16}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        applyFilters={applyFilter}
      />
      {renderCategories()}
      {renderProfileCard()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderSection('Featured Experts', data.slice(0, 5), 'Featured')}
        {renderSection('New Joiners', data.slice(5, 10), 'New')}
        {renderSection('Top Rated', data.slice(10, 15), 'Top')}
        {renderSection(
          'Recommended for You',
          data.slice(15, 20),
          'Recommended',
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    // backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    // borderRadius: 5,
  },
  priceText: {
    color: 'white',
    // backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    // borderRadius: 5,
  },
  profileInfo: {
    // padding: 15,
     alignItems: 'center',
    flexDirection:'row',
    
    gap:15,
    paddingHorizontal:10,
    paddingVertical:15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginTop: 5,
    borderWidth: 3,
    borderColor: 'red',
    
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    //  marginTop: 10,
  },
  location: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
    flexDirection:'row',
    gap:5,
  },
  ratingContainer: {
    flexDirection: 'row',
   
    // marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    color: 'gray',
  },
  skillsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  skillBadge: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  skillText: {
    fontSize: 12,
  },

  // ///////////////////////////
  container: {
    flex: 1,
    backgroundColor: '#F8F9Fa',
    margin: 10,
  },
  // removeCategory: {
  //   position: 'absolute',
  //   top: -5,
  //   right: -5,
  //   width: 20,
  //   height: 20,
  //   borderRadius: 10,

  //  backgroundColor: '#999', /////background dark
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // removeCategoryText: {
  //   color: 'white',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   lineHeight: 20,
  //   textAlign: 'right',

  // },
  // categoriesContainer: {

  //    height:80,
  //   paddingVertical: 7,
  //   paddingHorizontal: 15,
  //   backgroundColor: '#f5f5f5',
  // },
  categoryItem: {
    height: 50,
    marginRight: 10, // Space between category items
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10, // Rounded corners
    backgroundColor: '#ffffff', // Background color for unselected categories
    borderWidth: 1,
    borderColor: '#ddd', // Border color for unselected categories
  },
  selectedCategory: {
    height: 50,
    backgroundColor: '#ccc', // Background color for selected categories
    borderColor: '#fff', // Border color for selected categories
  },
  categoryText: {
    fontSize: 16,
    color: '#333', // Text color for unselected categories
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    // paddingVertical: 15,
    backgroundColor: '#fff',
    paddingTop: 1,
  },
  // headerTitle: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   color: '#333',
  // },
  // filterButton: {
  //   // padding: 5,
  // },
  searchSection: {
    height: 48,
    width: 305,
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
  // searchIcon: {
  //   marginRight: 10,
  // },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    color: '#333',
  },
  // section: {
  //   marginBottom: 20,
  // },
  // sectionTitle: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   marginLeft: 20,
  //   marginBottom: 15,
  //   color: '#333',
  // },
  // profileCard: {
  //   backgroundColor: '#ffffff',
  //   // borderRadius: 15,
  //   // marginLeft: 20,
  //   // marginBottom: 10,
  //   elevation: 5,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   overflow: 'hidden',
  // },

  // /////new card//////////
  // Card:{
  //   height:227.76,
  //   width:363,
  //   left:15,
  //   backgroundColor:'#ffffff',
  //    borderRadius:9,
  //      padding:15,
  //    marginBottom:15,
  //   elevation: 5,
  //   shadowColor: '#000',
  //   // shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   // shadowRadius: 4,
  //   // overflow: 'hidden',

  // },
  // profileImage: {
  //     // width: '100%',
  //   height: 133.24,
  //    resizeMode: 'contain',

  //   // borderRadius:(20,20,0,0)
  // },

  // name: {
  //   fontSize: 25,
  //   fontWeight: 'bold',
  //   color: '#333',
  //   marginBottom: 5,
  //   marginLeft:15
  // },
  // state:{
  //   fontSize:18,
  //   marginLeft:18,
  // },
  // city:{
  //   fontSize:18,
  // },

  // locationContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 10,
  //   fontSize:16,
  //   marginLeft:15,
  // },
  // //////////////newcard//////////////////
  // jobTitle: {
  //   fontSize: 14,
  //   color: '#666',
  //   marginBottom: 10,
  // },

  // location: {
  //   fontSize: 14,
  //   color: '#666',
  //   marginLeft: 5,
  // },
  // statsContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginLeft:330,
  // },
  // statItem: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // statText: {
  //   marginLeft: 5,
  //   fontSize: 14,
  //   color: '#333',
  // },
  // cardType: {
  //   position: 'absolute',
  //   top: 10,
  //   right: 10,
  //   paddingHorizontal: 10,
  //   paddingVertical: 5,
  //   borderRadius: 15,
  // },
  // cardTypeText: {
  //   fontSize: 12,
  //   fontWeight: 'bold',
  //   color: '#fff',
  // },
  // featuredType: {
  //   backgroundColor: '#007AFF',
  // },
  // newType: {
  //   backgroundColor: '#4CD964',
  // },
  // topType: {
  //   backgroundColor: '#FF9500',
  // },
  // recommendedType: {
  //   backgroundColor: '#FF2D55',
  // },
});

export default Xprrt;

// import { View, StyleSheet, Text, ScrollView, TextInput, Image, TouchableOpacity, Linking } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { API } from '../constants';
// import { httpRequest } from '../api/http';

// const { width } = Dimensions.get('window');
// const cardWidth = width * 0.7;

// const Xprrt = () => {
//   const dispatch = useDispatch();
//   const [data, setData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await httpRequest({
//         url: API.USERS,
//         method: 'GET',
//       });

//       setData(response?.data?.list || []);
//       console.log('API Response:', JSON.stringify(response));
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const handleSearch = () => {
//     console.log('Search Query:', searchQuery);
//     // Implement search functionality here if needed
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterSection}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           onSubmitEditing={handleSearch}
//         />
//       </View>

//       {/* <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={true}> */}

//       <ScrollView>
//         {data.map((item, index) => (
//           <View key={item.registration_id || index} style={styles.profileContainer}>
//             <Image source={{ uri: item.profile_image }} style={styles.profileImage} />
//             <Text style={styles.name}>{item.name}</Text>
//             <Text style={styles.location}>{item.city}, {item.state}</Text>

//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Professional Details</Text>
//               <Text>Job Title: {item.professional.job_title}</Text>
//               <Text>Bio: {item.professional.bio}</Text>
//             </View>

//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Experience</Text>
//               {item.professional.experience.map((exp, expIndex) => (
//                 <View key={expIndex} style={styles.subSection}>
//                   <Text>Role: {exp.Role}</Text>
//                   <Text>Location: {exp.location}</Text>
//                   <Text>Job Title: {exp.job_title}</Text>
//                   <Text>Description: {exp.description}</Text>
//                   <Text>Company Name: {exp.company_name}</Text>
//                 </View>
//               ))}
//             </View>

//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Education</Text>
//               {item.professional.education.map((edu, eduIndex) => (
//                 <View key={eduIndex} style={styles.subSection}>
//                   <Text>Degree: {edu.degree}</Text>
//                   <Text>Subjects: {edu.subjects}</Text>
//                   <Text>University: {edu.university}</Text>
//                   <Text>Passing Year: {edu.passing_year}</Text>
//                 </View>
//               ))}
//             </View>

//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Portfolio</Text>
//               {item.professional.portfolio.map((portfolio, portfolioIndex) => (
//                 <TouchableOpacity
//                   key={portfolioIndex}
//                   onPress={() => Linking.openURL(portfolio.link)}
//                 >
//                   <Text style={styles.link}>{portfolio.link}</Text>
//                   {/* Uncomment if image URL is valid and available */}
//                   <Image source={{ uri: portfolio.image?.file?.url }} style={styles.portfolioImage} />
//                 </TouchableOpacity>
//               ))}
//             </View>

//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Cover Images</Text>
//               {item.professional.cover_images.map((coverImage, coverImageIndex) => (
//                 <Image
//                   key={coverImageIndex}
//                   source={{ uri: coverImage }}
//                   style={styles.coverImage}
//                 />
//               ))}
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   profileContainer: {
//     padding: 20,
//     borderBottomWidth: 1,
//     paddingTop:5,
//     borderBottomColor: 'red',
//     backgroundColor:'gray',
//     // color:'#FFFF00',
//   },
//   profileImage: {
//     width: '100%',
//     height: '10%',
//     borderRadius: 10,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   location: {
//     fontSize: 16,
//     color: '#666',
//   },
//   section: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   subSection: {
//     marginTop: 10,
//   },
//   link: {
//     color: 'blue',
//     textDecorationLine: 'underline',
//   },
//   portfolioImage: {
//     width: 100,
//     height: 100,
//     marginTop: 10,
//   },
//   coverImage: {
//     width: '100%',
//     height: 200,
//     marginTop: 10,
//     borderRadius:10,
//   },
//   infoContainer: {
//     width: '100%',
//   },
//   container: {
//     // flex: 1,
//      paddingBottom: 28,
//      display:'block',

//     backgroundColor: '#f5f5f5',
//   },
//   filterSection: {
//     padding: 10,
//     backgroundColor: '#ffffff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   searchInput: {
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 5,
//     padding: 8,
//   },
//   columnWrapper: {
//      justifyContent: 'space-between',
//     padding: 8,

//   },
//   userCard: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//     width: '48%',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   row: {
//     //  flexDirection: 'column',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   infoItem: {
//     marginBottom: 4,
//   },
//   label: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#666',
//   },
//   value: {
//     fontSize: 14,
//     color: '#333',
//   },
//   loadingContainer: {
//     // flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     // flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
//   emptyText: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//   },
//   avatar: {
//         width: 80,
//         height: 80,
//         borderRadius: 10,
//         alignSelf: 'center',
//         marginBottom: 10,
//       },
// });

// export default Xprrt;

// import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
// import { API, COLORS } from '../constants';
// import { httpRequest } from '../api/http';

// const Xprrt = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const response = await httpRequest({
//         url: API.USERS,
//         method: 'GET',
//       });
//       console.log('API Response:', response);

//       if (response.data && Array.isArray(response.data.list)) {
//         const usersData = response.data.list;
//         setUsers(usersData);
//         console.log('Fetched users:', usersData);
//       } else {
//         console.error('Invalid API response format:', response);
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = () => {
//     console.log('Search Query:', searchQuery);
//     // Implement search functionality here if needed
//   };
//   <FlatList
//   data={users}
//   renderItem={renderUserItem}
//   keyExtractor={(item, index) => item.id.toString()}
//   numColumns={2}
//   columnWrapperStyle={styles.row}
// />
// useEffect(() => {
//   fetchUsers();
// }, []);

//   const renderUserItem = ({ item }) => (
//     <View style={styles.userCard}>
//       {/* <Image source={{ uri: item.avatar || 'https://via.placeholder.com/150' }} style={styles.avatar} /> */}
//       {/* <Text style={styles.userName}>{item.name || 'No Name'}</Text> */}
//       {/* <Text style={styles.userInfo}>Experience: {item.experience || 'N/A'} years</Text> */}
//       {/* <Text style={styles.userInfo}>Gender: {item.gender || 'N/A'}</Text> */}
//       {/* <Text style={styles.userInfo}>Location: {item.location || 'N/A'}</Text> */}
//       {/* <Text style={styles.userInfo}>Categories: {(item.categories || []).join(', ') || 'N/A'}</Text> */}
//       {/* <Text style={styles.userInfo}>Languages: {(item.languages || []).join(', ') || 'N/A'}</Text> */}
//       {/* <Text style={styles.userInfo}>Rating: {item.rating || 'N/A'}/5</Text> */}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterSection}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           onSubmitEditing={handleSearch}
//         />
//       </View>
//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <Text>Loading...</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={users}
//           renderItem={() => renderUserItem({users})}
//           keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
//           numColumns={2}
//           columnWrapperStyle={styles.row}
//           ListEmptyComponent={<Text style={styles.emptyText}>No users found</Text>}
//         />

//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingBottom: 28,
//     backgroundColor: '#f5f5f5',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   filterSection: {
//     padding: 10,
//     backgroundColor: '#ffffff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   searchInput: {
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 5,
//     padding: 8,
//   },
//   row: {
//     flex: 1,
//     justifyContent: 'space-around',
//   },
//   userCard: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 16,
//     margin: 8,
//     width: '45%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//     alignSelf: 'center',
//     marginBottom: 10,
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   userInfo: {
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   emptyText: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//   },
// });

// export default Xprrt;
