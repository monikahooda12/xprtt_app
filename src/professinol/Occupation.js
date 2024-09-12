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
  const handleSelectOccupation = (selectedOccupationIds) => {
    // Assuming you want to display the selected IDs for now
    const selectedOccupations = selectedOccupationIds.join(', ');
    handleInputChange('occupation', selectedOccupations);
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
