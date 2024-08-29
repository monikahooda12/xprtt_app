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
    <TouchableOpacity onPress={() => navigation.navigate('Xprrt',  { itemName: item.name })}>
       <Text>detail for</Text>
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








