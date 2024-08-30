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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {API} from '../constants';
import {httpRequest} from '../api/http';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import Userfilter from '../Modals/FilterModal';
import SearchBar from '../home/Searchbar';
import SearchResults from '../home/Searchresult';
// import Userfilter from './FilterModal';

const {width} = Dimensions.get('window');
const cardWidth = width * 0.91;



const Xprrt = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const route = useRoute();
  const { itemName } = route.params || {};
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilterVisible, setFilterVisible] = useState(false);
  
  const [filters, setFilters] = useState({
    experience: '',
    gender: '',
    state: '',
    category: '',
  });
  const [payload, setPayload] = useState({
   totalPages:0, 
        currentPage:0,
        totalCount:0
  });

  useEffect(() => {
    fetchUsers();
  }, [payload.currentPage]);

  const fetchUsers = async () => {
    try {
      const allData = [];
      let currentPage = 0;
      let totalPages = 1; // Initialize with a default value to enter the loop
  
      // Loop to fetch all pages until you reach the last page
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
  
          // Add the fetched data to the allData array
          allData.push(...userData);
  
          // Increment the current page for the next iteration
          currentPage++;
        } else {
          console.error('API response is missing data.');
          break;
        }
      }
  
      // Set the combined data to the state
      setData(allData);
      console.log('Combined data:', JSON.stringify(allData));
  
      // Update the pagination payload
      setPayload({
        currentPage: currentPage - 1, // Set to the last fetched page
        totalPages,
        totalCount: allData.length, // Total count of all fetched users
      });
  
      // Handle categories and other data from the first page (if needed)
      if (allData.length > 0) {
        const allCategories = allData.flatMap(user => user.categories || []);
        const uniqueCategories = [
          ...new Set(allCategories.map(cat => JSON.stringify(cat))),
        ].map(str => JSON.parse(str));
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  

  const handleFilterApplied = (users) => {
    
    console.log('Filtered users received in handleFilterApplied:', users);
   
   if (users) setData(users );
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
        selectedCategories.includes(category.name)
      );
    });

    return (
      <ScrollView>
        {filteredData.map(item => (
          <TouchableOpacity
            key={item.registration_id}
            onPress={() => navigation.navigate('Detailsuser', { data: item })}
          >
            <View style={styles.card}>
              <Image
                source={{ uri: item.profile_image || defaultImage }}
                style={styles.backgroundImage}
              />
              <View style={styles.overlay}>
                <Text style={styles.experienceText}>
                  {item.professional.total_experience} years exp.
                </Text>
                <View style={styles.servicesContainer}>
                  {item.professional.service?.map((service, index) => (
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
                    source={{ uri: item.profile_image || defaultImage }}
                    style={styles.profileImage}
                  />
                </View>
                <View style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.location}>
                      <Image
                        source={require('../assets/icons/carbon_location-filled.png')}
                        style={{ height: 19, width: 17 }}
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

  const toggleCategory = (categoryName) => {
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
      style={styles.categoriesContainer}
    >
      <TouchableOpacity
        style={[
          styles.categoryItem,
          selectedCategories.length === 0 && styles.selectedCategory,
        ]}
        onPress={() => setSelectedCategories([])}
      >
        <Text style={styles.categoryText}>All</Text>
      </TouchableOpacity>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={`${category.id}-${index}`}
          style={[
            styles.categoryItem,
            selectedCategories.includes(category.name) && styles.selectedCategory,
          ]}
          onPress={() => toggleCategory(category.name)}
        >
          <Text style={styles.categoryText}>{category.name}</Text>
          {selectedCategories.includes(category.name) && (
            <TouchableOpacity
              style={styles.removeCategory}
              onPress={() => toggleCategory(category.name)}
            >
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
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        paddingRight: 40,
      }}>
        <View style={styles.searchSection}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Categories', { itemName })}
          >
            {/* <Text style={styles.title}>Details for: {itemName}</Text> */}
            <Text style={styles.title}> {itemName}</Text>
            
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>
        <View style={{
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
            onPress={() => setFilterVisible(true)}
          >
            <Image
              source={require('../assets/icons/whitefilter.png')}
              style={{ height: 16, width: 16 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {renderCategories()}
      {renderProfileCard()}



      {/* Display pagination info */}
    <View style={styles.paginationInfo}>
      <Text style={styles.paginationText}>
        Page {payload.currentPage + 1} of {payload.totalPages}
      </Text>
      <Text style={styles.paginationText}>
        Total Users: {payload.totalCount}
      </Text>
    </View>


      {/* Modal to display the Userfilter */}
      <Modal
        visible={isFilterVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Userfilter
            onClose={() => setFilterVisible(false)}
            onFilterApplied={(users) => handleFilterApplied(users)}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setFilterVisible(false)}
          >
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
    fontSize: 15,
    fontWeight: 'bold',
    //  marginTop: 10,
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

    // marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    color: 'gray',
  },
  skillsContainer: {
    flexDirection: 'row',
    // marginTop: 11,
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

  // ///////////////////////////
  container: {
    flex: 1,
    backgroundColor: '#F8F9Fa',
    margin: 10,
  },
  removeCategory: {
    //  position: 'absolute',

    // top: -5,
    // right:-10,
    //  right: -25,
    width: 18,
    height: 18,
    borderRadius: 9,

    backgroundColor: '#FDC1C1', /////background dark pink
    justifyContent: 'center',
    alignItems: 'center',
    //  zIndex:1,
    marginLeft: 8,
  },
  removeCategoryText: {
    color: '#D90808',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    textAlign: 'center',
  },
  categoriesContainer: {
    height: 80,
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
  },
  categoryItem: {
    height: 40,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 16, // Increase horizontal padding
    paddingRight: 24, // Add extra padding on the right for the close button
    borderRadius: 6, // Make it more rounded
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row', // Align text and close button horizontally
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between',
    gap: 5,
  },
  selectedCategory: {
    height: 40,
    backgroundColor: '#F1F1F1', // Background color for selected categories
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
 
});

export default Xprrt;


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


  