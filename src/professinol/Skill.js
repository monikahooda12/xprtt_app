import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TextInput } from "../components"; // Ensure this is correctly imported
import { COLORS } from '../constants';
import { CustomText } from '../components/textInputs/text';

export const Skill = () => {
    const [skills, setSkills] = useState([{ id: Date.now(), name: '', level: '' }]);

    const handleInputChange = (id, key, value) => {
        setSkills(prevSkills =>
            prevSkills.map(skill => (skill.id === id ? { ...skill, [key]: value } : skill))
        );
    };

    const addSkillField = () => {
        setSkills([...skills, { id: Date.now(), name: '', level: '' }]);
    };

    const removeSkillField = (id) => {
        setSkills(skills.filter(skill => skill.id !== id));
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.heading}>Skills</Text>
                {skills.map(skill => (
                    <View key={skill.id} style={styles.skillContainer}>
                        <TouchableOpacity style={styles.removeButton} onPress={() => removeSkillField(skill.id)}>
                            <Text style={styles.removeButtonText}>x</Text>
                        </TouchableOpacity>
                        <CustomText>Skill</CustomText>
                        <TextInput
                            label="Skill"
                            value={skill.name}
                            onChangeText={text => handleInputChange(skill.id, 'name', text)}
                            // style={styles.input}
                        />
                         <CustomText>Skill Level</CustomText>
                        <TextInput
                            label="Skill Level"
                            value={skill.level}
                            onChangeText={text => handleInputChange(skill.id, 'level', text)}
                            // style={styles.input}
                        />
                    </View>
                ))}
                <TouchableOpacity style={styles.addButton} onPress={addSkillField}>
                    <Text style={styles.addButtonText}>+ Add Skill</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        // padding: 16,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    skillContainer: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    input: {
        marginTop: 10,
         marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    removeButton: {
        alignSelf: 'flex-end',
        padding: 5,
        // backgroundColor: '#ccc',
        borderRadius: 5,
        marginBottom: 5,
    },
    removeButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    addButton: {
        marginTop: 10,
        // backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
         color: '#000',
        fontWeight: 'bold',
        marginLeft:'auto',
    },
});

export default Skill;
