// import React, { useEffect } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchItems, setSearchTerm } from '../redux/searchSlice';
// import { useNavigation } from '@react-navigation/native';
// import ChildData from '../components/ChildData';

// const SearchResults = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const { filteredItems, loading, searchTerm } = useSelector(state => state.search);

//   useEffect(() => {
//     dispatch(fetchItems());
//   }, [dispatch]);

//   const handleSearch = (text) => {
//     dispatch(setSearchTerm(text));
//   };

//   const renderItem = ({ item }) => {
//     // Safeguard: ensure item.child is an array or fallback to an empty array
//     const childData = Array.isArray(item.child) ? item.child : [];

//     // console.log(JSON.stringify(childData))
//     console.log(item.child,'itemchild   check')

//     return (
//       <TouchableOpacity 
//         onPress={() => navigation.navigate('Xprrt', { 
//               itemName: item.name,


//           itmeChild:item.child,
//           categoriesSlug: item.slug, 
//           childData: childData  // Passing child data to the next page
//         })}
//       >
//         <View style={styles.itemContainer}>
//           <Text style={styles.itemName}>{item.name}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };


//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search categories or job titles..."
//         value={searchTerm}
//         onChangeText={handleSearch}
//       />
//       <FlatList
//         data={filteredItems}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         ListEmptyComponent={<Text style={styles.emptyList}>No items found</Text>}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#f5f5f5',
//   },
//   searchInput: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     paddingLeft: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   itemContainer: {
//     backgroundColor: 'white',
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   itemName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   itemDescription: {
//     fontSize: 14,
//     color: 'gray',
//     marginTop: 5,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyList: {
//     textAlign: 'center',
//     marginTop: 50,
//     fontSize: 16,
//     color: 'gray',
//   },
// });

// export default SearchResults;





import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { hideLoader, showLoader } from '../components';
import { httpRequest } from '../api/http';
import { API, COLORS, FONTS } from '../constants';
import { useDispatch } from 'react-redux';
import { setCategories, setSelectedCategoryID } from '../redux/categories/categorySlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { COLOR } from '../theme/Theme';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const { width } = Dimensions.get('window');

const SearchResults = () => {
  const navigation = useNavigation();
  const [categoriesData, setCategoriesData] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const dispatch = useDispatch();
 const getAllCategories = async () => {
    showLoader();
    try {
      const response = await httpRequest({
        method: 'GET',
        url: API.GET_CATEGORIES,
      });
      const categories = response?.data.list.map((item) => ({
        ...item,

        title: item.name,
      }));
      console.log("objectttttttttttt", categories)
      setCategoriesData(categories);
      setFilteredCategories(categories);
      dispatch(setCategories(response?.data?.list));
      hideLoader();
    } catch (error) {
      console.error('Error fetching categories:', error);
 }
  };
useEffect(() => {
    getAllCategories();
  }, []);
return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          {/* <Text style={styles.title}>Categories</Text> */}
        </View>

        {/* Mapping over the categories */}
        {filteredCategories.map((category) => (
          <View key={category.id}>
          

            {/* Mapping over the child items of the category */}
            {category.child && category.child.map((childItem, index) => (
              <TouchableOpacity
                key={index}
                style={styles.childContainer}
                onPress={() => navigation.navigate('Xprrt', {

                  childid: childItem.id,
                  childname: childItem.name,

                })}
              >
                <View style={styles.containerIcon}>
                <FontAwesome name='search' size={20} style={styles.search} />
                  <Text style={styles.smallTitle}>
                 
                      {childItem.name}
                  </Text>
                  <Feather name='arrow-up-left' size={25} color="#000" style={styles.Arrowicon} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
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
    marginTop: responsiveHeight(1),
    fontFamily: FONTS.BOLD,
    fontSize: responsiveFontSize(3),
    // color: COLORS.SECONDARY,
    color: '#0F0F0F',
  },

  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerIcon: {
    flexDirection: 'row', // Arrange children in a row
    alignItems: 'center', // Vertically align items
    justifyContent: 'space-between', // Space between text and icon
  },
  smallTitle: {
    fontSize: responsiveFontSize(2.2),
    // fontFamily: 'Roboto-Black',
    flex: 1, 
    marginHorizontal:10,
    marginBottom:18,
  gap:4,
  },
  search:{
marginHorizontal:10,
marginTop:-15,
  },
  Arrowicon: {
    // marginLeft: 20,/
    marginHorizontal:30, 
    color:'grey'
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
    flexDirection: 'row',
    justifyContent: 'space-between', // To space out the title and View All button
    alignItems: 'center', // Vertically align items in the center
    marginBottom: 20,
  },
  separator: {
    width: '100%',
    backgroundColor: '#D8D8D8',
    height: 1,
    marginBottom: 20,
    marginTop: 10,
  },
});

export default SearchResults;



