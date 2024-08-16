import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { COLORS } from "../constants";
import { CardGrid, CommonLayout, SearchBar } from "../components/card";
import CategoryModal from '../Modals/categorymodal';

const SuperSubchild = ({ route }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState({});
  const selectedService = useSelector((state) => state.categories);

  // Find the subcategory based on the id from route params
  const subCategory = selectedService.categories
    .map((category) => category.child)
    .flat()
    .find((subCat) => subCat.id === route?.params?.id);

  // Prepare the subcategory children data for CardGrid
  const subCategoryChildren = subCategory?.child?.map((child) => ({
    icon: { uri: child.icon },
    title: child.name,
    id: child.id,
  }));

  // Handle search input and filter subcategory children
  const handleSearch = (text) => {
    const filtered = subCategoryChildren.filter(service => 
      service.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredServices(filtered);
  };
  console.log("subCategory",subCategory)

  // Handle checkbox toggle in the modal
  const handleCheckboxToggle = serviceId => {
    setSelectedServices(prevState => ({
      ...prevState,
      [serviceId]: !prevState[serviceId],
    }));
  };

  return (
    <CommonLayout title={subCategory?.name || "Subcategory"}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/* Search Bar with Filter Button */}
          <SearchBar
            placeholder="Search subcategory..."
            onSearch={handleSearch}
            onFilterPress={() => setModalVisible(true)}
          />

          {subCategory ? (
            <View style={styles.content}>
              {filteredServices.length > 0 ? (
                <CardGrid
                  items={filteredServices}
                  onCardPress={(item) =>
                    console.log(`Pressed on child: ${item.title}`)
                  }
                />
              ) : subCategoryChildren.length > 0 ? (
                <CardGrid
                  items={subCategoryChildren}
                  onCardPress={(item) =>
                    console.log(`Pressed on child: ${item.title}`)
                  }
                />
              ) : (
                <Text style={styles.noChildrenText}>
                  No children available
                </Text>
              )}
            </View>
          ) : (
            <Text style={styles.noSubCategoryText}>No subcategory found</Text>
          )}
        </ScrollView>
      </SafeAreaView>

      {/* Category Modal */}
      <CategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        services={subCategory.child}
        
        selectedServices={selectedServices}
        label="Select Subcategories"
        onCheckboxToggle={handleCheckboxToggle}
      />
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.PRIMARY,
  },
  noChildrenText: {
    fontSize: 16,
    // color: COLORS.TEXT,
    textAlign: "center",
  },
  noSubCategoryText: {
    fontSize: 16,
    color: COLORS.TEXT,
    textAlign: "center",
  },
  content: {
    //  padding: 20,
  },
});

export default SuperSubchild;






// import { useNavigation } from "@react-navigation/native";
// import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
// import { useSelector } from "react-redux";
// import { COLORS } from "../constants";


// const SuperSubchild = ({route}) => {
//   const navigation = useNavigation();
//   console.log(JSON.stringify(route))
//      const selectedService = useSelector(state => state.categories);
   
//     // const findSubCategoryChildrenById = (categories, subCategoryId) => {
//     //   for (const category of categories) {
//     //     const subCategory = category.child?.find(subCat => subCat.id === subCategoryId);
    
//     //     if (subCategory) {
//     //       return subCategory;
//     //     }
//     //   }
//     //   return null;
//     // };
//     const subCategory = selectedService.categories
//     .map(category => category.child)
//     .flat()
//     .find(subCat => subCat.id === route?.params?.id);

//     // const children = findSubCategoryChildrenById(selectedService.categories, route?.params?.id);
//     console.log(JSON.stringify(subCategory),'selectedService')
//   return(

//     <>
//       <SafeAreaView style={styles.container}>
//       <ScrollView>
//         {subCategory ? (
//           <View style={styles.content}>
//             <Text style={styles.header}>Subcategory: {subCategory.name}</Text>
//             <Text style={styles.subHeader}>Children:</Text>
              
//             {subCategory.child && subCategory.child.length > 0 ? (
//               subCategory.child.map(child => (
//                 <View key={child.id} style={styles.childContainer}>

// <Image
//                     source={{ uri: child.icon }} 
//                     style={styles.childImage}
//                   />

//                   <Text style={styles.childText}>{child.name}</Text>
                
//                 </View>
//               ))
//             ) : (
//               <Text style={styles.noChildrenText}>No children available</Text>
//             )}
//           </View>
//         ) : (
//           <Text style={styles.noSubCategoryText}>No subcategory found</Text>
//         )}
//       </ScrollView>
//     </SafeAreaView>
    
//     </>
//   );

// };
  

// export default SuperSubchild


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   content: {
//     padding: 20,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subHeader: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 5,
//   },
//   childContainer: {
//     marginBottom: 10,
//     padding: 10,
//     backgroundColor: COLORS.lightGray,
//     borderRadius: 5,
//   },
//   childText: {
//     fontSize: 16,
//   },
//   childImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   noChildrenText: {
//     fontSize: 16,
//     color: COLORS.gray,
//   },
//   noSubCategoryText: {
//     fontSize: 16,
//     color: COLORS.red,
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });










/////////////////////searchtream/////////////////
// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   TextInput,
// } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { COLORS } from '../constants';
// import { setSearchTerm } from '../redux/categories/categorySlice';

// const { width } = Dimensions.get('window');

// const SuperSubchild = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const selectedService = useSelector(state => state.categories.selectedService);
//   const searchTerm = useSelector(state => state.categories.searchTerm);

//   const handlePress = (childService) => {
//     navigation.navigate('Welcome2', { childService });
//   };

//   const handleSearch = (text) => {
//     dispatch(setSearchTerm(text));
//   };

//   if (!selectedService) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>No service selected</Text>
//       </View>
//     );
//   }

//   const filteredChildren = selectedService.child ? 
//     selectedService.child.filter(child => 
//       child.name.toLowerCase().includes(searchTerm.toLowerCase())
//     ) : [];

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.title}>{selectedService.name || 'Service Details'}</Text>
//       </View>
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search..."
//         value={searchTerm}
//         onChangeText={handleSearch}
//       />
//       <View style={styles.imageContainer}>
//         <Image
//           source={{ uri: selectedService.icon || 'https://via.placeholder.com/100' }}
//           style={styles.icon}
//           defaultSource={require('../assets/default-image.png')}
//         />
//         <View style={styles.overlay} />
//       </View>
//       <View style={styles.childrenContainer}>
//         {filteredChildren.length > 0 ? (
//           filteredChildren.map((childService, index) => (
//             <TouchableOpacity 
//               key={childService.id || index} 
//               style={styles.childCard}
//               onPress={() => handlePress(childService)}
//             >
//               <Text style={styles.childName}>
//                 {childService.name || 'Unnamed Child Service'}
//               </Text>
//             </TouchableOpacity>
//           ))
//         ) : (
//           <Text style={styles.noChildrenText}>No matching child services found</Text>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default SuperSubchild;









