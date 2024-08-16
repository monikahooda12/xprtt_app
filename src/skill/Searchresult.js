import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, setSearchTerm } from '../redux/searchSlice';
import { useNavigation } from '@react-navigation/native';

const SearchResults = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { filteredItems, loading, searchTerm } = useSelector(state => state.search);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleSearch = (text) => {
    dispatch(setSearchTerm(text));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Xprrt', { itemName: item.name })}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        {item.professional?.job_title && (
          <Text style={styles.itemDescription}>{item.professional.job_title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search categories or job titles..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyList}>No items found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'gray',
  },
});

export default SearchResults;






// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
// import { API } from '../constants';
// import { httpRequest } from '../api/http';

// const SearchResults = () => {
//   const [allItems, setAllItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const flattenItems = (items) => {
//     let flattened = [];
  
//     items.forEach(item => {
//       flattened.push(item);
  
//       if (item.child && item.child.length > 0) {
//         flattened = flattened.concat(flattenItems(item.child)); 
//       }
//     });
  
//     return flattened;
//   };

//   const fetchItems = async () => {
//     setLoading(true);
//     try {
//       const response = await httpRequest({
//         method: 'GET',
//         url: API.GET_CATEGORIES,
//       });
//       const items = response?.data?.list || [];
//       const flattenedItems = flattenItems(items);
//       setAllItems(flattenedItems);
//       setFilteredItems(flattenedItems);
//       console.log("Fetched items:", flattenedItems);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (text) => {
//     setSearchTerm(text);
//     if (text) {
//       const filtered = allItems.filter(item => 
//         item.name.toLowerCase().includes(text.toLowerCase())
//       );
//       setFilteredItems(filtered);
//     } else {
//       setFilteredItems(allItems);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <Text style={styles.itemName}>{item.name}</Text>
//       {item.description && <Text style={styles.itemDescription}>{item.description}</Text>}
//     </View>
//   );

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
//         placeholder="Search categories..."
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

