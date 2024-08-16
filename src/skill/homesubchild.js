import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API } from '../constants';
import { httpRequest } from '../api/http';
import { COLORS } from '../constants';

const { width } = Dimensions.get('window');

const Homesubchild = () => {
    const [CategoriesData, setCategoriesData] = useState([]);

    const getallcatergies = async () => {
        try {
            const response = await httpRequest({
                method: 'GET',
                url: API.GET_CATEGORIES,
            });

            const childcategories = response?.data.list.flatMap((item) => item.child[0].child);
            console.log("Fetched Child Categories:", childcategories);
            setCategoriesData([...childcategories]);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryPress = (category) => {
        navigation.navigate('Homesubchild', { categoryId: category.id });
    };

    useEffect(() => {
        getallcatergies();
    }, []);

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleCategoryPress(item)}>
            <View style={styles.categoryItem}>
                <Image
                    source={{ uri: item.icon }}
                    style={styles.serviceIcon}
                    resizeMode='cover'
                />
                <Text style={styles.categoryTitle}>{item.name || 'Unnamed Category'}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
         <Text style={styles.sectionTitle}>Graphices & Design</Text>
         <TouchableOpacity>
           <Text style={styles.viewAllText}>view all (12)</Text>
         </TouchableOpacity>
       </View> 
            <FlatList
                data={CategoriesData}
                renderItem={renderCategoryItem}
                keyExtractor={(item, index) => item.id || index.toString()}
                ListEmptyComponent={<Text>No categories available</Text>}
                numColumns={2}
                columnWrapperStyle={styles.row}
                // showsVerticalScrollIndicator={false} // Optional: hides vertical scrollbar
            />
        </View>
    );
};

export default Homesubchild;

const styles = StyleSheet.create({
    container: {
         flex: 1,
         padding: 16,
    },
    row:{
        flex:1,
        justifyContent:'space-between'
    },
    categoryItem: {
        flex:1,
        marginBottom: 16, // Adjust this if you want more spacing between items
         alignItems: 'center',
        width: (width - 48)/2, // Adjusted to take full width minus padding
    },
    serviceIcon: {
         width: '100%',
        height: 100,
        borderRadius: 10,
        marginBottom: 8,
    },
    categoryTitle: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
});
