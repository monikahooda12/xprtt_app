import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { API } from '../constants';
import { httpRequest } from '../api/http';
import { COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');
const Homechild = () => {
    const navigation = useNavigation();
    const [CategoriesData, setCategoriesData] = useState([])
    
    const getallcatergies = async () => {
        try {
            const response = await httpRequest({
                method: 'GET',
                url: API.GET_CATEGORIES,
            });
          
            const childcategories = response?.data.list.flatMap((item) => item.child)
        //    const childcategories = response?.data.list.map((item)=>item.child[0])
            console.log("object", childcategories)
            setCategoriesData([...childcategories]);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    const handleCategoryPress = (category) => {
        navigation.navigate('Homesubchild', { categoryId: category.id });
    };

    useEffect(() => {
        getallcatergies()
    }, [])

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity onPress={()=> handleCategoryPress(item)}>
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
            {/* <Text style={styles.header}>Categories</Text> */}
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

export default Homechild

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding:16,
        
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
})





// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { COLORS } from '../constants';
// import { setselectedService } from '../redux/categories/categorySlice';

// const { width } = Dimensions.get('window');
// const cardWidth = width * 0.7; // Set card width to 70% of screen width

// const Homechild = ({ route, navigation }) => {
//   const [servicesData, setServicesData] = useState([]);
//   const categories = useSelector(state => state.categories.categories);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     console.log('Route Params ID:', route?.params?.id); // Check if the ID is being passed correctly
//     const getServices = categories?.find(category => category.id === route?.params?.id);
//     console.log('Selected Category:', getServices);
//     if (getServices) {
//       const data = getServices.child || getServices.services || [];
//       console.log('Services Data:', data);
//       setServicesData(data);
//     } else {
//       setServicesData([]);
//       console.log('No services found for the given category.');
//     }
//   }, [categories, route?.params?.id]);
  
  

//   const handleServicePress = (service) => {
//     dispatch(setselectedService(service));
//     navigation.navigate('SuperSubchild');
//   };

//   const renderServiceCard = ({ item: service }) => (
//     <TouchableOpacity 
//       style={styles.serviceCardWrapper}
//       onPress={() => handleServicePress(service)}
//     >
//       <View style={styles.serviceCard}>
//         <Image
//           source={{ uri: service.icon }}
//           style={styles.serviceIcon}
//           resizeMode="cover"
//         />
//         <View style={styles.overlay}>
//           <Text style={styles.serviceTitle} numberOfLines={1} ellipsizeMode="tail">
//             {service.name || 'Unnamed Service'}
//           </Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
      
//       <FlatList
//         data={servicesData}
//         renderItem={renderServiceCard}
//         keyExtractor={(item, index) => item.id || index.toString()}
//         horizontal={true} // Display items horizontally
//         contentContainerStyle={styles.flatListContent}
//         showsHorizontalScrollIndicator={false}
//          ListEmptyComponent={<Text style={styles.noDataText}>No services available</Text>}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     padding: 15,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginBottom: 15,
//   },
//   flatListContent: {
//     paddingBottom: 20,
//   },
//   serviceCardWrapper: {
//     width: cardWidth,
//     marginRight: 15,
//   },
//   serviceCard: {
//     width: '100%',
//     borderRadius: 10,
//     overflow: 'hidden',
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     position: 'relative',
//   },
//   serviceIcon: {
//     width: '100%',
//     height: 180,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   overlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 50,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   serviceTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#FFFFFF',
//   },
//   noDataText: {
//     fontSize: 18,
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default Homechild;
