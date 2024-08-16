// SectionGridFilterCard.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const SectionGridFilterCard = ({ users, paginationData, onPageChange, onFilterUpdate }) => {
  const renderUserItem = ({ item }) => (
    <View style={styles.userCard}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text>Experience: {item.experience} years</Text>
      <Text>Gender: {item.gender}</Text>
      <Text>Categories: {item.categories.join(', ')}</Text>
    </View>
  );

  const renderPagination = () => (
    <View style={styles.pagination}>
      {[...Array(paginationData.totalPages)].map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.pageButton,
            paginationData.currentPage === index && styles.activePageButton,
          ]}
          onPress={() => onPageChange(index + 1)}
        >
          <Text>{index + 1}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterSection}>
        {/* Add filter controls here */}
        <TouchableOpacity style={styles.filterButton} onPress={() => onFilterUpdate(/* updated filters */)}>
          <Text>Apply Filters</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterSection: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  filterButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  userCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  pageButton: {
    padding: 8,
    margin: 4,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  activePageButton: {
    backgroundColor: '#007bff',
  },
});

export default SectionGridFilterCard;