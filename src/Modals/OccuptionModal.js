import React, { useEffect, useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { httpRequest } from '../api/http'; // Adjust this import based on your API utility
import { API } from '../constants'; // Adjust this import based on your API endpoints

const OccupationModal = ({ isVisible, onClose, onSelectOccupation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState({}); // Track selected items

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await httpRequest({
        method: 'GET',
        url: API.GET_CATEGORIES,
      });

      const processChildren = (children) => {
        return children.map(child => ({
          id: child.id,
          title: child.name,
          children: child.child ? processChildren(child.child) : [], // Recursively process children
        }));
      };

      const categories = response?.data.list.map(item => ({
        id: item.id,
        title: item.name,
        children: item.child ? processChildren(item.child) : [], // Process child items
      }));

      setCategories(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchCategories();
    }
  }, [isVisible]);

  const handleCheckboxChange = (id, title, isChecked) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [id]: isChecked ? { id, title } : undefined, // Store both id and title if checked, remove if unchecked
    }));
  };

  const handleSave = () => {
    const selectedSubChildren = Object.values(selectedItems).filter(item => item);
    console.log("Selected Sub-Children:", selectedSubChildren);
    onSelectOccupation(selectedSubChildren); // Pass the selected items (id and name) to the parent
    onClose(); // Close the modal
  };

  const renderChildren = (children, parentId) => {
    return children.map(child => (
      <View key={child.id} style={styles.childContainer}>
        <View style={styles.optionContainer}>
          <CheckBox
            value={!!selectedItems[child.id]}
            onValueChange={(newValue) => handleCheckboxChange(child.id, child.title, newValue)}
          />
          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              onSelectOccupation({
                categoryId: parentId,
                childId: child.id,
                childName: child.title
              });
              onClose();
            }}
          >
            <Text>{child.title}</Text>
          </TouchableOpacity>
        </View>
        {child.children && child.children.length > 0 && (
          <View style={styles.nestedContainer}>
            {renderChildren(child.children, child.id)}
          </View>
        )}
      </View>
    ));
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <ScrollView>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Select Category</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
              <Text style={styles.error}>{error}</Text>
            ) : (
              categories.map((category) => (
                <View key={category.id} style={styles.categoryContainer}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  {renderChildren(category.children, category.id)}
                </View>
              ))
            )}

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  categoryContainer: {
    marginBottom: 10,
  },
  categoryTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  childContainer: {
    marginLeft: 10,
    marginBottom: 5,
    color:'red',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nestedContainer: {
    marginLeft: 20,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flex: 1,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButton:{
    
    textAlign: 'center',
    marginVertical: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default OccupationModal;
