import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { API } from '../constants';
import { httpRequest } from '../api/http';
import { COLORS } from '../constants';



const { width } = Dimensions.get('window');
const ChildData = () => {
    const [CategoriesData, setCategoriesData] = useState([])
    
    const getallcatergies = async () => {
        try {
            const response = await httpRequest({
                method: 'GET',
                url: API.GET_CATEGORIES,
            });
            const childcategories = response?.data.list.map((item) => item.child[0].child[0])
            // console.log("object", childcategories)
            setCategoriesData([...childcategories]);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        getallcatergies()
    }, [])

    const renderCategoryItem = ({ item }) => (

         <View style={styles.categoryItem}>
          
            <Image
                source={{ uri: item.icon }}
                style={styles.serviceIcon}
                resizeMode='cover'
            />
            <Text style={styles.categoryTitle}>{item.name || 'Unnamed Category'}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Programming Service</Text>
            <View style={styles.sectionHeader}>
         <Text style={{ fontWeight: 'bold',marginStart:-8}} >we provide best service</Text>
         
         <Text style={styles.viewAllText}>view all (12)</Text>
         </View>
       
            <FlatList
                data={CategoriesData}
                renderItem={renderCategoryItem}
                keyExtractor={(item, index) => item.id || index.toString()}
                ListEmptyComponent={<Text>No categories available</Text>}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

export default ChildData

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // backgroundColor: '#f8f8f8',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    categoryItem: {
        marginRight: 16,
        alignItems: 'center',
        width: 120,
    },
    serviceIcon: {
      width: (width - 75) / 3,
        // width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 8,
    },
    categoryTitle: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
    sectionHeader: {
        flex:1,
         flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
      },
      sectionTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: -16,
         marginLeft:5,

      },
      viewAllText: {
         color: '#333',
        //  marginLeft:79,
        marginRight:-15
      },
})