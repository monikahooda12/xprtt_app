import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import OccupationModal from '../Modals/OccuptionModal';

const Occupation = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({ occupation: '' });

  const handleInputChange = (key, value) => {
    setUser(prevState => ({ ...prevState, [key]: value }));
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Function to handle selected occupation
  const handleSelectOccupation = (selectedOccupations) => {
    // Extract only the names (titles) of the selected occupations
    const selectedOccupationNames = selectedOccupations.map(item => item.title).join(', ');
    
    // Update the input field with the selected occupation names
    handleInputChange('occupation', selectedOccupationNames);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>Occupation</Text>
      <TouchableOpacity onPress={openModal}>
        <TextInput
          value={user.occupation}
          placeholder="Select Occupation"
          editable={false}  // Modal opens instead of direct input
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            borderRadius: 5,
            backgroundColor: '#f9f9f9'
          }}
        />
      </TouchableOpacity>

      {/* Occupation Modal */}
      <OccupationModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onSelectOccupation={handleSelectOccupation}  // Pass handler for selected occupation
      />
    </View>
  );
};

export default Occupation;
